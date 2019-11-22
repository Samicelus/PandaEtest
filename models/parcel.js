const BaseModel = require('../libs/baseModel.js');
const model  = new BaseModel();

const _Schema = new model.Schema({
	relativeStaffOfCustomer:{ 
    username: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  relativeCustomer:{ 
    username: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  updatedBy:{ 
    username: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  updatedAt:{
    type: Date,
    default: Date.now
  },
  targetObjectType:{
    type: String
  },
  actionType:{
    type: String
  },
  object:[
    {
      orderid: {
        type: String
      }
    }
  ]
}, {versionKey: false});

module.exports = model.mongoose.model('parcels', _Schema);