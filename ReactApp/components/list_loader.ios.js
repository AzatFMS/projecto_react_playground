/**
 * Icons
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
'use strict';

/**
  * =============================
  Initialise Component
  =============================== */
  // Ract
  var React = require('react-native');

  // App Globals
  var AppStyles = require('../styles.ios');
  var AppConfig = require('../config.ios');

  var {
    View,
    Component,
    StyleSheet,
    ActivityIndicatorIOS,
  } = React;

  var ListLoader = React.createClass({

  render: function() {
    return (
      <View style={{height: 50, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicatorIOS
          size="large"
          color="{AppConfig.textMain}"
        />
      </View>
      );
    },
  });

  var styles = StyleSheet.create({
  });

  module.exports = ListLoader;
