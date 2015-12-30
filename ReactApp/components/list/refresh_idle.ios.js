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
         name='ion|ios-arrow-thin-up'
         size={40}
         color={AppConfig.textIcon}
         style={{
           width: 40,
           height: 40,
         }}
         />;
    } else {
      icon =   <Icon
         name='ion|ios-arrow-thin-down'
         size={40}
         color={AppConfig.textIcon}
         style={{
           width: 40,
           height: 40,
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
