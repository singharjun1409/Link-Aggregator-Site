import './db.mjs';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

const User = mongoose.model('User');

const startAuthenticatedSession = (req, user) => {
  return new Promise((fulfill, reject) => {
    req.session.regenerate((err) => {
      if (!err) {
        req.session.user = user; 
        fulfill(user);
      } else {
        reject(err);
      }
    });
  });
};

const endAuthenticatedSession = req => {
  return new Promise((fulfill, reject) => {
    req.session.destroy(err => err ? reject(err) : fulfill(null));
  });
};


const register = async (username, email, password) => {
  if (username.length >= 8 && password.length >= 8){
    const create = User.findOne({username:username}).then(function(val){
      if(val === null){
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const user1 = new User({
        username: username, password: hash, email: email
      });
      user1.save();
      return user1;
      }
    
      else{
        const err2 = {message: "USERNAME ALREADY EXISTS"};
        throw (err2);
        
      }
    });
    return create;
  }
  else{
    const err1 = {message: "USERNAME PASSWORD TOO SHORT"};
    throw (err1);
  }
};

const login = async (username, password) => {
  const create = User.findOne({username: username}).then(function(val){
    if (val === null){
      throw({message:"USER NOT FOUND"});
    }
    else if(bcrypt.compareSync(password, val.password)){
        return val;
      }
      else{
        throw({message:"PASSWORDS DO NOT MATCH"});
      }
  });
  return create;
};

export {
  startAuthenticatedSession,
  endAuthenticatedSession,
  register,
  login
};
