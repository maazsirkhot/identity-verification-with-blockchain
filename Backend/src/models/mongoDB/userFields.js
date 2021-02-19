const mongoose = require('mongoose');

const userFieldSchema = new mongoose.Schema(
{
    userId: {
        type: String
    },
    dataField: [
    {
        field_id: {
            type: String,
            required: true
        },
        field_name:{
            type: String,
            required: true
        },
        field_value:{
            type: String,
            required: true
        },
        dataReference:{
            type: String,
            required: false
        },
        isVerified:{
            type: Boolean,
            required: true,
            default: false
        },
        permissions:{
            type: [Object],
            required: false
        }
    }] 
}
);

module.exports = userFields = mongoose.model('userFields', userFieldSchema);