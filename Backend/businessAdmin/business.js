const dataL = require("../dataAdmin/dataLayer"); /** Pick up methods from dataLayer */


const business = {
    

    /**To Add a user */
    AddUser :function(data)  {
        console.log(data);
        return dataL.addUser(data);
    },

}
module.exports = business;