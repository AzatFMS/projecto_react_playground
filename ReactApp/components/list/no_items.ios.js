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
    ActivityIndicatorIOS,
    Text,
  } = React;

  var NoItems = React.createClass({

    render: function() {
      return (
        <View style={[AppStyles.container, AppStyles.containerCentered]}>
          <Text style={AppStyles.baseText}>{this.props.text}</Text>
        </View>
        );
      },
  });

  var styles = StyleSheet.create({

  });

  module.exports = NoItems;
