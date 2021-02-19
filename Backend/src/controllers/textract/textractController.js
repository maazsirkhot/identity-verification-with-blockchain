const express = require('express');
const AWS = require('aws-sdk');
const fs = require('fs');
const userField = require('../../models/mongoDB/userFields');
const dataField = require('../../models/mongoDB/dataField');
const constants = require('../../../utils/constants');
const textractService = require('../../services/textractServices/textractOps');
const _ = require('lodash');
const userDetailsDao = require('../../daos/textract/userDetailsDao');

module.exports = {
    /* extract user details from ID Card*/
    fetchUserDetailsFromId: async (req,res) => {
        try{
            const bitmap = fs.readFileSync(req.file.path);
            const img =  new Buffer.from(bitmap).toString('base64');
            const params = {
                Document: {
                    Bytes: Buffer.from(img, 'base64') || img /* Strings will be Base-64 encoded on your behalf */
                },
                FeatureTypes: [ 
                    'TABLES', 'FORMS',
                ]
            };

            var keyValuePair = {};
            dataFieldData = await userDetailsDao.findAllDataFields();
            
            for (var i=0; i<dataFieldData.length; i++){
                keyValuePair[dataFieldData[i].fieldName] = dataFieldData[i]._id;
            }

            /* uncomment this when not using textraxt APIs*/
            //fs.readFile('example.json', async (err, data) => {
            var textract = new AWS.Textract();
            textract.analyzeDocument(params,  async (err, data) => {
                if (err) throw err;
                    
                const relevantText = textractService.getRelevantTextService(data, keyValuePair);
                //console.log(relevantText);

                const userData = new userField({
                    userId: req.body.user_id,
                    dataField: relevantText
                });
                    
                userDetails = await userDetailsDao.createUserDetails(userData); 
                if(!userDetails){
                    return res.status(constants.STATUS_CODE.BAD_REQUEST_ERROR_STATUS).send({
                        message: constants.MESSAGES.INVALID_PARAMETERS_ERROR,
                        userDetails,
                        dataAvailable: false,
                    });
                }
                return res.status(constants.STATUS_CODE.SUCCESS_STATUS).send({
                    message: constants.MESSAGES.USER_DETAILS,
                    userDetails,
                    dataAvailable: !!_.isPlainObject(userDetails),
                });
            }); 
            
        }catch(error){
            console.log(error);
            return res
            .status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
            .send({
                message: constants.MESSAGES.SERVER_ERROR,
                error,
            });
        }
    },
    /* - this API is used for creating new fields in Data Fields
        - not to be integrated with Frontend */
    createEntryInDataFields: (req,res) => {
        try{
            inputData = req.body.data;
            _.each(inputData, (val, key) => {
                data = new dataField({
                    fieldName: val.fieldName,
                    fieldAbstraction: val.fieldAbstraction,
                    verificationEntities: val.verificationEntities,
                    verificationMethod: val.verificationMethod,
                    verificationAPI: val.verificationAPI,
                    isActive: true
                });
        
                data.save(function(err,data){
                    if(err) {
                        console.log(err);
                        res.status(500).send("Unable to store data in database");
                    }
                    console.log("Data Inserted Sucessfully");
                });
            });
            res.status(200).send(data);
        }catch(e){

        }
    },
    /* get user details from database*/
    getUserDetails: (req,res) => {
        try{
            const userId = req.query.userId;
            userField.find({userId: userId},(err,data)=>{
                console.log(data);
                if(err) {
                    console.log(err);
                    return res.status(500).send({
                        message: "500",
                        data,
                        dataAvailable: false,
                    });
                }
                if(data.length == 0){
                    return res.status(constants.STATUS_CODE.SUCCESS_STATUS).send({
                        message: constants.MESSAGES.USER_NOT_EXIST,
                        data
                    });
                }
                return res.status(constants.STATUS_CODE.SUCCESS_STATUS).send({
                    message: constants.MESSAGES.USER_DETAILS,
                    data
                });
            });
        }catch(error){
            return res
                .status(500)
                .send({
                    message: "Error",
                    error,
                });
        }
    },
    storeImagesinS3: (req,res) => {
        /* currently working on this */

        try{
            // const fileContent = fs.readFileSync(req.file.path);
            // const s3 = new AWS.S3({
            //     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            //     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            //     region: process.env.AWS_REGION
            // });

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

            // s3.createBucket(params, function(err, data) {
            //     if (err) console.log(err);
            //     else console.log('Bucket Created Successfully', data.Location);
            // s3.upload(params2, function(err, data) {
            //     if (err) {
            //         throw err;
            //     }
            //     console.log(`File uploaded successfully. ${data.Location}`);
            // });
            // });
        }catch(e){

        }
    }
}