const express = require("express");
const app = express();
const fs = require('fs');
const cors = require('cors');
const business = require("../business/business");
const data1 = fs.readFileSync('./data/signin.json');
const data = fs.readFileSync('./data/auth.json');
const customers = JSON.parse(data);
const customers1 = JSON.parse(data1);

const apiServ = {
    start: function(port) {
        
        app.use(express.json());

        app.use(cors({
            origin: '*'
        }));
        app.get('/api/customers', (req, res) => {
            res.json(customers);
          });
          
          app.get('/api/customers/sign', (req, res) => {
            res.json(customers1);
          });
          app.post('/api/customers/sign', (req, res) => {
            business.AddUser1(req.body);
            res.json(req.body);
          });
         
        /**Creating a NEW route where we can push the data of the new user*/
        app.post('/api/customers/add', function(req, res) {
            business.AddUser(req.body);
            res.json(req.body);
            });
    
        //run
        app.listen(port, function(){
            console.log("Server running on port " + port);
        });
    }
}

module.exports = apiServ;
