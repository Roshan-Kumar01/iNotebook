const express = require('express');
const User = require('../models/User')
const router = express.Router();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser')

const JWT_SECRET = 'Roshanisagoodb$oy';

//Route1:Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser',
    body('name').isLength({min:3}).withMessage("name should be of min 3 length"),
    body('email').isEmail().withMessage("must be a valid email"),
    body('password').isLength({min:5}).withMessage("password should be of min 5 length")
    ,async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }  
    //Check whether the user with this email exists already
    try
    {
        let user = await User.findOne({email:req.body.email});
        if(user)
        {
            return res.status(400).json({error:"Sorry a user with this email already exists"})
        }
        //implementing salt and pepper for more security
        const salt = await bcrypt.genSalt(10)
        secPass = await bcrypt.hash(req.body.password,salt)

        user = await User.create({
           name:req.body.name,
           password:secPass,
           email:req.body.email 
        }) 

        const data = {
            user:{
                id:user.id 
            }
        }
        const authtoken = jwt.sign(data,JWT_SECRET)
        res.json({authtoken})

    }catch(error)
    {
       console.log(error.messase)
       res.status(500).send("Internal Server Error")
    }
})
 

//Route2:Authenticate User using: POST "/api/auth/login". No login required

router.post('/login',
    body('email').isEmail().withMessage("must be a valid email"),
    body('password').exists().withMessage("Password cannot be blank")
    ,async (req,res) => {
      //If there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if(!errors.isEmpty()){
          return res.status(400).json({errors:errors.array()});
      }  

      const {email,password} = req.body;
      try{
         let user = await User.findOne({email});
         if(!user)
         {
            return res.status(400).json({error:"Please try to login with correct credentials"})
         }

         const passwordCompare = await bcrypt.compare(password,user.password)
         if(!passwordCompare)
         {
            return res.status(400).json({error:"Please try to login with correct credentials"})
         }

         const data = {
            user:{
                id:user.id 
            }
        }
        const authtoken = jwt.sign(data,JWT_SECRET)
        res.json({authtoken})
      }catch(error)
      {
        console.log(error.messase)
        res.status(500).send("Internal Server Error")
      }

    })
 //Route3:Get loggedin User Details using: POST "/api/auth/getuser".login required
 //fetchUser=>middleware
 router.post('/getuser',fetchUser,async (req,res) => {
 
      try{
         const userId = req.user.id;
         const user = await User.findById(userId).select("-password")
         res.send(user)
      }catch(error)
      {
        console.log(error.messase)
        res.status(500).send("Internal Server Error")
      }

    })
module.exports = router