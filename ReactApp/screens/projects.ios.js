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

  var Project = require('./project/project.ios');

  /* Screens / Pages */
  // var AnotherPage = require('./tabbar.ios');

  var {
    StyleSheet,
    View,
    Text,
    Component,
    ListView,
    TouchableOpacity,
    ActivityIndicatorIOS,
  } = React;

/* ==============================
  View
  =============================== */
  var Projects = React.createClass({

    getInitialState: function() {

      return {
          isLoading: true,
          projects: [],
          projectsDataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
          }),
        };
    },

    showProject: function(project) {
      this.props.navigator.push({
        title: project.name,
        component: Project,
        project: project,
        index: 2,
      });
    },
    showNestedProjects: function(project) {
      this.props.navigator.push({
        title: 'Проекты',
        component: Projects,
        parentProject: project,
        index: 2,
      });
    },

    renderProject: function(project) {
        if (this.isNestedProjects(project)) {
          var right_btn = <TouchableOpacity
            onPress={() => this.showNestedProjects(project)}
            style={styles.right_btn}>
            <Text style={styles.right_btn_arrow}>></Text>
          </TouchableOpacity>;
        }
        return (
            <View style={styles.list_row}>
                <TouchableOpacity onPress={() => this.showProject(project)}
                  style={{flex: 1}}>
                  <Text style={styles.list_row_title}>
                    {project.name}
                  </Text>
                  <Text style={styles.list_row_subtitle}>
                    {this.getStatusName(project.project_status)}
                  </Text>
                </TouchableOpacity>
                { right_btn }
            </View>
        );
  },

  isNestedProjects: function(project) {
    for (var i = 0, ii = this.state.projects.length; i < ii; i++) {
      if (this.state.projects[i].parent == project.id) {
        return true;
      }
    }
    return false;
  },

  componentDidMount: function() {
    this.fetchResults();
  },
  fetchResults: function() {
    var parent = this.props.route.parentProject ? this.props.route.parentProject.id : 0;
     fetch('http://opt.organizer2016.ru/projects/list/')
    .then(response => response.json())
    .then(jsonData => {
          this.setState({
             isLoading: false,
             projects: jsonData,
             projectsDataSource: this.state.projectsDataSource.cloneWithRows(jsonData.filter((x) => x.parent == parent))
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
      return (
        <View style={[AppStyles.container]}>
          <ListView
          dataSource={this.state.projectsDataSource}
          renderRow={this.renderProject}
          />
        </View>
      );
    }

  });

/* ==============================
  Styles
  =============================== */
  var styles = StyleSheet.create({
    list_row: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
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
    right_btn: {
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    right_btn_arrow: {
      color: '#777',
      fontSize: 30,
    },
  });

/* ==============================
  Done!
  =============================== */
  module.exports = Projects;
  module.exports.details = {
    title: 'Проекты'
  };
