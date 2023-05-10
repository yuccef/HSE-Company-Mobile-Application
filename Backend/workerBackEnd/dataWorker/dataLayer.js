const fs = require("fs");
const fichier = "./Backend/workerBackEnd/dataWorker/signin.json"; 
const fichierr = "./Backend/workerBackEnd/dataWorker/comments.json"; 





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

    addComment: function (data){
        const users = fs.readFileSync(fichierr); 
        const tab= JSON.parse(users);
        tab.push(data);
        var newdata = JSON.stringify(tab);
        fs.writeFile("./Backend/workerBackEnd/dataWorker/comments.json", newdata, err => {
            // error checking
            if(err) throw err;
            
            console.log("Commentaire ajouté");
        });
    },
}

/**export the class to use it on other files */
module.exports =dataLayer;