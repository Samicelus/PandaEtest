'use strict';
const RESULT_TRUE = 'TRUE';
const RESULT_FALSE = 'FALSE';

class BaseService{
  constructor() {
      /**
      * 处理成功返回
      */
      this.restSuccess = async function restSuccess(res, data){
        let result = {result: RESULT_TRUE};
        if (data) {
          result.data = data;
        }
        await res.status(200).send(result);
      }

      /**
      * 处理错误返回
      */
      this.restError = async function restError(res,err_code, err_msg){
        var result = {result: RESULT_FALSE};
        if (err_code) {
          result.errorcode = err_code;
        }
        if (err_msg) {
          result.msg = err_msg;
        }
        await res.status(500).send(result);
      }
  };
}

module.exports = BaseService;