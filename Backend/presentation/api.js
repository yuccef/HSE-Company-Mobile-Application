const express = require("express");
const app = express();
const fs = require('fs');
const cors = require('cors');
const business = require("../business/business");
const data = fs.readFileSync('./Backend/data/signin.json');
const customers = JSON.parse(data);




/**Creating apiServ class  */
const apiServ = {



     start: function(port) {
                
     app.use(express.json());

     app.use(cors({
          origin: '*'
      }));

      

        /**Create a route to Get Database with all the Information of the people registered */
         app.get('/api/customers', (req, res) => {
            fs.readFile('./Backend/data/signin.json', (err, data) => {
            if (err) {
              console.error(err);
              return res.sendStatus(500);
            }
            res.json(JSON.parse(data));
             });
           });

                    
          /**Create a route for Adding a user */
          /**the POST option is for Adding data in the server */
          app.post('/api/customers', (req, res) => {
              business.AddUser(req.body);
              fs.readFile('./Backend/data/signin.json', (err) => {
              if (err) {
                res.status(500).send('Erreur lors de la lecture du fichier customers.json');
              } else {
                res.json(customers);
                }
              });            
            });


       

        /**Create a route to Get Database with all the Information of the people registered */
        app.get('/api/customers/sign', (req, res) => {
           fs.readFile('./Backend/data/signin.json', (err, data) => {
           if (err) {
           console.error(err);
           return res.sendStatus(500);
              }
            res.json(JSON.parse(data));
          });
        });    


         /**Create a route for Adding a user */
          /**the POST option is for Adding data in the server */
         app.post('/api/customers/sign', (req, res) => {
            business.AddUser(req.body);
            fs.readFile('./Backend/data/signin.json', (err) => {
            if (err) {
               res.status(500).send('Erreur lors de la lecture du fichier customers.json');
            } else {
               res.json(customers);
              }
           });            
         });

          





        /**Server running on port */
        app.listen(port, function(){
            console.log("Server running on port " + port);
        });
    }
}


//in reality here i dont know why i used 2 in the begining routes ( i will check this home)


/**export the class to use it on other files */
module.exports = apiServ;
