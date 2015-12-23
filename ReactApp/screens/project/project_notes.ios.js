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

  var Util = require('../../util.ios');


  var {
    StyleSheet,
    View,
    Text,
    Component,
    ActivityIndicatorIOS,
    TouchableOpacity,
    ListView,
  } = React;

/* ==============================
  View
  =============================== */
  var ProjectNotes = React.createClass({

    getInitialState: function() {
      return {
          isLoading: true,
          notes: [],
          notesDataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
          }),
        };
    },

    componentDidMount: function() {
      this.fetchNotes();
    },

    fetchNotes: function() {
       fetch(Util.buildUrl('/projects/notes/' + this.props.project.id))
      .then(response => response.json())
      .then(jsonData => {
            this.setState({
               isLoading: false,
               notes: jsonData,
               notesDataSource: this.state.notesDataSource.cloneWithRows(jsonData)
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
    renderResults: function() {
        return (
          <View style={[AppStyles.container, AppStyles.containerCentered]}>
            <Text style={[AppStyles.baseText, AppStyles.p]}>Заметки</Text>
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
  module.exports = ProjectNotes;
  module.exports.details = {
    title: 'Заметки проекта'
  };
