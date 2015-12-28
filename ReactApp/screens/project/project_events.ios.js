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

  var moment = require('moment');

  /* Screens / Pages */
  var {Icon,} = require('react-native-icons');


    var Util = require('../../util.ios');
    var ListSeparator = require('../../components/list_separator.ios');
    var Loader = require('../../components/loader.ios');
    var NoItems = require('../../components/no_items.ios');
    var ListLoader = require('../../components/list_loader.ios');
    var ListWillRefresh = require('../../components/list_will_refresh.ios');
    var ListRefreshIdle = require('../../components/list_refresh_idle.ios');
    var TimerMixin = require('react-timer-mixin');

    var RefreshInfiniteListView = require('react-native-refresh-infinite-listview');


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
  var ProjectEvents = React.createClass({

    getInitialState: function() {
      return {
          isLoading: true,
          events: [],
          eventsDataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
          }),
        };
    },

    componentDidMount: function() {
      this.fetchEvents();
    },

    fetchEvents: function() {
       fetch(Util.buildUrl('/projects/events/' + this.props.project.id))
      .then(response => response.json())
      .then(jsonData => {
            jsonData.sort(function(a, b) {
                  return  parseInt(a.time_start) - parseInt(b.time_start);
              });
            this.setState({
               isLoading: false,
               events: jsonData,
               eventsDataSource: this.state.eventsDataSource.cloneWithRows(jsonData)
            });
            this.list.hideHeader();
            this.list.hideFooter();
          })
      .catch(error => console.dir(error));
    },
    render: function() {
      if (this.state.isLoading) {
        return this.renderLoadingMessage();
      } else if (!this.state.events.length) {
        return this.renderNoEvents();
      } else {
        return this.renderResults();
      }
    },
    renderLoadingMessage: function() {
      return (
          <Loader/>
        );
    },
    renderNoEvents: function() {
      return (
          <NoItems text="Нет событий"/>
        );
    },
    refreshEvents: function() {
      this.fetchEvents();
    },
    renderEvent: function(event) {

      var period, status_icon;

      status_icon =
      <View style={[styles.status_icon, {backgroundColor: Util.eventHelper.getColorByStatus(event.event_status)}]}></View>;

      if (event.formattedTimeStart == event.formattedTimeEnd) {
        period = <View style={styles.right_block}>
          <Text style={styles.date}>{event.formattedTimeEnd}</Text>
          <Text style={styles.time}>{moment.unix(event.time_start).format("HH:mm")} - {moment.unix(event.time_end).format("HH:mm")}</Text>
        </View>;
      } else {
        period = <View style={styles.right_block}>
          <Text style={styles.date}>{event.formattedTimeStart}</Text>
          <Text style={styles.time}>{moment.unix(event.time_start).format("HH:mm")}</Text>
          <Text style={styles.date}>-</Text>
          <Text style={styles.date}>{event.formattedTimeEnd}</Text>
          <Text style={styles.time}>{moment.unix(event.time_end).format("HH:mm")}</Text>
        </View>;
      }

        return (
          <TouchableOpacity style={AppStyles.list_row}>
            <View style={styles.left_block}>
              {status_icon}
            </View>
            <View style={AppStyles.list_row_main}>
              <Text style={AppStyles.list_row_title}>
                {event.name}
              </Text>
              <Text style={AppStyles.list_row_subtitle}>
                {event.user ? event.user.formatted_name : ''}{ event.users_data.length ? ' + ' + event.users_data.length : ''}
              </Text>
            </View>
            {period}
          </TouchableOpacity>
        );
      },
    renderResults: function() {
        return (
          <View style={styles.container}>
            <RefreshInfiniteListView
            ref = {(list) => {this.list = list}}
            dataSource={this.state.eventsDataSource}
            onRefresh={this.refreshEvents}
            onInfinite={this.refreshEvents}
            renderHeaderRefreshIdle={()=> {return (<ListRefreshIdle/>)}}
            renderHeaderWillRefresh={()=> {return (<ListWillRefresh/>)}}
            renderHeaderRefreshing={()=> {return (<ListLoader/>)}}
            renderFooterWillInifite={()=> {return (<ListWillRefresh/>)}}
            renderFooterInifiteIdle={()=> {return (<ListRefreshIdle reverse={true}/>)}}
            renderFooterInifiting={()=> {return (<ListLoader/>)}}
            renderRow={this.renderEvent}
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
    right_block: {
      width: 80,
      alignItems: 'center',
      justifyContent: 'center',
    },
    date: {
      color:  AppConfig.textSecondary,
      fontSize: 12,
    },
    time: {
      color:  AppConfig.textSecondary,
      fontSize: 10,
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
  });

/* ==============================
  Done!
  =============================== */
  module.exports = ProjectEvents;
  module.exports.details = {
    title: 'События проекта'
  };
