import { check, validationResult } from 'express-validator';
import { genSalt, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import normalize from 'normalize-url';
import { url } from 'gravatar'; 


import User from '../models/User';  


export const signup = async (req, res) => {
  
  const validationMiddleware = [
    check('name', 'Name is required').notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  ];

  
  await Promise.all(validationMiddleware.map(validation => validation.run(req)));

 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }

    const avatar = normalize(url(email), { forceHttps: true });

    user = new User({
      name,
      email,
      avatar,
      password,
    });

    const salt = await genSalt(10);
    user.password = await hash(password, salt);
    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    sign(
      payload,
      get("jwtSecret"), 
      { expiresIn: '5 days' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};



export const login = async (req, res) => {
    
    const validationMiddleware = [
      check('email', 'Please include a valid email').isEmail(),
      check('password', 'Password is required').exists(),
    ];
  
   
    await Promise.all(validationMiddleware.map(validation => validation.run(req)));
  
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
      }
  
      const isMatch = await compare(password, user.password);
  
      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
      }
  
      const payload = {
        user: {
          id: user.id,
        },
      };
  
      sign(
        payload,
        get("jwtSecret"),  
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };