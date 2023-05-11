const dataL = require("../dataWorker/dataLayer"); /** Pick up methods from dataLayer */


const business = {
    
    AddReport :function(data){
        console.log(data);
        return dataL.addReport(data);
    },

    /**To Add a user */
    AddUser :function(data)  {
        console.log(data);
        return dataL.addUser(data);
    },

}
module.exports = business;