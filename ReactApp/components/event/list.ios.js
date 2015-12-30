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

  var {Icon,} = require('react-native-icons');


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
  var ListEvents = React.createClass({

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
       fetch(this.props.source_url)
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
        );
      }

  });

/* ==============================
  Styles
  =============================== */
  var styles = StyleSheet.create({
    right_block: {
      width: 70,
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
  module.exports = ListEvents;
