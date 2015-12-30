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

  var ListTasks = require('../../components/task/list.ios');

  var {
    StyleSheet,
    View,
    Text,
    Component,
  } = React;

/* ==============================
  View
  =============================== */
  var ControlledTasks = React.createClass({
    render: function() {
        return (
          <View style={styles.container}>
            <ListTasks source_url={Util.buildUrl('/inbox/my')}/>
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
  module.exports = ControlledTasks;
