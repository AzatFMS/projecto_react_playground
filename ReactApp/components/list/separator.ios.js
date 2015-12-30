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
  var AppStyles = require('../../styles.ios');
  var AppConfig = require('../../config.ios');

  var {
    View,
    Component,
    StyleSheet,
  } = React;

  var ListSeparator = React.createClass({

  render: function() {
    return (
      <View style={styles.separator}></View>
      );
    },
  });

  var styles = StyleSheet.create({
    separator: {
      borderBottomWidth: 1,
      borderBottomColor: AppConfig.subtleGreyBorder,
      marginLeft: 10,
    }
  });

  module.exports = ListSeparator;
