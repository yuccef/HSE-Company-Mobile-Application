const express = require("express");
const app = express();
const fs = require('fs');
const cors = require('cors');
const business = require("../business/business");
const data = fs.readFileSync('./Backend/data/signin.json');
const customers = JSON.parse(data);

const apiServ = {
    start: function(port) {
        
        app.use(express.json());

        app.use(cors({
            origin: '*'
        }));

                          /**Create a route to Get the data of all users */
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

          
                      /**Create a route to Get the data of all users */
                    app.get('/api/customers/sign', (req, res) => {
                        fs.readFile('./Backend/data/signin.json', (err, data) => {
                            if (err) {
                                console.error(err);
                                return res.sendStatus(500);
                            }
                            res.json(JSON.parse(data));
                        });
                    });

        //run
        app.listen(port, function(){
            console.log("Server running on port " + port);
        });
    }
}

module.exports = apiServ;
