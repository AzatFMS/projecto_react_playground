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
  var Loader = require('../loader.ios');
  var ListSeparator = require('../list/separator.ios');
  var ListLoader = require('../list/loader.ios');
  var NoItems = require('../list/no_items.ios');
  var ListLoader = require('../list/loader.ios');
  var ListWillRefresh = require('../list/will_refresh.ios');
  var ListRefreshIdle = require('../list/refresh_idle.ios');

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
  var ListTasks = React.createClass({

    getInitialState: function() {
      return {
          isLoading: true,
          tasks: [],
          tasksDataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
          }),
        };
    },

    componentDidMount: function() {
      this.fetchTasks();
    },

    fetchTasks: function() {
       fetch(this.props.source_url)
      .then(response => response.json())
      .then(jsonData => {

            jsonData
            .sort(function(a, b) {
                return parseInt(b.time_end) - parseInt(a.time_end);
            })
            .sort(function(a, b) {
                return parseInt(b.priority_id) - parseInt(a.priority_id);
            });
            this.setState({
               isLoading: false,
               tasks: jsonData,
               tasksDataSource: this.state.tasksDataSource.cloneWithRows(jsonData)
            });
            this.list.hideHeader();
            this.list.hideFooter();
          })
      .catch(error => console.dir(error));
    },
    render: function() {
      if (this.state.isLoading) {
        return this.renderLoadingMessage();
      } else if (!this.state.tasks.length) {
        return this.renderNoTasks();
      } else {
        return this.renderResults();
      }
    },
    renderLoadingMessage: function() {
      return (
          <Loader/>
        );
    },
    renderNoTasks: function() {
      return (
          <NoItems text="Нет задач"/>
        );
    },
    refreshTasks: function() {
      this.fetchTasks();
    },
    renderTask: function(task) {

        var status_icon,
        private_icon,
        repeat_icon,
        priority_icon,
        liable,
        time_end;
        if (!task.not_available)
        {
          if (task.overdueDays) {
            time_end =
            <View style={styles.right_block}>
              <Text style={[styles.task_time, AppStyles.textWarning]}>{task.overdueDays}</Text>
              <Text style={[styles.task_date, AppStyles.textWarning]}>дней назад</Text>
            </View>;
          } else if (task.time_end) {
            time_end =
            <View style={styles.right_block}>
              <Text style={styles.task_date}>{task.formattedTimeEnd}</Text>
              <Text style={styles.task_time}>{moment.unix(task.time_end).format("HH:mm")}</Text>
            </View>;
          } else {
            time_end =
            <View style={styles.right_block}>
              <Text style={styles.without_time_end}>Без срока</Text>
            </View>;
          }

          status_icon =
          <View style={[styles.status_icon, {backgroundColor: Util.taskHelper.getColorByStatus(task.task_status_formatted)}]}></View>;

          if (task.liable) {
            liable = <Text style={AppStyles.list_row_subtitle}>
              {task.liable.formatted_name}
            </Text>
          }
          if (task.private) {
             private_icon =
            <Icon
               name={'fontawesome|user-secret'}
               size={14}
               color={AppConfig.textIcon}
               style={styles.private_icon}
               />;
          }

          if (task.repeat_serial_id) {
            repeat_icon =
            <Icon
               name={'fontawesome|clone'}
               size={14}
               color={AppConfig.textIcon}
               style={styles.repeat_icon}
               />;
          }

          if (task.priority_id) {
            priority_icon =
            <View style={styles.priority_icon}>
              <Text style={styles.priority_icon_text}>{Util.taskHelper.getSignByPriority(task.priority_id)}</Text>
            </View>;
          }
        }

        return (
          <TouchableOpacity style={AppStyles.list_row}>
            <View style={styles.left_block}>
              {status_icon}
              {priority_icon}
              {private_icon}
              {repeat_icon}
            </View>
            <View style={AppStyles.list_row_main}>
              <Text style={AppStyles.list_row_title}>
                {task.name}
              </Text>
              {liable}
            </View>
            {time_end}
          </TouchableOpacity>
        );
      },
    renderResults: function() {
        return (
            <RefreshInfiniteListView
            ref = {(list) => {this.list = list}}
            dataSource={this.state.tasksDataSource}
            onRefresh={this.refreshTasks}
            onInfinite={this.refreshTasks}
            renderHeaderRefreshIdle={()=> {return (<ListRefreshIdle/>)}}
            renderHeaderWillRefresh={()=> {return (<ListWillRefresh/>)}}
            renderHeaderRefreshing={()=> {return (<ListLoader/>)}}
            renderFooterWillInifite={()=> {return (<ListWillRefresh/>)}}
            renderFooterInifiteIdle={()=> {return (<ListRefreshIdle reverse={true}/>)}}
            renderFooterInifiting={()=> {return (<ListLoader/>)}}
            renderRow={this.renderTask}
            renderSeparator={()=> {return (<ListSeparator/>)}}
            />
        );
      }

  });

/* ==============================
  Styles
  =============================== */
  var styles = StyleSheet.create({
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
      backgroundColor: AppConfig.textWarning,
      marginTop: 2,
      marginBottom: 2,
      paddingTop: 1,
      paddingBottom: 1,
      paddingLeft: 2,
      paddingRight: 2,
      borderRadius: 5,
    },
    priority_icon_text: {
      fontSize: 10,
      color: '#fff',
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
    task_date: {
      color:  AppConfig.textSecondary,
      fontSize: 10,
    },
    task_time: {
      color:  AppConfig.textSecondary,
      fontSize: 16,
    },
    without_time_end: {
      color:  AppConfig.textSecondary,
      fontSize: 10,
    },
  });

/* ==============================
  Done!
  =============================== */
  module.exports = ListTasks;
