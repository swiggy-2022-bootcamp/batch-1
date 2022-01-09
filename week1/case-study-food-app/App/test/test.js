// Requiring module
var assert = require('assert');
const Joi = require('joi');

function validateFood(request){
  const schema = Joi.object({
      foodname: Joi.string().required(),
      foodcost: Joi.number().required(),
      foodtype: Joi.string().valid('Indian','Chinese','Mexican','Italian','Thai')
  });

  return schema.validate(request);
}

function validateUser(request){

  const address = Joi.object({
      houseno: Joi.number().required(),
      street: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      zip: Joi.number().required()
  });

  const schema = Joi.object({
      username: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      address: address.required()
  });

  return schema.validate(request);
}


describe("Validate User request Body", () => {

  describe( "address object is missing", () => {
      
    it("should return an error message", () => {
        const schema = {
                "username": "jaya",
                "email": "tanwanijaya@gmail.com",
                "password": "jaya1234"
        };
        const response = validateUser(schema);
        assert.equal(response.error.details[0]['message'],"\"address\" is required");
    });
  });

  describe( "address.zip field is missing", () => {
      
    it("should return an error message", () => {
        const schema = {
          "username": "jaya",
          "email": "tanwanijaya@gmail.com",
          "password": "jaya1234",
          "address": {
          "houseno": 125,
          "street": "bhatia chowk",
          "city": "ulhasnagar",
          "state": "maharashtra"
          }
         };
        const response = validateUser(schema);
        assert.equal(response.error.details[0]['message'],"\"address.zip\" is required");
    });
  });
  
});

describe("Validate Food request Body", () => {

  describe( "foodname field is missing", () => {
      
    it("should return an error message", () => {
        const schema = {
          "foodcost":90,
          "foodtype":"Indian"
      };
        const response = validateFood(schema);
        assert.equal(response.error.details[0]['message'],"\"foodname\" is required");
    });
  });

  describe( "foodtype field is wrong", () => {
      
    it("should return an error message", () => {
        const schema = {
          "foodname":"idli",
          "foodcost":90,
          "foodtype":"chinese"
      };
        const response = validateFood(schema);
        assert.equal(response.error.details[0]['message'],"\"foodtype\" must be one of [Indian, Chinese, Mexican, Italian, Thai]");
    });
  });
  
});