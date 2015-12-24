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

  var moment = require('moment');
  // App Globals
  var AppStyles = require('../../styles.ios');
  var AppConfig = require('../../config.ios');

  var Util = require('../../util.ios');

  /* Screens / Pages */
  var {Icon,} = require('react-native-icons');


  var {
    StyleSheet,
    View,
    Text,
    Component,
    ActivityIndicatorIOS,
    TouchableOpacity,
    ListView,
    ScrollView,
  } = React;

/* ==============================
  View
  =============================== */
  var ProjectTargets = React.createClass({

    getInitialState: function() {
      return {
          isLoading: true,
          targets: [],
          targetsDataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
          }),
        };
    },

    componentDidMount: function() {
      this.fetchTargets();
    },

    fetchTargets: function() {
       fetch(Util.buildUrl('/projects/objects/' + this.props.route.project.id ))
      .then(response => response.json())
      .then(jsonData => {

            jsonData
            .sort(function(a, b) {
                return parseInt(b.object_time) - parseInt(a.object_time);
            });
            this.setState({
               isLoading: false,
               targets: jsonData,
               targetsDataSource: this.state.targetsDataSource.cloneWithRows(jsonData)
            });
          })
      .catch(error => console.dir(error));
    },
    render: function() {
      if (this.state.isLoading) {
        return this.renderLoadingMessage();
      } else if (!this.state.targets.length) {
        return this.renderNoTargets();
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
    renderNoTargets: function() {
      return (
          <View style={[AppStyles.container, AppStyles.containerCentered]}>
            <Text style={AppStyles.baseText}>Нет задач</Text>
          </View>
        );
    },
    renderTarget: function(target) {

        return (
          <View style={styles.list_row}>
            <View style={{flex: 1}}>
              <Text style={styles.list_row_title}>
                {target.name}
              </Text>
              <Text style={styles.list_row_subtitle}>
                {Util.targetsHelper.getStatusName(target.object_status)}
              </Text>
            </View>
            <View style={styles.right_block}>
              <Text style={styles.target_date}>{target.formattedObjectTime}</Text>
            </View>
          </View>
        );
      },
    renderResults: function() {
        return (
          <ScrollView style={styles.container}>
          <ListView
          dataSource={this.state.targetsDataSource}
          renderRow={this.renderTarget}
          />
          </ScrollView>
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
      color:  AppConfig.textMain,
    },
    list_row_subtitle: {
      color:  AppConfig.textMain,
    },
    left_block: {
      marginRight: 10,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    status_icon: {
      width: 14,
      height: 14,
      borderRadius: 7,
      marginBottom: 5,
    },
    private_icon: {
      width: 14,
      height: 14,
      marginTop: 2,
      marginBottom: 2,
    },
    priority_icon: {
      color: '#dd1f00',
      fontSize: 10,
      marginTop: 2,
      marginBottom: 2,
      fontWeight: 'bold',
    },
    repeat_icon: {
      width: 14,
      height: 14,
      marginTop: 2,
      marginBottom: 2,
    },
    right_block: {
      width: 60,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    target_date: {
      color:  AppConfig.textMain,
      fontSize: 10,
    },
  });

/* ==============================
  Done!
  =============================== */
  module.exports = ProjectTargets;
  module.exports.details = {
    title: 'Цели проекта'
  };
