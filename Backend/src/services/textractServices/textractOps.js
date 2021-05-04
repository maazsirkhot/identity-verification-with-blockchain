/* eslint-disable no-underscore-dangle */
const AWS = require('aws-sdk');
const fs = require('fs');
const _ = require('lodash');
const uuid = require('uuid');
const UserField = require('../../models/mongoDB/userFields');
const userDetailsDao = require('../../daos/textract/userDetailsDao');
const constants = require('../../../utils/constants');
const user = require('../../daos/user/user');
const userFields = require('../../daos/userFields/userFields');

module.exports = {
  getRelevantTextService: (data, keyValuePair, ifDataExists) => {
    try {
      const blocks = data.Blocks;
      const output = [];
      let nextLine = false;
      let nextAddressLine = 0;
      let address = "";
      _.each(blocks, (innerdata) => {
        if (innerdata.BlockType === 'LINE') {
          if ((nextAddressLine == 1 || nextAddressLine == 2) 
              &&  keyValuePair['Address'] 
              && innerdata.Text) {
            address += innerdata.Text;
            nextAddressLine += 1;
            if (nextAddressLine == 2) {
              address += "\n";
            }
            if (nextAddressLine == 3) {
              const d = {};
              d.field_id = keyValuePair['Address'];
              d.field_name = 'Address';
              d.field_value = address;
              d.verifierDoc = keyValuePair.idType;
              if (ifDataExists == 0) {
                d.isCurrent = true;
              }
              output.push(d);
            }
          } else if (innerdata.Text
              && innerdata.Text.substring(0, 2) === 'FN'
              && keyValuePair['First Name']) {
            const d = {};
            d.field_id = keyValuePair['First Name'];
            d.field_name = 'First Name';
            d.field_value = innerdata.Text.substring(2);
            d.verifierDoc = keyValuePair.idType;
            if (ifDataExists == 0) {
              d.isCurrent = true;
            }
            output.push(d);
            nextAddressLine = 1;
          } else if (innerdata.Text
              && innerdata.Text.substring(0, 2) === 'LN'
              && keyValuePair['Last Name']) {
            const d = {};
            d.field_id = keyValuePair['Last Name'];
            d.field_name = 'Last Name';
            d.field_value = innerdata.Text.substring(2);
            d.verifierDoc = keyValuePair.idType;
            if (ifDataExists == 0) {
              d.isCurrent = true;
            }
            output.push(d);
          } else if (innerdata.Text
              && innerdata.Text.substring(0, 3) === 'DOB'
              && keyValuePair['Date of Birth']) {
            const d = {};
            d.field_id = keyValuePair['Date of Birth'];
            d.field_name = 'Date of Birth';
            d.field_value = innerdata.Text.substring(4);
            d.verifierDoc = keyValuePair.idType;
            if (ifDataExists == 0) {
              d.isCurrent = true;
            }
            output.push(d);
          } else if (innerdata.Text
              && innerdata.Text.substring(0, 3) === 'EXP'
              && keyValuePair['DL Expiry Date']) {
            const d = {};
            d.field_id = keyValuePair['DL Expiry Date'];
            d.field_name = 'DL Expiry Date';
            d.field_value = innerdata.Text.substring(4);
            d.verifierDoc = keyValuePair.idType;
            if (ifDataExists == 0) {
              d.isCurrent = true;
            }
            output.push(d);
          } else if (innerdata.Text
              && innerdata.Text.substring(0, 3) === 'SEX'
              && keyValuePair.Sex) {
            const d = {};
            d.field_id = keyValuePair.Sex;
            d.field_name = 'Sex';
            d.field_value = innerdata.Text.substring(4);
            d.verifierDoc = keyValuePair.idType;
            if (ifDataExists == 0) {
              d.isCurrent = true;
            }
            output.push(d);
          } else if (nextLine == true && 
            keyValuePair['Driver License']) {
              const d = {};
              d.field_id = keyValuePair['Driver License'];
              d.field_name = 'Driver License';
              d.field_value = innerdata.Text;
              d.verifierDoc = keyValuePair.idType;
              d.isCurrent = true;
              output.push(d);
              nextLine = false;
          } else if (nextLine == true && 
            keyValuePair['Driver License']) {
              const d = {};
              d.field_id = keyValuePair['Driver License'];
              d.field_name = 'Driver License';
              d.field_value = innerdata.Text;
              d.verifierDoc = keyValuePair.idType;
              d.isCurrent = true;
              output.push(d);
              nextLine = false;
          } else if (innerdata.Text
            && innerdata.Text.substring(0, 2) === 'DL') {
              nextLine = true;
          } 
        }
      });
      return output;
    } catch (error) {
      throw new Error(`Error Occurred in DAO Layers:  + ${error}`);
    }
  },
  getAllDataFields: async (idType) => {
    try {
      const dataFieldData = await userDetailsDao.findAllDataFields();
      const idTypeData = await userDetailsDao.findIdTypeByShortName(idType);
      const idTypeObj = {
        docId: idTypeData._id,
        docName: idTypeData.name,
        docshortName: idType,
      };
      const keyValuePair = {};
      for (let i = 0; i < dataFieldData.length; i += 1) {
        keyValuePair[dataFieldData[i].fieldName] = dataFieldData[i]._id;
      }
      keyValuePair.idType = idTypeObj;
      return keyValuePair;
    } catch (error) {
      throw new Error(`Error Occurred in DAO Layers:  + ${error}`);
    }
  },
  createUserDetails: async (data, user, frontLink, backLink, idType) => {
    try {
      console.log(data);
      const userDataExists = await userFields.getUserFields({userEmail: user.email});
      if(userDataExists.length == 0) {
        const docImage = [];
        docImage.push({
          idType,
          front: frontLink,
          back: backLink,
        });
        const verifierApproval = {
          idType
        }
        const userData = new UserField({
          userId: user.userId,
          userEmail: user.email,
          dataField: data,
          docImage,
          verifierApproval: verifierApproval, 
        });
        return await userDetailsDao.createUserDetails(userData);
      } else {
        let dataField = userDataExists[0].dataField;
        dataField = dataField.concat(data);
        let docImage = userDataExists[0].docImage;
        docImage = docImage.concat([
          {
            idType,
            front: frontLink,
            back: backLink,
          }
        ]);
        let verifierApproval = userDataExists[0].verifierApproval;
        verifierApproval = verifierApproval.concat({
          idType
        });
        userDataExists[0].dataField = dataField;
        userDataExists[0].docImage = docImage;
        userDataExists[0].verifierApproval = verifierApproval;
        return await userDetailsDao.updateUserFields({userEmail:user.email}, userDataExists[0]);
      }
    } catch (error) {
      throw new Error(`Error Occurred in DAO Layers:  ${error}`);
    }
  },
  createDataFields: async (data) => {
    try {
      return await userDetailsDao.createDataFields(data);
    } catch (error) {
      throw new Error(`Error Occurred in DAO Layers:  ${error}`);
    }
  },
  findUserDetails: async (userId) => {
    try {
      userData = await userDetailsDao.findUserDetails(userId);
      if(userData.length == 0) {
        return false;
      }
      const wholeUserArray = [];
      docImages = userData[0].docImage;
      verifierApprovals = userData[0].verifierApproval;
      dataFields = userData[0].dataField;

      idTypes = [];
      _.each(docImages, (currentData) => {
        idTypes.push(currentData.idType);
      });

      _.each(idTypes, (idtype) => {
        docImage = {}
        _.each(docImages, (doc) => {
          if(doc.idType == idtype){
            docImage.front = doc.front;
            docImage.back = doc.back;
            docImage.idType = idtype;
          }
        });
        verifierApproval = {}
        _.each(verifierApprovals, (va) => {
          if(va.idType == idtype){
            verifierApproval.status = va.status;
            verifierApproval.comment = va.comment;
            verifierApproval.verifiedBy = va.verifiedBy;
            verifierApproval.idType = idtype;
          }
        });
        dataField = []
        _.each(dataFields, (df) => {
          if(df.verifierDoc.docshortName == idtype){
            dataField.push(df);
          }
        });
        const userEntry = {
          _id: userData[0]._id,
          userId: userData[0].userId,
          userEmail: userData[0].userEmail,
          dataField,
          docImage,
          verifierApproval,
          createdAt: userData[0].createdAt,
          updatedAt: userData[0].updatedAt,
          dataReference: dataField.length != 0?dataField[0].dataReference:null,
          idType: idtype,
        }
        wholeUserArray.push(userEntry);
      });
      return wholeUserArray;
    } catch (error) {
      throw new Error(`Error Occurred in DAO Layers:  ${error}`);
    }
  },
  storeFileInS3: async (file) => {
    try {
      const s3bucket = new AWS.S3({
        accessKeyId: constants.ENV_VARIABLES.AWS_S3_ACCESS_KEY,
        secretAccessKey: constants.ENV_VARIABLES.AWS_S3_SECRET_ACCESS_KEY,
        region: constants.ENV_VARIABLES.AWS_REGION,
      });
      const params = {
        Bucket: constants.ENV_VARIABLES.AWS_S3_BUCKET_NAME,
        Key: uuid.v4() + Date.toString() + file.originalname,
        Body: fs.createReadStream(file.path),
        ContentType: file.mimetype,
        ACL: 'public-read',
      };
      const data = await s3bucket.upload(params).promise();
      // console.log(data);
      if (data) {
        return data.Location;
      }
      return false;
    } catch (error) {
      throw new Error(`Error Occurred in DAO Layers:  ${error}`);
    }
  },
  createIdType: async (data) => {
    try {
      return await userDetailsDao.createIdType(data);
    } catch (error) {
      throw new Error(`Error Occurred in DAO Layers:  ${error}`);
    }
  },
  getObjectIdFromIdType: async (data) => {
    try {
      const idTypeIds = await userDetailsDao.getIdTypeObjectIds(data);
      const arrOfIdTypeObjectIds = [];
      // eslint-disable-next-line no-unused-vars
      _.forEach(idTypeIds, (val, i) => {
        arrOfIdTypeObjectIds.push(val._id);
      });
      console.log(arrOfIdTypeObjectIds);
      return arrOfIdTypeObjectIds;
    } catch (error) {
      throw new Error(`Error Occurred in DAO Layers:  ${error}`);
    }
  },
  ifValidJSON: (data) => {
    try {
      return JSON.parse(data);
    } catch (error) {
      return data;
    }
  },
  ifUserAndIdTypeExists: async (userId, idType) => {
    const userExists = await userDetailsDao.findUserDetails(userId);
    if (userExists.length == 0) {
      return 0; //user doesn't exist
    }
    const userData = await userDetailsDao.findByUserandId(userId, idType);
    if (!userData)
      return 1; // user can upload document
    else if (userData.length == 0)
      return 1; // user can upload document
    else
      return 2; // User cannot upload document
  },
};
