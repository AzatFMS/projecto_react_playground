/**
 * Global Util Functions
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
'use strict';

// React Plugins
var React = require('react-native');

var Store = require('./store');

var {
} = React;

var UTIL = {
	/**
	  * Test if Obj is empty
	  */
	isObjEmpty: function(obj) {
	  for(var prop in obj) {
	    if(obj.hasOwnProperty(prop))
	      return false;
	  }
	  return true;
	},

	/**
	  * Convert Obj to Arr
	  */
	objToArr: function(obj) {
	  return Object.keys(obj).map(function(k) { return obj[k] });
	},

	/**
	  * Get First Item in Object
	  */
	firstIndexInObj: function(obj) {
	  for (var a in obj) return a;
	},

	cutString: function(string, size) {
		if (string && string.length > size) {
			return string.substring(0,size) + '...';
		}
		return string;
	},
	buildUrl: function(url) {
		url = url.indexOf("?") != -1 ? url + '&' : url + '?';
		var result  = 'http://opt.organizer2016.ru' + url + 'token_id=' + Store.getItem('token_id') + '&token=' + Store.getItem('token');
		console.log(result);
		return result;
	},
	taskHelper: {
		getColorByStatus: function(status) {
			switch(status) {
                case 0:
                case '0':
                    return '#afafaf';
                case 1:
                case '1':
                    return '#f4d447';
                case 2:
                case '2':
                    return '#ec7014';
                case 3:
                case '3':
                    return '#4292c6';
                case 4:
                case '4':
                    return '#238b45';
                case 5:
                case '5':
                    return '#b30000';
                default:
                    return '#cccccc';
            }
		}
	}
};

/* ==============================
  Done!
  =============================== */
  module.exports = UTIL;
  module.exports.details = {
    title: 'UTIL'
  };
