const express = require('express');
let User = require("../models/user.model");
const router = express.Router();

router.route("/").get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json(`Err: ${err}`));
});

router.route("/add").post((req, res) => {
  console.log(`User data received! Name of user: ${req.body.name} and Username is: ${req.body.username} and Password is: ${req.body.password}`);
  const name = req.body.name;
  const username = req.body.username;
  const password = req.body.password;
  const newUser = new User({name, username, password });
  newUser
    .save()
    .then(() => res.json("User Added!"))
    .catch(err => res.status(400).json(`Err: ${err}`));
});

router.route("/login").post(async (req, res) => {
  console.log(`Login data received! Username is: ${req.body.username} and Password is: ${req.body.password}`);
  const username = req.body.username;
  const password = req.body.password;
  try {
    const user = await User.findOne({ username: username });
    if(user){
      console.log("user name is "+user.username+" and password is: "+user.password);
      if(user.password == password){
        console.log("Username is: "+username+" Password is: "+password);
        res.json({"status":"true"});
      }else{
        res.json({"status":"false"});
      }
    }else{
      res.json({"status":"Invalid User"});
    }
  } catch (error) {
    res.json({ "status":"Invalid User" });
  }
});

module.exports = router;