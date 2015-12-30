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

  var ListWillRefresh = React.createClass({

  render: function() {
    return (
      <View style={{height: 50, justifyContent:'center', alignItems:'center'}}>
        <Icon
         name='ion|ios-refresh-outline'
         size={40}
         color={AppConfig.textIcon}
         style={{
           width: 40,
           height: 40,
         }}
         />
      </View>
      );
    },
  });

  var styles = StyleSheet.create({
  });

  module.exports = ListWillRefresh;
