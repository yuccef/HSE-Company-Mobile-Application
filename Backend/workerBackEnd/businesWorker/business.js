const dataL = require("../dataWorker/dataLayer"); /** Pick up methods from dataLayer */


const business = {
    
    AddComment :function(data){
        console.log(data);
        return dataL.addComment(data);
    },

    /**To Add a user */
    AddUser :function(data)  {
        console.log(data);
        return dataL.addUser(data);
    },

}
module.exports = business;