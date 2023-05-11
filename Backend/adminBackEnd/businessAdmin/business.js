const dataL = require("../dataAdmin/dataLayer"); /** Pick up methods from dataLayer */


const business = {
    

    /**To Add a user */
    AddUser :function(data)  {
        console.log(data);
        return dataL.addUser(data);
    },

    AddAnswer :function(data)  {
        console.log(data);
        return dataL.addAnswer(data);
    },

}
module.exports = business;