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

  var ListWillRefresh = React.createClass({

  render: function() {
    return (
      <View style={{justifyContent:'center', alignItems:'center'}}>
        <Icon
         name='fontawesome|refresh'
         size={30}
         color={AppConfig.textMain}
         style={{
           width: 30,
           height: 30,
         }}
         />
      </View>
      );
    },
  });

  var styles = StyleSheet.create({
  });

  module.exports = ListWillRefresh;
