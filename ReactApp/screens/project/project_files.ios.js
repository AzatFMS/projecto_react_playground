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
    AlertIOS,
    Image,
  } = React;

  var Lightbox = require('react-native-lightbox');

/* ==============================
  View
  =============================== */
  var ProjectFiles = React.createClass({


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
           fetch(Util.buildUrl('/projects/files/' + this.props.project.id))
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
                <View style={AppStyles.list_row_main}>
                  <View style={styles.title_block}>
                    <Text style={AppStyles.list_row_title}>
                      {file.file_name}
                    </Text>
                    <Text style={styles.ext}>
                      {file.ext}
                    </Text>
                  </View>
                  <Text style={AppStyles.list_row_subtitle}>
                    {file.user ? file.user.formatted_name : ''}
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
              <View style={styles.container}>
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
    title_block: {
      flex: 1,
      flexDirection: 'row',
    },
    ext: {
      backgroundColor: '#919191',
      borderRadius: 3,
      padding: 3,
      marginLeft: 5,
      fontSize: 12,
      color: '#fff',
    },
    right_block: {
      width: 80,
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
  module.exports = ProjectFiles;
  module.exports.details = {
    title: 'Файлы проекта'
  };
