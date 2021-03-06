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

  var {Icon,} = require('react-native-icons');

  var moment = require('moment');

  var Util = require('../../util.ios');
  var Loader = require('../loader.ios');
  var ListSeparator = require('../list/separator.ios');
  var ListLoader = require('../list/loader.ios');
  var NoItems = require('../list/no_items.ios');
  var ListLoader = require('../list/loader.ios');
  var ListWillRefresh = require('../list/will_refresh.ios');
  var ListRefreshIdle = require('../list/refresh_idle.ios');

  var RefreshInfiniteListView = require('react-native-refresh-infinite-listview');

  var {
    StyleSheet,
    View,
    Text,
    Component,
    ActivityIndicatorIOS,
    TouchableOpacity,
    ListView,
    AlertIOS,
    Image,
  } = React;

/* ==============================
  View
  =============================== */
  var ListFiles = React.createClass({

        getInitialState: function() {
          return {
              isLoading: true,
              files: [],
              filesDataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
              }),
            };
        },

        componentDidMount: function() {
          this.fetchFiles();
        },

        fetchFiles: function() {
           fetch(this.props.source_url)
          .then(response => response.json())
          .then(jsonData => {
                jsonData.sort(function(a, b) {
                      return  parseInt(b.time) - parseInt(a.time);
                  });
                this.setState({
                   isLoading: false,
                   files: jsonData,
                   filesDataSource: this.state.filesDataSource.cloneWithRows(jsonData)
                });
                this.list.hideHeader();
                this.list.hideFooter();
              })
          .catch(error => console.dir(error));
        },
        render: function() {
          if (this.state.isLoading) {
            return this.renderLoadingMessage();
          } else if (!this.state.files.length) {
            return this.renderNoFiles();
          } else {
            return this.renderResults();
          }
        },
        renderLoadingMessage: function() {
          return (
              <Loader/>
            );
        },
        renderNoFiles: function() {
          return (
              <NoItems text="Нет файлов"/>
            );
        },
        refreshFiles: function() {
          this.fetchFiles();
        },
        renderFile: function(file) {

            return (
              <TouchableOpacity style={AppStyles.list_row}
                onPress={() => {

                }}>
                <View style={styles.left_block}>
                  <View style={styles.ext}>
                    <Text style={styles.ext_text}>{file.ext}</Text>
                  </View>
                </View>
                <View style={AppStyles.list_row_main}>
                  <Text style={AppStyles.list_row_title}>
                    {file.file_name}
                  </Text>
                  <Text style={AppStyles.list_row_subtitle}>
                    {file.size}Мб {file.user ? file.user.formatted_name : ''}
                  </Text>
                </View>
                <View style={styles.right_block}>
                  <Text style={styles.date}>{file.formattedTime}</Text>
                  <Text style={styles.time}>{moment.unix(file.time).format("HH:mm")}</Text>
                </View>
              </TouchableOpacity>
            );
          },
        renderResults: function() {
            return (
                <RefreshInfiniteListView
                ref = {(list) => {this.list = list}}
                dataSource={this.state.filesDataSource}
                onRefresh={this.refreshFiles}
                onInfinite={this.refreshFiles}
                renderHeaderRefreshIdle={()=> {return (<ListRefreshIdle/>)}}
                renderHeaderWillRefresh={()=> {return (<ListWillRefresh/>)}}
                renderHeaderRefreshing={()=> {return (<ListLoader/>)}}
                renderFooterWillInifite={()=> {return (<ListWillRefresh/>)}}
                renderFooterInifiteIdle={()=> {return (<ListRefreshIdle reverse={true}/>)}}
                renderFooterInifiting={()=> {return (<ListLoader/>)}}
                renderRow={this.renderFile}
                renderSeparator={()=> {return (<ListSeparator/>)}}
                />
            );
          }

  });

/* ==============================
  Styles
  =============================== */
  var styles = StyleSheet.create({
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
  module.exports = ListFiles;
