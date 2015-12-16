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
  var AppStyles = require('../styles.ios');
  var AppConfig = require('../config.ios');

  /* Screens / Pages */
  // var AnotherPage = require('./tabbar.ios');

  var {
    StyleSheet,
    View,
    Text,
    Component,
  } = React;

/* ==============================
  View
  =============================== */
  var Project = React.createClass({

    getInitialState: function() {

      return {
        };
    },

    /**
      * RENDER
      */
    render() {
      return (
        <View style={[AppStyles.container, AppStyles.containerCentered]}>
          <Text style={[AppStyles.baseText, AppStyles.p]}>
            {this.props.route.project.name}
          </Text>
          <Text>
            {this.props.route.project.status}
          </Text>
        </View>
      );
    }

  });

/* ==============================
  Styles
  =============================== */
  var styles = StyleSheet.create({
    list_row: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: AppConfig.subtleGreyBorder,
    },
    list_row_title: {
      fontWeight: 'bold',
      color: '#777',
    },
    list_row_subtitle: {
      color: '#777',
    },
  });

/* ==============================
  Done!
  =============================== */
  module.exports = Project;
  module.exports.details = {
    title: 'Проекты'
  };
