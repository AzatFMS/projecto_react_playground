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

  var {Icon, TabBarIOS} = require('react-native-icons');

  var {
    View,
    Component,
    StyleSheet,
    ActivityIndicatorIOS,
  } = React;

  var ListRefreshIdle = React.createClass({

  render: function() {
    var icon;
    if (this.props.reverse) {
      icon =   <Icon
         name='fontawesome|arrow-up'
         size={30}
         color={AppConfig.textMain}
         style={{
           width: 30,
           height: 30,
         }}
         />;
    } else {
      icon =   <Icon
         name='fontawesome|arrow-down'
         size={30}
         color={AppConfig.textMain}
         style={{
           width: 30,
           height: 30,
         }}
         />;
    }
    return (
      <View style={{height: 50, justifyContent:'center', alignItems:'center'}}>
        {icon}
      </View>
      );
    },
  });

  var styles = StyleSheet.create({
  });

  module.exports = ListRefreshIdle;
