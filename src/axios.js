import axios from 'axios';
import store from './store/index'
import {
  Message
} from 'element-ui';
let http = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  },
  transformRequest: [function (data) {
    let newData = '';
    for (let k in data) {
      if (data.hasOwnProperty(k) === true) {
        newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&';
      }
    }
    return newData;
  }]
});


function apiAxios(method, url, params, response) {
  let _than = this
  http({
    method: method,
    url: url,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
  }).then(function (res) {
    if (res.data.msg == '程序已到期' && res.data.errno == "4101") {
      Message.error("程序已到期");
      const isLogin = localStorage.uxToken ? true : false;
      if (!isLogin) {
        localStorage.removeItem("uxToken");
        this.$store.dispatch("setLogin", false);
        this.$router.push({
          name: "login"
        });
      }
    } else {
      response(res);
    }

  }).catch(function (err) {
    response(err);
  })
}

export default {
  get: function (url, params, response) {
    return apiAxios('GET', url, params, response)
  },
  post: function (url, params, response) {
    return apiAxios('POST', url, params, response)
  },
  put: function (url, params, response) {
    return apiAxios('PUT', url, params, response)
  },
  delete: function (url, params, response) {
    return apiAxios('DELETE', url, params, response)
  }

}
