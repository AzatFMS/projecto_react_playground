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
  var Projects = require('./projects.ios');

  var {
    StyleSheet,
    View,
    Text,
    Component
  } = React;

/* ==============================
  View
  =============================== */
  var Start = React.createClass({

    /**
      * Navigates to page from menu
      */
    navigate: function() {
      this.props.navigator.push({
        title: "Проекты",
        component: Projects,
        index: 2,
      });
    },

    /**
      * RENDER
      */
    render() {
      return (
        <View style={[AppStyles.container, AppStyles.containerCentered]}>
          <Text style={[AppStyles.baseText, AppStyles.p]}>
            Стартовая страница
          </Text>
          <Text onPress={this.navigate}>
            Перейти на страницу проектов
          </Text>
        </View>
      );
    }

  });

/* ==============================
  Styles
  =============================== */
  var styles = StyleSheet.create({
  });

/* ==============================
  Done!
  =============================== */
  module.exports = Start;
  module.exports.details = {
    title: 'Стартовая страница'
  };
