const dataL = require("../data/dataLayer");


const business = {
    AddUser1 :function(data)  {
        //console.log("AddUser");
        console.log(data);
        return dataL.addUser1(data);
    },

    /**to add a user */
    AddUser :function(data)  {
        //console.log("AddUser");
        console.log(data);
        return dataL.addUser(data);
    },

}
module.exports = business;