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
  } = React;

/* ==============================
  View
  =============================== */
  var ProjectTasks = React.createClass({

    render: function() {
        return (
          <View style={styles.container}>
            <ListTasks source_url={Util.buildUrl('/projects/tasks/' + this.props.project.id + '?with_members=0')}/>
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
  module.exports = ProjectTasks;
  module.exports.details = {
    title: 'Задачи проекта'
  };
