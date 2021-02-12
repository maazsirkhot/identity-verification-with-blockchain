const express = require('express');
const AWS = require('aws-sdk');

const fs = require('fs');
const userField = require('../src/models/mongoDB/userFields');

// storeImagesinS3 = (req,res) => {
    
//     const fileContent = fs.readFileSync(req.file.path);
//     const s3 = new AWS.S3({
//         accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//         secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//         region: process.env.AWS_REGION
//     });

//     const params = {
//         Bucket: "identity-verification-1",
//         ACL: 'public-read',
//         Key: 'cat.jpg', // File name you want to save as in S3
//         Body: fileContent
//     };

//     const params2 = {
//         Bucket: "identity-verification",
//         Key: 'cat.jpg', // File name you want to save as in S3
//         Body: fileContent
//     };

//     s3.upload(params, function(err, data) {
//         if (err) {
//             throw err;
//         }
//         console.log(`File uploaded successfully. ${data.Location}`);
//     });

//     // s3.createBucket(params, function(err, data) {
//     //     if (err) console.log(err);
//     //     else console.log('Bucket Created Successfully', data.Location);
//     //     // s3.upload(params2, function(err, data) {
//     //     //     if (err) {
//     //     //         throw err;
//     //     //     }
//     //     //     console.log(`File uploaded successfully. ${data.Location}`);
//     //     // });
//     // });
    
// }

//this will parse the data from AWS textract and return relevant data
getRelevantText = (data) => {
    
    var blocks = data["Blocks"];
    var wordsjson = {};
    var keyJson = [];
    var valueJson = [];
    var output = [];

    blocks.forEach(function(innerdata) {
        var BlockType = innerdata.BlockType;
        var TextType = innerdata.TextType;
        if(BlockType == "LINE" && innerdata.Text 
            && innerdata.Text.substring(0,2) == "FN"){
                var d = {};
                d["field_id"] = "First Name";
                d["field_name"] = "First Name";
                d["field_value"] = innerdata.Text.substring(2);
                output.push(d);
            }
        if(BlockType == "LINE" && innerdata.Text 
            && innerdata.Text.substring(0,2) == "LN"){
                var d = {};
                d["field_id"] = "Last Name";
                d["field_name"] = "Last Name";
                d["field_value"] = innerdata.Text.substring(2);
                output.push(d);
            }
        
        if(BlockType == "LINE" && innerdata.Text 
            && innerdata.Text.substring(0,3) == "DOB"){
                var d = {};
                d["field_id"] = "Date of Birth";
                d["field_name"] = "Date of Birth";
                d["field_value"] = innerdata.Text.substring(4);
                output.push(d);
            }
        
        if(BlockType == "WORD" && TextType == "PRINTED"){
            wordsjson[innerdata.Id] = innerdata.Text;
        }
        else if(BlockType == "KEY_VALUE_SET"){
            var EntityTypes = innerdata.EntityTypes;
            var relationships = innerdata.Relationships;
            if(EntityTypes[0] == "KEY"){
                var inn = {};
                relationships.forEach(function(keyblock) {
                    var ids = keyblock.Ids;
                    var type = keyblock.Type;
                    if(type == "CHILD"){
                        inn["child"] = ids;
                    }
                    if(type == "VALUE"){
                        inn["value"] = ids;
                    }
                });
                keyJson.push(inn);
            }else if(EntityTypes[0] == "VALUE"){
                var inn = {};
                if(relationships != undefined){
                    relationships.forEach(function(valueblock) {
                        var ids = valueblock.Ids;
                        var type = valueblock.Type;
                        if(type == "CHILD"){
                            inn["child"] = ids;
                            inn["mainid"] = innerdata.Id;
                        }
                    });
                }
                valueJson.push(inn);
            }
        }
    });
    
    keyJson.forEach(function(key) {
        var keyword = "";
        var valueword = "";
        var innerout = {};
        var childs = key.child;
        if(childs === undefined)
            return;
        childs.forEach(function(c) {
            keyword+= wordsjson[c] + " ";
        });
        innerout["field_id"] = keyword;
        innerout["field_name"] = keyword;

        var values = key.value;
        values.forEach(function(v) {
            valueJson.forEach(function(vj) {
                if(vj.mainid == v){
                    var vjchilds = vj.child;
                    vjchilds.forEach(function(vjc) {
                        valueword+=wordsjson[vjc] + " ";
                    });
                }
            });
        });
        innerout["field_value"] = valueword;
        output.push(innerout);
    });
    return output;
}

// calling textract API
var textract = new AWS.Textract();
fetchUserDetailsFromId = (req,res) => {

    console.log(req);
    var bitmap = fs.readFileSync(req.file.path);
    // convert binary data to base64 encoded string
    var img =  new Buffer(bitmap).toString('base64');

    var params = {
        Document: { /* required */
          Bytes: Buffer.from(img, 'base64') || img /* Strings will be Base-64 encoded on your behalf */
        //   S3Object: {
        //     Bucket: 'STRING_VALUE',
        //     Name: 'STRING_VALUE',
        //     Version: 'STRING_VALUE'
        //   }
        },
        FeatureTypes: [ /* required */
            'TABLES', 'FORMS',
          /* more items */
        ]
      };

    textract.analyzeDocument(params, function (err, data) {
        if (err) {
            console.log(err, err.stack); 
            res.status(500).send("Internal server error");
        }// an error occurred
        else{
            //console.log(data);
            try{
                dataField = getRelevantText(data);
            }catch(e){
                console.log(e);
                res.status(500).send("Unable to fetch text from ID");
            }
            console.log(dataField);
            userData = new userField({
                userId: req.body.user_id,
                dataField: dataField
            });

            userData.save(function(err,data){
                if(err) {
                    console.log(err);
                    res.status(500).send("Unable to store data in database");
                }
                console.log("Data Inserted Sucessfully");
                res.status(200).send(data);
            });
        }   // successful response
    });
    
}

getUserDetails = (req,res) => {
    console.log(req);
    const userId = req.query.userId;
    userField.find({userId: userId},(err,data)=>{
        console.log(data);
        if(err) {
            console.log(err);
            res.status(500).send("Unable to fetch data from database");
        }
        res.status(200).send(data);
    });
}

exports.fetchUserDetailsFromId = fetchUserDetailsFromId;
exports.getRelevantText = getRelevantText;
exports.getUserDetails = getUserDetails;
//exports.storeImagesinS3 = storeImagesinS3;