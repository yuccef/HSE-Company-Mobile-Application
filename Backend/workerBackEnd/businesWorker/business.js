const dataL = require("../dataWorker/dataLayer"); /** Pick up methods from dataLayer */


const business = {

    /**To Add a report */
    AddReport :function(data){
        console.log(data);
        return dataL.addReport(data);
    },
    
    /**To Add a user */
    AddUser :function(data)  {
        console.log(data);
        return dataL.addUser(data);
    },

    /**To Del a answer */
      DelReport :function(data)  {
        console.log(data);
        return dataL.Del(data);
    },

}
module.exports = business;