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
    }
  };

  module.exports = Store;
  module.exports.details = {
    title: 'Store'
  };
