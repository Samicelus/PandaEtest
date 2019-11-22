var request = require("supertest");
var server = require("../app.js");
var expect = require('chai').expect;
var moment = require('moment');

describe('仓库api测试', function() {

  it("包裹录入", function(done){
    request(server)
      .post("/api/v1/messages")
      .send({
        relativeStaffOfCustomer:{
          username: "A",
          name: "A"
        },
        relativeCustomer:{
            username: "B",
            name: "B"
          },
        updatedBy:{
          username: "C",
          name: "C"
        },
        targetObjectType: "Parcel",
        actionType: "Receive",
        object: [
          {
            orderid: "111"
          },
          {
            orderid: "112"
          }
        ]
      })
      .expect(200)
      .expect(function(res)
        {
          expect(res.body.data).to.be.an('object');
        })
      .end(done);
  });

  it("包裹录入时缺少关键信息", function(done){
    request(server)
      .post("/api/v1/messages")
      .send({
        relativeStaffOfCustomer:{
          name: "A"
        },
        relativeCustomer:{
            username: "B",
            name: "B"
          },
        updatedBy:{
          username: "C",
          name: "C"
        },
        targetObjectType: "Parcel",
        actionType: "Receive",
        object: [
          {
            orderid: "111"
          },
          {
            orderid: "112"
          }
        ]
      })
      .expect(400)
      .end(done);
  });

  it("查询包裹测试", function(done)
    {
      var now = new Date();
      request(server)
      .get(`/api/v1/messages?filter[relativestaff]=A&filter[objecttype]=Parcel&filter[orderid]=111&createddate[lt]=${encodeURI(now.toISOString())}`)
      .expect(200)
      .expect(function(res)
      {
        expect(res.body.data).to.be.an('array').satisfies(function(array){
          let result = true;
          for(let obj of array){
             if(!obj.relativeStaffOfCustomer || !obj.relativeStaffOfCustomer.username || obj.relativeStaffOfCustomer.username!='A'){
                 result = false;
             }
          }
          return result;
        },'按姓名查询结果错误').satisfies(function(array){
            let result = true;
            for(let obj of array){
              if(moment(obj.updatedAt).toDate().getTime() >= now.getTime()){
                result = false;
              }
            }
            return result;
          },'按时间查询结果错误').satisfies(function(array){
            let result = true;
            for(let obj of array){
              let hasOrderId = false;
              for(let object of obj.object){
                if(object.orderid == "111"){
                  hasOrderId = true;
                }
              }
              if(!hasOrderId){
                result = false;
              }
            }
            return result;
          },'按订单号查询结果错误')
      })
      .end(done);
    }
  );

  it("非法时间参数查询包裹测试", function(done)
    {
      request(server)
      .get(`/api/v1/messages?filter[relativestaff]=A&filter[objecttype]=Parcel&createddate[lt]=20188-11-23T34:22:11`)
      .expect(400)
      .end(done);
    }
  );

  });

