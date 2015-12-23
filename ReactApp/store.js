/**
 * Global DB Functions
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
'use strict';

  var Store = {
    items: {},
    setItem: function(key, value) {
      this.items[key] = value;
    },
    getItem: function(key) {
      return this.items[key];
    },
    deleteItem: function(key) {
      delete this.items[key];
    },
    clear: function() {
      this.items = {};
    }
  };

  module.exports = Store;
  module.exports.details = {
    title: 'Store'
  };
