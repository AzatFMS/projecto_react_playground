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
  var TimerMixin = require('react-timer-mixin');

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
  var ProjectTasks = React.createClass({

    mixins: [TimerMixin],

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
       fetch(Util.buildUrl('/projects/tasks/' + this.props.project.id + '?with_members=0'))
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
          time_end = task.time_end ?
          <View style={styles.right_block}>
            <Text style={styles.task_date}>{task.formattedTimeEnd}</Text>
            <Text style={styles.task_time}>{moment.unix(task.time_end).format("HH:mm")}</Text>
          </View>
          :
          <View style={styles.right_block}>
            <Text style={styles.without_time_end}>Без срока</Text>
          </View>;

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
            <Text style={styles.priority_icon}>{Util.taskHelper.getSignByPriority(task.priority_id)}</Text>;
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
          <View style={styles.container}>
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
  module.exports = ProjectTasks;
  module.exports.details = {
    title: 'Задачи проекта'
  };
