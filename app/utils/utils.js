import Cookies from 'js.cookie';
import $ from 'jquery'
class UTILS {
  static setCookie(key, value) {
    if (!key || !value) {
      return;
    }
    var now = new Date();
    var expires_time = now.getTime() + 1800 * 1000;
    var expires = new Date();
    expires.setTime(expires_time);
    Cookies.set(key, value, { 'expires': expires.toGMTString() });
  }
  static getQueryFromUrl () {
    var query = window.location.search;
    query = query.substr(1);
    var params = query.split("&");
    var ret = {};
    for (var i = 0; i < params.length; i++) {
      var kv = params[i].split("=");
      if (kv.length === 2) {
        ret[decodeURI(kv[0])] = decodeURI(kv[1]);
      }
    }
    return ret;
  }
  
  static ajax (settings) {
    if (!settings) {
      return;
    }
    var url = settings['url'];
    var data = settings['data'];
    var method = settings['method'];
    // success = 1, normal response
    var success_callback = settings['success'];
    // success = 0, normal response
    var unsuccess_callback = settings['unsuccess']
    // failure response with error code
    var failure_callback = settings['failure'];
    var always_callback = settings['always'];
    $.ajax(url, {
        data: data,
        method: method,
        xhrFields: { withCredentials: true },
        success: function (res) {
          if (res['success'] === 1) {
            success_callback(res);
          }
          else {
            unsuccess_callback(res);
          }
        },
        error: failure_callback,
    }).always(always_callback);
  }
};
export default UTILS;