const fs = require("fs");
const fichier = "./Backend/workerBackEnd/dataWorker/signin.json"; 
const fichierr = "./Backend/workerBackEnd/dataWorker/reports.json"; 





/**dataLayer is a class that contains several methods for database manipulation */
let dataLayer = {

    /**method to add new user in the data base  */
    addUser: function (data){
        const users = fs.readFileSync(fichier); 
        const tab= JSON.parse(users);
        tab.push(data);
        var newdata = JSON.stringify(tab);
        fs.writeFile("./Backend/workerBackEnd/dataWorker/signin.json", newdata, err => {
            // error checking
            if(err) throw err;
            
            console.log("Utilisateur ajouté");
        });
    },

    addReport: function (data){
        const users = fs.readFileSync(fichierr); 
        const tab= JSON.parse(users);
        tab.push(data);
        var newdata = JSON.stringify(tab);
        fs.writeFile("./Backend/workerBackEnd/dataWorker/reports.json", newdata, err => {
            // error checking
            if(err) throw err;
            console.log("Signalement ajouté");
        });
    },
}

/**export the class to use it on other files */
module.exports =dataLayer;