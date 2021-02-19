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
    USER_DETAILS: "Retreived User Details Sucessfully",
    USER_NOT_EXIST: "No such user exists. Please try with a different User Id",
    USER_SAVE_ERROR: "Error in storing data. Please try again!"
  },
};
