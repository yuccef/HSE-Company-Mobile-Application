const dataL = require("../data/dataLayer");


const business = {

    AddUser :function(data)  {
        //console.log("AddUser");
        console.log(data);
        return dataL.addUser(data);
    },

}
module.exports = business;