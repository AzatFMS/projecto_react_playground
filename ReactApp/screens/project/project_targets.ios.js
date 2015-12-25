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
  var ListSeparator = require('../../components/list_separator.ios');
  var Loader = require('../../components/loader.ios');
  var NoItems = require('../../components/no_items.ios');
  var ListLoader = require('../../components/list_loader.ios');
  var ListWillRefresh = require('../../components/list_will_refresh.ios');
  var ListRefreshIdle = require('../../components/list_refresh_idle.ios');

  var RefreshInfiniteListView = require('react-native-refresh-infinite-listview');

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
            this.list.hideHeader();
            this.list.hideFooter();
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
          <Loader/>
        );
    },
    renderNoTargets: function() {
      return (
          <NoItems text="Нет целей"/>
        );
    },
    refreshTargets: function() {
      this.fetchTargets();
    },
    renderTarget: function(target) {

        return (
          <View style={AppStyles.list_row}>
            <View style={AppStyles.list_row_main}>
              <Text style={AppStyles.list_row_title}>
                {target.name}
              </Text>
              <Text style={AppStyles.list_row_subtitle}>
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
          <View style={styles.container}>
            <RefreshInfiniteListView
            ref = {(list) => {this.list = list}}
            dataSource={this.state.targetsDataSource}
            onRefresh={this.refreshTargets}
            onInfinite={this.refreshTargets}
            renderHeaderRefreshIdle={()=> {return (<ListRefreshIdle/>)}}
            renderHeaderWillRefresh={()=> {return (<ListWillRefresh/>)}}
            renderHeaderRefreshing={()=> {return (<ListLoader/>)}}
            renderFooterWillInifite={()=> {return (<ListWillRefresh/>)}}
            renderFooterInifiteIdle={()=> {return (<ListRefreshIdle reverse={true}/>)}}
            renderFooterInifiting={()=> {return (<ListLoader/>)}}
            renderRow={this.renderTarget}
            renderSeparator={()=> {return (<ListSeparator/>)}}
            />
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
      color:  AppConfig.textSecondary,
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
