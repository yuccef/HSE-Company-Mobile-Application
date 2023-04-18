const express = require("express");
const app = express();
const fs = require('fs');
const cors = require('cors');
const business = require("../business/business");

const data = fs.readFileSync('./data/auth.json');
const customers = JSON.parse(data);


const apiServ = {
    start: function(port) {
        
        app.use(express.json());

        app.use(cors({
            origin: '*'
        }));
        app.get('/api/customers', (req, res) => {
            res.json(customers);
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
