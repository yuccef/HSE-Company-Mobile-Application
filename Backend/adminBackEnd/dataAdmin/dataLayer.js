const fs = require("fs");
const fichier = "./Backend/adminBackend/dataAdmin/signin.json"; 
const fichierr = "./Backend/adminBackend/dataAdmin/answers.json"; 




/**dataLayer is a class that contains several methods for database manipulation */
let dataLayer = {

    /**method to add new user in the data base  */
    addUser: function (data){
        const users = fs.readFileSync(fichier); 
        const tab= JSON.parse(users);
        tab.push(data);
        var newdata = JSON.stringify(tab);
        fs.writeFile("./Backend/adminBackend/dataAdmin/signin.json", newdata, err => {
            // error checking
            if(err) throw err;
            
            console.log("Utilisateur ajouté");
        });
    },

    addAnswer: function (data){
        const users = fs.readFileSync(fichierr); 
        const tab= JSON.parse(users);
        tab.push(data);
        var newdata = JSON.stringify(tab);
        fs.writeFile("./Backend/adminBackend/dataAdmin/answers.json", newdata, err => {
            // error checking
            if(err) throw err;
            
            console.log("Réponse ajouté");
        });
    },

}

/**export the class to use it on other files */
module.exports =dataLayer;