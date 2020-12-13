const express = require('express');
const AWS = require('aws-sdk');

const fs = require('fs');
AWS.config.loadFromPath('./awstextract/awsconfig.json');

//this will parse the data from AWS textract and return relevant data
getRelevantText = (data) => {
    //let rawdata = fs.readFileSync('./json2.json');
    //let data = JSON.parse(rawdata);

    var blocks = data["Blocks"];
    var wordsjson = {};
    var keyJson = [];
    var valueJson = [];

    blocks.forEach(function(innerdata) {
        var BlockType = innerdata.BlockType;
        var TextType = innerdata.TextType;
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
                relationships.forEach(function(valueblock) {
                    var ids = valueblock.Ids;
                    var type = valueblock.Type;
                    if(type == "CHILD"){
                        inn["child"] = ids;
                        inn["mainid"] = innerdata.Id;
                    }
                });
                valueJson.push(inn);
            }
        }
    });
    // console.log(wordsjson);
    // console.log(keyJson);
    // console.log(valueJson);

    // forming the output data
    
    output = [];
    keyJson.forEach(function(key) {
        var keyword = "";
        var valueword = "";
        var innerout = {};
        var childs = key.child;
        childs.forEach(function(c) {
            keyword+= wordsjson[c] + " ";
        });
        innerout["key"] = keyword;

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
        innerout["value"] = valueword;
        output.push(innerout);
    });
    console.log(output);
}

// calling textract API
var textract = new AWS.Textract();
fetchUserDetailsFromId = (req,res) => {
    console.log(req.file);

    fs.rename(req.file.path, './images/doc.jpg', (err)=>{ 
        console.log(err); 
    }); 

    var bitmap = fs.readFileSync('./images/doc.jpg');
    // convert binary data to base64 encoded string
    var img =  new Buffer(bitmap).toString('base64');

    var params = {
        Document: { /* required */
          Bytes: Buffer.from(img, 'base64') || 'img' /* Strings will be Base-64 encoded on your behalf */
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
        if (err) console.log(err, err.stack); // an error occurred
        else{
            getRelevantText(data);
        }           // successful response
    });
    res.status(200).send();
}

exports.fetchUserDetailsFromId = fetchUserDetailsFromId;
exports.getRelevantText = getRelevantText;