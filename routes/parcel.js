'use strict';
const handler = require('../services/parcelService.js');
const Joi = require('@hapi/joi');
const validate = require('../libs/validate.js').validate;

module.exports = function(app){
  app.route('/api/v1/messages').post(
	validate({   //配置参数校验权限
	  payload: Joi.object().keys({
		relativeStaffOfCustomer: Joi.object().keys({
		  username: Joi.string().required(),
		  name: Joi.string().required()
		}).description('客服信息'),
		relativeCustomer: Joi.object().keys({
		  username: Joi.string().required(),
		  name: Joi.string().required()
		}).description('客户信息'),
		updatedBy: Joi.object().keys({
		  username: Joi.string().required(),
		  name: Joi.string().required()
		}).description('仓库操作员信息'),
		targetObjectType: Joi.string().valid(['Parcel']).required(),
		actionType: Joi.string().valid(['Receive']).required(),
		object: Joi.array()
	  })
	}),
	handler.addParcel);

  app.route('/api/v1/messages').get(
	validate({
	  query:Joi.object().keys({
		filter: Joi.object().keys({
		  relativestaff: Joi.string().optional(),
		  objecttype: Joi.string().valid('Parcel').optional(),
		  orderid: Joi.string().optional()
		}),
		createddate: Joi.object().keys({
		  gt: Joi.string().isoDate().optional(),
		  lt: Joi.string().isoDate().optional()
		})
	  })
	}),
	handler.getParcel);
}