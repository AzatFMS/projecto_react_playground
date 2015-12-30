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

  var ListEvents = require('../../components/event/list.ios');


  var {
    StyleSheet,
    View,
    Text,
    Component,
  } = React;

/* ==============================
  View
  =============================== */
  var ProjectEvents = React.createClass({
    render: function() {
        return (
          <View style={styles.container}>
            <ListEvents source_url={Util.buildUrl('/projects/events/' + this.props.project.id )}/>
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
  module.exports = ProjectEvents;
