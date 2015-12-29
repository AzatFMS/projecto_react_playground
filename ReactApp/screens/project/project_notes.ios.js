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
  var ListSeparator = require('../../components/list_separator.ios');
  var Loader = require('../../components/loader.ios');

  /* Screens / Pages */
  var {Icon,} = require('react-native-icons');

  var moment = require('moment');

  var Util = require('../../util.ios');

  var ListSeparator = require('../../components/list_separator.ios');
  var Loader = require('../../components/loader.ios');
  var NoItems = require('../../components/no_items.ios');
  var ListLoader = require('../../components/list_loader.ios');
  var ListWillRefresh = require('../../components/list_will_refresh.ios');
  var ListRefreshIdle = require('../../components/list_refresh_idle.ios');

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
            jsonData.sort(function(a, b) {
                  return  parseInt(b.u_time) - parseInt(a.u_time);
              });
            this.setState({
               isLoading: false,
               notes: jsonData,
               notesDataSource: this.state.notesDataSource.cloneWithRows(jsonData)
            });
            this.list.hideHeader();
            this.list.hideFooter();
          })
      .catch(error => console.dir(error));
    },
    render: function() {
      if (this.state.isLoading) {
        return this.renderLoadingMessage();
      } else if (!this.state.notes.length) {
        return this.renderNoNotes();
      } else {
        return this.renderResults();
      }
    },
    renderLoadingMessage: function() {
      return (
          <Loader/>
        );
    },
    renderNoNotes: function() {
      return (
          <NoItems text="Нет заметок"/>
        );
    },
    refreshNotes: function() {
      this.fetchNotes();
    },
    renderNote: function(note) {

        return (
          <TouchableOpacity style={AppStyles.list_row}>
            <View style={AppStyles.list_row_main}>
              <Text style={AppStyles.list_row_title}>
                {note.title}
              </Text>
              <Text style={AppStyles.list_row_subtitle}>
                {note.user ? note.user.formatted_name : ''}
              </Text>
            </View>
            <View style={styles.right_block}>
              <Text style={styles.date}>{note.formattedUTime}</Text>
              <Text style={styles.time}>{moment.unix(note.u_time).format("HH:mm")}</Text>
            </View>
          </TouchableOpacity>
        );
      },
    renderResults: function() {
        return (
          <View style={styles.container}>
            <RefreshInfiniteListView
            ref = {(list) => {this.list = list}}
            dataSource={this.state.notesDataSource}
            onRefresh={this.refreshNotes}
            onInfinite={this.refreshNotes}
            renderHeaderRefreshIdle={()=> {return (<ListRefreshIdle/>)}}
            renderHeaderWillRefresh={()=> {return (<ListWillRefresh/>)}}
            renderHeaderRefreshing={()=> {return (<ListLoader/>)}}
            renderFooterWillInifite={()=> {return (<ListWillRefresh/>)}}
            renderFooterInifiteIdle={()=> {return (<ListRefreshIdle reverse={true}/>)}}
            renderFooterInifiting={()=> {return (<ListLoader/>)}}
            renderRow={this.renderNote}
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
  module.exports = ProjectNotes;
  module.exports.details = {
    title: 'Заметки проекта'
  };
