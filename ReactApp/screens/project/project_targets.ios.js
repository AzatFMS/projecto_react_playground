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

  var ListTargets = require('../../components/target/list.ios');

  var {
    StyleSheet,
    View,
    Text,
    Component,
  } = React;

/* ==============================
  View
  =============================== */
  var ProjectTargets = React.createClass({

    render: function() {
        return (
          <View style={styles.container}>
            <ListTargets source_url={Util.buildUrl('/projects/objects/' + this.props.route.project.id)}/>
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
    },
  });

/* ==============================
  Done!
  =============================== */
  module.exports = ProjectTargets;
  module.exports.details = {
    title: 'Цели проекта'
  };
