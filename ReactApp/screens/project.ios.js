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
    ActivityIndicatorIOS,
  } = React;

/* ==============================
  View
  =============================== */
  var Project = React.createClass({

    getInitialState: function() {

      return {
          isLoading: true,
          project: {},
        };
    },

    componentDidMount: function() {
      this.fetchResults();
    },

    fetchResults: function() {
       fetch('http://opt.organizer2016.ru/projects/view/' + this.props.route.project.id)
      .then(response => response.json())
      .then(jsonData => {
            this.setState({
               isLoading: false,
               project: jsonData,
            });
          })
      .catch(error => console.dir(error));
    },
    render: function() {
      if (this.state.isLoading) {
        return this.renderLoadingMessage();
      } else {
        return this.renderResults();
      }
    },
    renderLoadingMessage: function() {
      return (
          <View style={[AppStyles.container, AppStyles.containerCentered]}>
            <ActivityIndicatorIOS
              style={[styles.centering, {height: 80}]}
              size="large"
              color="#777"
            />
          </View>
        );
    },
    getStatusName: function(status) {
        var statuses = {
          0: 'В процессе',
          1: 'Завершён',
          2: 'Запланирован',
          3: 'На согласовании',
        };
        return statuses[status] ? statuses[status] : '';
    },
    renderResults: function() {
        var obsrvers = [];
        return (
          <View style={[AppStyles.container], styles.container}>
            <Text style={[styles.header]}>
              {this.state.project.name}
            </Text>
            <Text style={[styles.text]}>
              {this.getStatusName(this.state.project.project_status)}
            </Text>
            <Text style={[styles.text]}>
              Автор: {this.state.project.user.formatted_name}
            </Text>
            <Text style={[styles.text]}>
              {this.state.project.description}
            </Text>
          </View>
        );
      }

  });

/* ==============================
  Styles
  =============================== */
  var styles = StyleSheet.create({
    container: {
      padding: 10,
    },
    header: {
      fontWeight: 'bold',
      fontSize: 14,
      color: '#777',
    },
    text: {
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
