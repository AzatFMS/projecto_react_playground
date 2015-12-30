/**
 * Coming Soon
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
'use strict';

/* ==============================
  Initialise Component
  =============================== */
  // React
  var React = require('react-native');

  // App Globals
  var AppStyles = require('../../styles.ios');
  var AppConfig = require('../../config.ios');

  var Util = require('../../util.ios');

  var NoItems = require('../../components/list/no_items.ios');

  var {
    StyleSheet,
    View,
    Text,
    Component,
  } = React;

/* ==============================
  View
  =============================== */
  var Notices = React.createClass({
    render: function() {
        return (
          <View style={styles.container}>
            <NoItems text="Нет уведомлений"/>
          </View>
        );
      }
  });

/* ==============================
  Styles
  =============================== */
  var styles = StyleSheet.create({
    container: {
      flex: 1,
      marginBottom: 50,
    },
  });

/* ==============================
  Done!
  =============================== */
  module.exports = Notices;
