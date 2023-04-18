const dataL = require("../data/dataLayer");


const business = {


    /**to add a user */
    AddUser :function(data)  {
        //console.log("AddUser");
        console.log(data);
        return dataL.addUser(data);
    },

}
module.exports = business;