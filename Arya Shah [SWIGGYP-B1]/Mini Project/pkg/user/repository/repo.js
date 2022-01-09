const userModel = require('../../../model/users/user');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

class userRepository {
    async createUser(payload) {
      try {
        const data = await userModel.create(payload);
        const token = await data.generateAuthToken(data.password);
        const response = { ...data["_doc"], token }; 
        return response
      } catch (error) {
        if (error.message.substring(0, 6) === 'E11000') {
          throw new Error('user already exist')// E11000 is basically the duplicate key error!
        } else {
          throw error
        }
      }
    }

    async userLogin(payload) {
        try {
          const { email, password } = payload;
          const data = await userModel.findOne({ email: email })
          if (!data) {
            throw new Error('User not found')
          }
          const isPasswordMatch = await bcrypt.compare(password, data.password)
          if (!isPasswordMatch) {
            throw new Error('Invalid login credentials')
          }
          return data;
        } catch (error) {
          throw error
        }
      }
      
      }

module.exports= userRepository