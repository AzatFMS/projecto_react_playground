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


  var ProjectResume = require('./project_resume.ios');

  var {
    StyleSheet,
    View,
    Text,
    Component,
    ActivityIndicatorIOS,
    TouchableOpacity,
    TabBarIOS,
  } = React;

  var {Icon, TabBarIOS} = require('react-native-icons');

/* ==============================
  View
  =============================== */
  var Project = React.createClass({

    getInitialState: function() {
      return {
          selectedTab: 'resume',
          project: this.props.route.project,
        };
    },

    render: function() {
      return (
        <TabBarIOS selectedTab={this.state.selectedTab}
        tintColor={'#e2e3e4'}
        barTintColor={'#000000'}>
          <TabBarIOS.Item
            selected={this.state.selectedTab === 'resume'}
            title="Сводка"
            iconName={'fontawesome|clock-o'}
            iconSize={28}
            onPress={() => {
              this.setState({
                selectedTab: 'resume',
              });
            }}>
            <ProjectResume navigator={this.props.navigator} project={this.state.project}/>
          </TabBarIOS.Item>
          <TabBarIOS.Item
            selected={this.state.selectedTab === 'tasks'}
            title="Задачи"
            iconName={'fontawesome|check-square-o'}
            iconSize={28}
            onPress={() => {
              this.setState({
                selectedTab: 'tasks',
              });
            }}>
            <ProjectResume navigator={this.props.navigator} project={this.state.project}/>
          </TabBarIOS.Item>
          <TabBarIOS.Item
            selected={this.state.selectedTab === 'events'}
            title="События"
            iconName={'fontawesome|calendar'}
            iconSize={28}
            onPress={() => {
              this.setState({
                selectedTab: 'events',
              });
            }}>
            <ProjectResume navigator={this.props.navigator} project={this.state.project}/>
          </TabBarIOS.Item>
          <TabBarIOS.Item
            selected={this.state.selectedTab === 'notes'}
            title="Заметки"
            iconName={'fontawesome|file-text-o'}
            iconSize={28}
            onPress={() => {
              this.setState({
                selectedTab: 'notes',
              });
            }}>
            <ProjectResume navigator={this.props.navigator} project={this.state.project}/>
          </TabBarIOS.Item>
          <TabBarIOS.Item
            selected={this.state.selectedTab === 'files'}
            title="Файлы"
            iconName={'fontawesome|file-o'}
            iconSize={28}
            onPress={() => {
              this.setState({
                selectedTab: 'files',
              });
            }}>
            <ProjectResume navigator={this.props.navigator} project={this.state.project}/>
          </TabBarIOS.Item>
        </TabBarIOS>
      );
    },

  });

/* ==============================
  Styles
  =============================== */
  var styles = StyleSheet.create({

  });

/* ==============================
  Done!
  =============================== */
  module.exports = Project;
  module.exports.details = {
    title: 'Проекты'
  };
