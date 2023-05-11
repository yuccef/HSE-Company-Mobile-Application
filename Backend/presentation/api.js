const express = require("express");
const app = express();
const fs = require('fs');
const cors = require('cors');

const business = require("../workerBackEnd/businesWorker/business");
const data = fs.readFileSync('./Backend/workerBackEnd/dataWorker/signin.json');
const customers = JSON.parse(data);

const businesAdmin = require("../adminBackEnd/businessAdmin/business");
const dataAdmin = fs.readFileSync('./Backend/adminBackEnd/dataAdmin/signin.json');
const Admins = JSON.parse(dataAdmin);

const businessc = require("../workerBackEnd/businesWorker/business");
const datac = fs.readFileSync('./Backend/workerBackEnd/dataWorker/reports.json');
const customersc = JSON.parse(datac);

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

      ///////////////////////// FOR WORKERS ////////////////////////////////

        /**Create a route to Get Database with all the Information of the people registered */
         app.get('/api/customers', (req, res) => {
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
          app.post('/api/customers', (req, res) => {
              business.AddUser(req.body);
              fs.readFile('./Backend/workerBackEnd/dataWorker/signin.json', (err) => {
              if (err) {
                res.status(500).send('Erreur lors de la lecture du fichier customers.json');
              } else {
                res.json(customers);
                }
              });            
            });


       

        /**Create a route to Get Database with all the Information of the people registered */
        app.get('/api/customers/sign', (req, res) => {
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
         app.post('/api/customers/sign', (req, res) => {
            business.AddUser(req.body);
            fs.readFile('./Backend/workerBackEnd/dataWorker/signin.json', (err) => {
            if (err) {
               res.status(500).send('Erreur lors de la lecture du fichier customers.json');
            } else {
               res.json(customers);
              }
           });            
         });

          


        ///////////////////////// FOR ADMINS ////////////////////////////////



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


       

        /**Create a route to Get Database with all the Information of the people registered */
        app.get('/api/admin/sign', (req, res) => {
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
         app.post('/api/admin/sign', (req, res) => {
            businesAdmin.AddUser(req.body);
            fs.readFile('./Backend/adminBackEnd/dataAdmin/signin.json', (err) => {
            if (err) {
               res.status(500).send('Erreur lors de la lecture du fichier customers.json');
            } else {
               res.json(Admins);
              }
           });            
         });

        
/*
        
         ///////////////////////// FOR PICTURES ////////////////////////////////
        
         let latestPhoto = null;


         app.get('/api/pictures/test', (req, res) => {
          if (latestPhoto) {
            // Send the latest photo as a response
            res.send(latestPhoto.uri);
          } else {
            // If no latest photo is available, send a 404 response
            res.sendStatus(404);
          }
        });

         app.post('/api/pictures', (req, res) => {
           // Check that the request body is not empty
           if (!req.body) {
             return res.sendStatus(400); 
           }
    
           console.log('got photo');
         
           // Update the latest photo and respond happily
           latestPhoto = JSON.stringify(req.body.image);
           console.log(latestPhoto);
           console.log(req.body.comment);
           res.sendStatus(200);
         });
         
         // View latest image
         app.get('/api/pictures', (req, res) => {
           // Does this session have an image yet?
           console.log(latestPhoto);
           if (!latestPhoto) {
             return res.status(404).send("Nothing here yet");
           }
         
           console.log('sending photo');
         
           try {
             // Send the image
             var img = Buffer.from(JSON.parse(latestPhoto), 'base64');
         
             // Set the response headers before sending the response
             res.setHeader('Content-Type', 'image/png');
             res.setHeader('Content-Length', img.length);
             let fileName="testyoussef"
             // Save the image to file system
             fs.writeFile(`./signalPictures/${fileName}.png`, img, (err) => {
               if (err) throw err;
               console.log('Image saved to file system!');
             });
         
             res.send(img);
           } catch (e) {
             // Log the error and stay alive
             console.log(e);
             return res.sendStatus(500);
           }
         });
         
*/

         ///////////////////////// FOR REPORTS////////////////////////////////

        /**Create a route to Get Database with all the Information of the people registered */
        app.get('/api/worker/report', (req, res) => {
          fs.readFile('./Backend/workerBackEnd/dataWorker/reports.json', (err, data) => {
          if (err) {
            console.error(err);
          return res.sendStatus(500);
             }
           res.json(JSON.parse(data));
         });
       });    


        /**Create a route for Adding a user */
         /**the POST option is for Adding data in the server */
        app.post('/api/worker/report', (req, res) => {
           businessc.AddReport(req.body);
           fs.readFile('./Backend/workerBackEnd/dataWorker/reports.json', (err) => {
           if (err) {
              res.status(500).send('Erreur lors de la lecture du fichier customers.json');
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


//in reality here i dont know why i used 2 in the begining routes ( i will check this home)


/**export the class to use it on other files */
module.exports = apiServ;
