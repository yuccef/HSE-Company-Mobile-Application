const fs = require("fs");
const fichier = "./workerBackEnd/dataWorker/signin.json"; 




/**dataLayer is a class that contains several methods for database manipulation */
let dataLayer = {

    /**method to add new user in the data base  */
    addUser: function (data){
        const users = fs.readFileSync(fichier); 
        const tab= JSON.parse(users);
        tab.push(data);
        var newdata = JSON.stringify(tab);
        fs.writeFile("./workerBackEnd/dataWorker/signin.json", newdata, err => {
            // error checking
            if(err) throw err;
            
            console.log("Utilisateur ajouté");
        });
    },

}

/**export the class to use it on other files */
module.exports =dataLayer;