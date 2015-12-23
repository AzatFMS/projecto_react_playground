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
  var ProjectTasks = React.createClass({

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
            this.setState({
               isLoading: false,
               tasks: jsonData,
               tasksDataSource: this.state.tasksDataSource.cloneWithRows(jsonData)
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
    renderTask: function(task) {

        var status_icon = <View style={[styles.status_icon, {backgroundColor: Util.taskHelper.getColorByStatus(task.task_status_formatted)}]}></View>;

        if (task.private) {
          var private_icon =
          <Icon
             name={'fontawesome|user-secret'}
             size={14}
             color={AppConfig.textMain}
             style={styles.private_icon}
             />;
        }

        if (task.repeat_serial_id) {
          var repeat_icon =
          <Icon
             name={'fontawesome|clone'}
             size={14}
             color={AppConfig.textMain}
             style={styles.repeat_icon}
             />;
        }

        if (task.priority_id) {
          var priority_icon =
          <Text style={styles.priority_icon}>{Util.taskHelper.getSignByPriority(task.priority_id)}</Text>;
        }

        var time_end = task.time_end ?
        <View style={styles.right_block}>
          <Text style={styles.task_date}>{task.formattedTimeEnd}</Text>
          <Text style={styles.task_time}>{moment.unix(task.time_end).format("HH:mm")}</Text>
        </View>
        :
        <View style={styles.right_block}>
          <Text style={styles.without_time_end}>Без срока</Text>
        </View>
        ;

        return (
          <TouchableOpacity style={styles.list_row}>
            <View style={styles.left_block}>
              {status_icon}
              {priority_icon}
              {private_icon}
              {repeat_icon}
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.list_row_title}>
                {task.name}
              </Text>
              <Text style={styles.list_row_subtitle}>
                {task.liable.formatted_name}
              </Text>
            </View>
            {time_end}
          </TouchableOpacity>
        );
      },
    renderResults: function() {
        return (
          <ScrollView style={styles.container}>
            <ListView
            dataSource={this.state.tasksDataSource}
            renderRow={this.renderTask}
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
      marginBottom: 5,
    },
    priority_icon: {
      backgroundColor: '#dd1f00',
      color: '#FFF',
      fontSize: 10,
      padding: 2,
      borderRadius: 4,
    },
    repeat_icon: {
      width: 14,
      height: 14,
      marginBottom: 5,
    },
    right_block: {
      width: 60,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    task_date: {
      color:  AppConfig.textMain,
      fontSize: 10,
    },
    task_time: {
      color:  AppConfig.textMain,
      fontSize: 16,
    },
    without_time_end: {
      color:  AppConfig.textMain,
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
