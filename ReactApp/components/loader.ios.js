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

  var Loader = React.createClass({

  render: function() {
    return (
      <View style={[AppStyles.container, AppStyles.containerCentered]}>
        <ActivityIndicatorIOS
          style={[styles.centering, {height: 80}]}
          size="large"
          color={AppConfig.textIcon}
        />
      </View>
      );
    },
  });

  var styles = StyleSheet.create({
  });

  module.exports = Loader;
