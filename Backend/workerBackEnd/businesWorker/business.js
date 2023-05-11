const dataL = require("../dataWorker/dataLayer"); /** Pick up methods from dataLayer */


const business = {

    AddReport :function(data){
        console.log(data);
        return dataL.addReport(data);
    },
    
    AddComment :function(data){
        console.log(data);
        return dataL.addComment(data);
    },

    /**To Add a user */
    AddUser :function(data)  {
        console.log(data);
        return dataL.addUser(data);
    },

      /**To Add a user */
      DelReport :function(data)  {
        console.log(data);
        return dataL.Del(data);
    },

}
module.exports = business;