import { check, validationResult } from 'express-validator';
import { genSalt, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import normalize from 'normalize-url';
import { url } from 'gravatar'; 

import User from '../models/User';  

export const addfriends = async (req, res) => {
    
    const validationMiddleware = [
      check('username', 'Please include a valid username').length(6),
    ];
    const errors = validationMiddleware(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {username} = req.body;
    try{
        let user = await User.findOne({username});
        if(!user){
            return res.status(400).json({errors:[{msg:'Enter a valid username'}]});
        }
        await user.pendingrequest.push();
    }
}