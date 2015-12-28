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

var AppConfig = require('./config.ios');

var {
} = React;

var Util = {
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
		var result  = AppConfig.api_url + url + 'token_id=' + Store.getItem('token_id') + '&token=' + Store.getItem('token');
		console.log(result);
		return result;
	},
	//проекты
	projectsHelper: {
		getStatusName: function(status) {
				var statuses = {
					0: 'В процессе',
					1: 'Завершён',
					2: 'Запланирован',
					3: 'На согласовании',
				};
				return statuses[status] ? statuses[status] : '';
		},
		getIconByType: function(type) {
        switch (type) {
            case 1:
                return 'fontawesome|folder-open';
            case 2:
                return 'fontawesome|share-alt';
            case 3:
                return 'fontawesome|briefcase';
            case 4:
                return 'fontawesome|user-secret';
            default:
                return 'fontawesome|briefcase';
        }
		},
	},
	//Задачи
	taskHelper: {
		getColorByStatus: function(status) {
			switch(status) {
                case 0:
                    return '#afafaf';
                case 1:
                    return '#f4d447';
                case 2:
                    return '#ec7014';
                case 3:
                    return '#4292c6';
                case 4:
                    return '#238b45';
                case 5:
                    return '#b30000';
                default:
                    return '#cccccc';
            }
		},
		getSignByPriority: function(priority_id) {
			var label = '';
      for (var i = 0; i < priority_id; i++) {
          label += '!';
      }
      return label;
		}
	},
	//Цели
	targetsHelper: {
			getStatusName: function(status) {
				var statuses = {
						0: 'В процессе',
					 	1: 'Достигнута',
					 	2: 'Провалена',
				};
				return statuses[status];
			}
	},
	//События
	eventHelper: {
		getColorByStatus: function(status) {
			switch(status) {
				case 0:
					return '#225ea8';
				case 1:
					return '#fee090';
				case 2:
					return '#d73027';
				case 4:
					return '#4d4d4d';
				case 6:
					return '#225ea8';
				case 7:
					return '#88419d';
				case 8:
					return '#01665e';
				default:
					return '#cccccc';
			}
		}
	}
};

/* ==============================
  Done!
  =============================== */
  module.exports = Util;
  module.exports.details = {
    title: 'Util'
  };
