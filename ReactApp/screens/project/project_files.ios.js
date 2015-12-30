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

  var ListFiles = require('../../components/file/list.ios');

  var {
    StyleSheet,
    View,
    Text,
    Component,
  } = React;

/* ==============================
  View
  =============================== */
  var ProjectFiles = React.createClass({
    render: function() {
        return (
          <View style={styles.container}>
            <ListFiles source_url={Util.buildUrl('/projects/files/' + this.props.project.id)}/>
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
    title_block: {
      flex: 1,
      flexDirection: 'row',
    },
    left_block: {
      marginRight: 10,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    ext: {
      backgroundColor: '#919191',
      borderRadius: 3,
      padding: 3,
      marginRight: 5,
    },
    ext_text: {
      color: '#fff',
      fontSize: 14,
    },
    right_block: {
      width: 60,
      alignItems: 'center',
      justifyContent: 'center',
    },
    date: {
      color:  AppConfig.textSecondary,
      fontSize: 10,
    },
    time: {
      color:  AppConfig.textSecondary,
      fontSize: 16,
    },
  });

/* ==============================
  Done!
  =============================== */
  module.exports = ProjectFiles;
  module.exports.details = {
    title: 'Файлы проекта'
  };
