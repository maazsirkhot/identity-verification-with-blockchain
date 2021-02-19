const _ = require('lodash');

module.exports = {
    getRelevantTextService: (data, keyValuePair) => {
        try{
            const blocks = data["Blocks"];
            const output = [];

            _.each(blocks, (innerdata, key) => {
                var BlockType = innerdata.BlockType;
                var TextType = innerdata.TextType;

                if(BlockType == "LINE" && innerdata.Text 
                    && innerdata.Text.substring(0,2) == "FN"
                    && keyValuePair["First Name"]){
                        var d = {};
                        d["field_id"] = keyValuePair["First Name"];
                        d["field_name"] = "First Name";
                        d["field_value"] = innerdata.Text.substring(2);
                        output.push(d);
                }
                else if(BlockType == "LINE" && innerdata.Text 
                    && innerdata.Text.substring(0,2) == "LN"
                    && keyValuePair["Last Name"]){
                        var d = {};
                        d["field_id"] = keyValuePair["Last Name"];
                        d["field_name"] = "Last Name";
                        d["field_value"] = innerdata.Text.substring(2);
                        output.push(d);
                }
                else if(BlockType == "LINE" && innerdata.Text 
                    && innerdata.Text.substring(0,3) == "DOB" 
                    && keyValuePair["Date of Birth"]){
                        var d = {};
                        d["field_id"] = keyValuePair["Date of Birth"];
                        d["field_name"] = "Date of Birth";
                        d["field_value"] = innerdata.Text.substring(4);
                        output.push(d);
                }else if(BlockType == "LINE" && innerdata.Text 
                && innerdata.Text.substring(0,3) == "EXP"){
                        var d = {};
                        d["field_id"] = keyValuePair["Expiry Date"];
                        d["field_name"] = "Expiry Date";
                        d["field_value"] = innerdata.Text.substring(4);
                        output.push(d);
                }else if(BlockType == "LINE" && innerdata.Text 
                && innerdata.Text.substring(0,3) == "SEX"){
                    var d = {};
                        d["field_id"] = keyValuePair["Sex"];
                        d["field_name"] = "Sex";
                        d["field_value"] = innerdata.Text.substring(4);
                        output.push(d);
                }
            });
            return output;
        }catch(e){
            throw new Error('Error Occurred in Service Layers: getRelevantTextService');
        }      
    },
};