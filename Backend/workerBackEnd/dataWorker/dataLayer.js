const fs = require("fs");
const fichier = "./Backend/workerBackEnd/dataWorker/signin.json"; 
const fichierr = "./Backend/workerBackEnd/dataWorker/report.json"; 





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


    addReport: function (data){
        const users = fs.readFileSync(fichierr); 
        const tab= JSON.parse(users);
        tab.push(data);
        var newdata = JSON.stringify(tab);
        fs.writeFile("./Backend/workerBackEnd/dataWorker/report.json", newdata, err => {
            // error checking
            if(err) throw err;
            console.log("Signalement ajouté");
        });
    },
    Del : function(data){
        //get data from json file
        const users = fs.readFileSync(fichierr);
        //parse to object
        let newCustomer = JSON.parse(users);
        //findIndex permet de retrouver un user en fonction du param removeuser
        const index = newCustomer.findIndex(user => user.comment === data );
        
        if (index != -1) {
            //puis de le retirer s'il existe 
            newCustomer.splice(index, 1);
            //et de reecrire le fichier
            fs.writeFileSync(fichierr, JSON.stringify(newCustomer, null, 2));
            console.log("Signalment supprimé .");
            return 1;
        } else 
        console.log("Signalement non trouvé .");
          return 0;        
    },
}

/**export the class to use it on other files */
module.exports =dataLayer;