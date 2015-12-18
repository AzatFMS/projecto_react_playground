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

  /* Screens / Pages */
  var {Icon,} = require('react-native-icons');


  var {
    StyleSheet,
    View,
    Text,
    Component,
    ActivityIndicatorIOS,
    TouchableOpacity,
  } = React;

/* ==============================
  View
  =============================== */
  var ProjectResume = React.createClass({

    getInitialState: function() {
      return {
          isLoading: true,
          project: {},
          targets: [],
          members: [],
        };
    },

    componentDidMount: function() {
      this.fetchProjects();
    },

    fetchProjects: function() {
       fetch('http://opt.organizer2016.ru/projects/view/' + this.props.project.id)
      .then(response => response.json())
      .then(jsonData => {
            this.setState({
               isLoading: false,
               project: jsonData,
            });

            this.fetchTargets();
            this.fetchMembers();
          })
      .catch(error => console.dir(error));
    },
    fetchTargets: function() {
       fetch('http://opt.organizer2016.ru/projects/targets/' + this.props.project.id)
      .then(response => response.json())
      .then(jsonData => {
            this.setState({
               targets: jsonData,
            });
          })
      .catch(error => console.dir(error));
    },
    fetchMembers: function() {
       fetch('http://opt.organizer2016.ru/projects/members/' + this.props.project.id)
      .then(response => response.json())
      .then(jsonData => {
            this.setState({
               members: jsonData,
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
          <View style={[AppStyles.container]}>
            <View style={styles.container}>
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
            <View>
              <Text style={styles.title}>Сводка</Text>
                <TouchableOpacity
                  style={styles.list_row}>
                  <Icon
                   name='fontawesome|flag-checkered'
                   size={20}
                   color='#777'
                   style={styles.icon}
                   />
                  <Text style={styles.list_row_text}>
                    Цели: { this.state.targets.length }
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.list_row}>
                  <Icon
                   name='fontawesome|user'
                   size={20}
                   color='#777'
                   style={styles.icon}
                   />
                  <Text style={styles.list_row_text}>
                    Участники: { this.state.members.length }
                  </Text>
                </TouchableOpacity>
            </View>
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
    title: {
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 10,
      backgroundColor: AppConfig.primaryColor,
      color: '#FFF',
      fontWeight: 'bold',
    },
    list_row: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: AppConfig.subtleGreyBorder,
    },
    list_row_text: {
      color: '#777',
    },
    icon: {
      width: 20,
      height: 20,
      marginRight: 10,
    }
  });

/* ==============================
  Done!
  =============================== */
  module.exports = ProjectResume;
  module.exports.details = {
    title: 'Сводка по проекту'
  };
