const Joi = require('@hapi/joi');
const j2s = require('joi-to-swagger');
const white_list_api = require('../config/serverConfig').white_list_api;

class VALIDATE{
  constructor(){
    this.validate = this.validate.bind(this)
  }
  validate(validate){
    return async function(req, res, next){
      let data = {};
      if(validate && validate.query && req.query){
        data.query = req.query;
      }
      if(validate && validate.payload && req.body){
        data.payload = req.body;
      }
      let result;
      if(validate){
        result = Joi.validate(data, validate);
      }
      
      if(result && result.error){
        await res.status(400).send({
          code: 400,
          error: 'validation fail',
          message: result.error.message,
        })
      }else{
        await next();
      }
    }
  }

}

module.exports = new VALIDATE()
