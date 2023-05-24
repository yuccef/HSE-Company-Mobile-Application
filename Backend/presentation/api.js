const express = require("express");
const app = express();
const fs = require('fs');
const cors = require('cors');


/**Data manage for Workers */
const business = require("../workerBackEnd/businesWorker/business");
const data = fs.readFileSync('./Backend/workerBackEnd/dataWorker/signin.json');
const customers = JSON.parse(data);

/**Data manage for Admins */
const businesAdmin = require("../adminBackEnd/businessAdmin/business");
const dataAdmin = fs.readFileSync('./Backend/adminBackEnd/dataAdmin/signin.json');
const Admins = JSON.parse(dataAdmin);

/**Data manage for Comments */
const businessc = require("../workerBackEnd/businesWorker/business");
const datac = fs.readFileSync('./Backend/workerBackEnd/dataWorker/report.json');
const customersc = JSON.parse(datac);

/**Data manage for Answers */
const businesAdmina = require("../adminBackEnd/businessAdmin/business");
const dataAdmina = fs.readFileSync('./Backend/adminBackEnd/dataAdmin/answers.json');
const Adminsa = JSON.parse(dataAdmina);

const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));




/**Creating apiServ class  */
const apiServ = {



     start: function(port) {
                
     app.use(express.json());

     app.use(cors({
          origin: '*'
      }));

      
       /**FOR Workers */


        /**Create a route to Get Database with all the Information of the people registered */
         app.get('/api/worker', (req, res) => {
            fs.readFile('./Backend/workerBackEnd/dataWorker/signin.json', (err, data) => {
            if (err) {
              console.error(err);
              return res.sendStatus(500);
            }
            res.json(JSON.parse(data));
             });
           });

                    
          /**Create a route for Adding a user */
          /**the POST option is for Adding data in the server */
          app.post('/api/worker', (req, res) => {
              business.AddUser(req.body);
              fs.readFile('./Backend/workerBackEnd/dataWorker/signin.json', (err) => {
              if (err) {
                res.status(500).send('Erreur lors de la lecture du fichier customers.json');
              } else {
                res.json(customers);
                }
              });            
            });


       
       /**FOR Admins */



          /**Create a route to Get Database with all the Information of the people registered */
          app.get('/api/admin', (req, res) => {
            fs.readFile('./Backend/adminBackEnd/dataAdmin/signin.json', (err, data) => {
            if (err) {
              console.error(err);
              return res.sendStatus(500);
            }
            res.json(JSON.parse(data));
             });
           });

                    
          /**Create a route for Adding a user */
          /**the POST option is for Adding data in the server */
          app.post('/api/admin', (req, res) => {
              businesAdmin.AddUser(req.body);
              fs.readFile('./Backend/adminBackEnd/dataAdmin/signin.json', (err) => {
              if (err) {
                res.status(500).send('Erreur lors de la lecture du fichier customers.json');
              } else {
                res.json(Admins);
                }
              });            
            });





       /**FOR Answers */


        /**Create a route to Get Database with all the Information of the people registered */
         app.get('/api/admin/answers', (req, res) => {
          fs.readFile('./Backend/adminBackEnd/dataAdmin/answers.json', (err, data) => {
          if (err) {
          console.error(err);
          return res.sendStatus(500);
             }
           res.json(JSON.parse(data));
         });
       });    


        /**Create a route for Adding an answer */
        /**the POST option is for Adding data in the server */
        app.post('/api/admin/answers', (req, res) => {
           businesAdmina.AddAnswer(req.body);
           fs.readFile('./Backend/adminBackEnd/dataAdmin/answers.json', (err) => {
           if (err) {
              res.status(500).send('Erreur lors de la lecture du fichier answers.json');
           } else {
              res.json(Adminsa);
             }
          });            
        });
      



        /**FOR Reports */


        /**Create a route to Get Database with all the Information of the people registered */
        app.get('/api/worker/report', (req, res) => {
          fs.readFile('./Backend/workerBackEnd/dataWorker/report.json', (err, data) => {
          if (err) {
            console.error(err);
          return res.sendStatus(500);
             }
           res.json(JSON.parse(data));
         });
       });    


        /**Create a route for Adding a Report */
         /**the POST option is for Adding data in the server */
        app.post('/api/worker/report', (req, res) => {
           businessc.AddReport(req.body);
           fs.readFile('./Backend/workerBackEnd/dataWorker/report.json', (err) => {
           if (err) {
              res.status(500).send('Erreur lors de la lecture du fichier customers.json');
           } else {
              res.json(customersc);
             }
          });            
        });


        /**Create a route for Deleting Reports */
        /**the DEL option is for Deleting data in the server */
        app.delete('/api/worker/report', (req, res) => {
            businessc.DelReport(req.query.comment);
            fs.readFile('./Backend/workerBackEnd/dataWorker/report.json', (err, data) => {
              if (err) {
                  res.status(500).send('Erreur lors de la lecture du fichier report.json');
              } else {
                  res.json(customersc);
                   }
              });
          });


        /**Server running on port */
        app.listen(port, function(){
            console.log("Server running on port " + port);
        });
    }
}

/**export the class to use it on other files */
module.exports = apiServ;
