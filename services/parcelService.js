const BaseService = require('../libs/baseService.js');
const service = new BaseService();
const _ = require('lodash');
const moment = require('moment');
const Parcel = require('../models/parcel.js');

service.addParcel = async function(req, res){
  let payload = req.body;
  let parcel = await Parcel(payload).save();
  await service.restSuccess(res, parcel);
}

service.getParcel = async function(req, res){
  let params = req.query;
  let condition = {};
  if(params.filter){
    if(params.filter.relativestaff){
      condition["relativeStaffOfCustomer.username"] = params.filter.relativestaff;
    }
    if(params.filter.objecttype){
      condition["targetObjectType"] = params.filter.objecttype;
    }
    if(params.filter.orderid){
      condition["object"] = {$elemMatch: {orderid: params.filter.orderid}};
    }
  }
  if(params.createddate){
    if(params.createddate.gt){
      condition["updatedAt"] = {$gt: moment(params.createddate.gt).toDate()};
    }
    if(params.createddate.lt){
      if(condition["updatedAt"]){
        condition["updatedAt"]["$lt"] = moment(params.createddate.lt).toDate();
      }else{
        condition["updatedAt"] = {$lt: moment(params.createddate.lt).toDate()};
      }
    }
  }
  let list = await Parcel.find(condition);
  await service.restSuccess(res, list);
}

module.exports = service;