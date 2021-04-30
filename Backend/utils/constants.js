module.exports = {
  STATUS_CODE: {
    SUCCESS_STATUS: 200,
    CREATED_SUCCESSFULLY_STATUS: 201,
    ACCEPTED_STATUS: 202,
    NO_CONTENT_STATUS: 204,
    MOVED_PERMANENTLY: 301,
    BAD_REQUEST_ERROR_STATUS: 400,
    UNAUTHORIZED_ERROR_STATUS: 401,
    FORBIDDEN_ERROR_STATUS: 403,
    NOT_FOUND_STATUS: 404,
    CONFLICT_ERROR_STATUS: 409,
    UNPROCESSABLE_ENTITY_STATUS: 422,
    INTERNAL_SERVER_ERROR_STATUS: 500,
  },
  MESSAGES: {
    SERVER_ERROR: 'Error Occurred with the server. Please try again!',
    INVALID_PARAMETERS_ERROR: 'Error occurred due to one or more invalid parameters. Please refer API design',
    USER_CREATED: 'User created successfully. Please try logging into account',
    LOGIN_SUCCESSFUL: 'Login has been successful. Please find your token in the data',
    USER_DETAILS: 'Retreived User Details Sucessfully',
    USER_NOT_EXIST: 'No such user exists. Please try with a different User Id',
    USER_SAVE_ERROR: 'Error in storing data. Please try again!',
    DATAFIELDS_CREATED: 'Data sucessfully created in DataFields Collection',
    DATAFIELDS_FETCHED: 'DataFields fetched successfully from the DataFields Collection',
    DATAFIELDS_UPDATED: 'DataFields updated successfully in the DataFields Collection',
    USER_CREDENTIALS_INVALID: 'Invalid credentials! Please provide valid credentials',
    USER_TOKEN_NOT_GENERATED: 'The access token could not be generated. Please try again!',
    IDTYPE_CREATED: 'Data sucessfully created in IdType Collection',
    NO_DATA_AVAILABLE: 'The data requested does not exist.',
    USER_NOT_LOGGED_IN: 'Please login to the portal to access the services.',
    TEXTRACT_RETREIVE_SUCCESS: 'Data extracted from ID Card successfully',
    TEXTRACT_RETREIVE_FAILED: 'Failed to extract data from Textract. Please try with a high resolution image',
    S3_FRONT_STORE_ERROR: 'Failed to store Front Image. Please try again!',
    S3_BACK_STORE_ERROR: 'Failed to store Back Image. Please try again!',
    USER_DETAILS_STORE_FAILED: 'Unable to store User Details',
    USER_DETAILS_STORE_SUCCESS: 'User Details Stored Sucessfully',
    USER_DETAILS_GET: 'Retrieved User Details Successfully',
    USER_DETAILS_GET_FAILED: 'Failed to retreive user details',
    INVALID_VERIFIER: 'Unauthorized access. Invalid verifier',
    FAILED_VERIFIER_DATA: 'Failed to fetch verifier data',
    NO_VERIFIER_DATA: 'There are no user data to verify at the moment',
    VERIFIER_DATA_SUCCESS: 'Successfully fetched verifier data',
    VERIFIER_DATA_FAILED: 'Error occured while fetching verifier data!',
    PERMISSION_CREATED: 'Data sucessfully created in PERMISSION Collection',
    PERMISSION_FETCHED: 'PERMISSION fetched successfully from the PERMISSION Collection',
    PERMISSION_UPDATED: 'PERMISSION updated successfully in the PERMISSION Collection',
    ROLE_CREATED: 'Data sucessfully created in ROLE Collection',
    ROLE_FETCHED: 'ROLE fetched successfully from the ROLE Collection',
    ROLE_UPDATED: 'ROLE updated successfully in the ROLE Collection',
    FAILED_USER_UPDATE: 'Failed to update User Data',
    NO_USER_DATA: 'No user data found to update',
    UPDATE_USER_DATA_SUCCESS: 'Update User Data Successfully',
    DATA_REQUEST_CREATED: 'Data Request has been created successfully',
    DATA_REQUESTS_FETCHED: 'Data Requests have been fetched successfully',
    DATA_REQUESTS_UPDATED: 'Data Requests have been updated successfully',
    POST_FETCHED: 'Post fetched for the provided details',
    INVALID_CLIENT_USER: 'Unauthorized access. Not a valid client user',
    CUSTOM_REQUEST_CREATED: 'Custom Request has been created successfully',
    CUSTOM_REQUEST_FETCHED: 'Custom Requests have been fetched successfully',
    CUSTOM_REQUEST_UPDATED: 'Custom Requests have been updated successfully',
    CUSTOM_REQUEST_SAME_NAME: 'Custom Request with the same name exists. Please use a different name.',
    USER_EXISTS: 'User with this username or email already exists',
    POST_CREATED: 'Data request has been approved and a post has been created successfully',
    FAILED_ROLE_ASSIGN: 'Failed to assign the Role',
    ROLE_ASSIGN_CREATED: 'Successfully assigned the Role',
    FAILED_BLOCKCHAIN_STORE_INFORMATION: 'Failed to create digital credentials in Blockchain',
    SUCCESS_ROLE_ASSIGN: 'Fetched Role Assign Successfully',
    DATA_REVOKE_SUCCESS: 'Role revoked sucessfully',
    DATA_REVOKE_FAILED: 'Failed to revoke this role',
    USER_CREDENTIALS_NOT_EXIST: 'User credentials does not exist for this user',
    USER_ID_UPLOADED: 'User had uploaded this ID. Cannot upload this document again.',
    INFORMAION_NOT_VERIFIED: 'User Information is not verified yet',
  },
  ENV_VARIABLES: {
    AWS_S3_ACCESS_KEY: process.env.AWS_S3_ACCESS_KEY,
    AWS_S3_SECRET_ACCESS_KEY: process.env.AWS_S3_SECRET_ACCESS_KEY,
    AWS_REGION: process.env.AWS_REGION,
    AWS_S3_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
    BLOCKCHAIN_HOST: process.env.BLOCKCHAIN_HOST,
  },
};
