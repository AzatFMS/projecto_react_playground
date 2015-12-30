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
  var AppStyles = require('../styles.ios');
  var AppConfig = require('../config.ios');

  var Project = require('./project/project.ios');
  var Util = require('../util.ios');
  var Store = require('../store');
  var ListSeparator = require('../components/list/separator.ios');
  var Loader = require('../components/loader.ios');
  var ListLoader = require('../components/list/loader.ios');
  var ListWillRefresh = require('../components/list/will_refresh.ios');
  var ListRefreshIdle = require('../components/list/refresh_idle.ios');
  var TimerMixin = require('react-timer-mixin');

  var RefreshInfiniteListView = require('react-native-refresh-infinite-listview');

  var {Icon,} = require('react-native-icons');

  var {
    StyleSheet,
    View,
    Text,
    Component,
    ListView,
    TouchableOpacity,
    ActivityIndicatorIOS,
  } = React;

/* ==============================
  View
  =============================== */
  var Projects = React.createClass({
    mixins: [TimerMixin],

    getInitialState: function() {
      return {
          isLoading: true,
          projects: [],
          projectsDataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
          }),
        };
    },

    showProject: function(project) {
      this.props.navigator.push({
        title: project.name,
        component: Project,
        project: project,
        index: 2,
      });
    },
    showNestedProjects: function(project) {
      this.props.navigator.push({
        title: 'Проекты',
        component: Projects,
        parentProject: project,
        index: 2,
      });
    },

    renderProject: function(project) {
        if (this.isNestedProjects(project)) {
          var right_btn = <TouchableOpacity
            onPress={() => this.showNestedProjects(project)}
            style={styles.right_btn}>
            <Icon
               name={'ion|ios-arrow-forward'}
               size={30}
               color={AppConfig.textIcon}
               style={styles.right_btn_arrow}
               />
          </TouchableOpacity>;
        }
        return (
            <View style={AppStyles.list_row}>
                <TouchableOpacity onPress={() => this.showProject(project)}
                  style={[styles.list_row_main,]}>
                  <View style={styles.left_block}>
                    <Icon
                       name={Util.projectsHelper.getIconByType(project.type)}
                       size={20}
                       color={AppConfig.textIcon}
                       style={styles.type_icon}
                       />
                  </View>
                  <View style={{flex: 1}}>
                    <Text style={AppStyles.list_row_title}>
                      {project.name}
                    </Text>
                    <Text style={AppStyles.list_row_subtitle}>
                      {Util.projectsHelper.getStatusName(project.project_status)}
                    </Text>
                  </View>
                </TouchableOpacity>
                { right_btn }
            </View>
        );
  },

  isNestedProjects: function(project) {
    for (var i = 0, ii = this.state.projects.length; i < ii; i++) {
      if (this.state.projects[i].parent == project.id) {
        return true;
      }
    }
    return false;
  },

  componentDidMount: function() {
    this.fetchResults();
  },
  fetchResults: function() {
    var parent = this.props.route.parentProject ? this.props.route.parentProject.id : 0;

    if (Store.getItem('projects')) {
      this.setState({
         isLoading: false,
         projects: Store.getItem('projects'),
         projectsDataSource: this.state.projectsDataSource.cloneWithRows(Store.getItem('projects').filter((x) => x.parent == parent))
      });
    } else {
       fetch(Util.buildUrl('/projects/list/'))
      .then(response => response.json())
      .then(jsonData => {
          Store.setItem('projects', jsonData);
          this.setState({
             isLoading: false,
             projects: jsonData,
             projectsDataSource: this.state.projectsDataSource.cloneWithRows(jsonData.filter((x) => x.parent == parent))
          });
          this.list.hideHeader();
          this.list.hideFooter();
        })
      .catch(error => console.dir(error));
    }
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
        <Loader/>
      );
  },
  refreshProjects: function() {
    Store.deleteItem('projects');
    this.fetchResults();
  },

  renderResults: function() {
      return (
            <RefreshInfiniteListView
              ref = {(list) => {this.list = list}}
              dataSource={this.state.projectsDataSource}
              onRefresh={this.refreshProjects}
              onInfinite={this.refreshProjects}
              renderHeaderRefreshIdle={()=> {return (<ListRefreshIdle/>)}}
              renderHeaderWillRefresh={()=> {return (<ListWillRefresh/>)}}
              renderHeaderRefreshing={()=> {return (<ListLoader/>)}}
              renderFooterWillInifite={()=> {return (<ListWillRefresh/>)}}
              renderFooterInifiteIdle={()=> {return (<ListRefreshIdle reverse={true}/>)}}
              renderFooterInifiting={()=> {return (<ListLoader/>)}}
              renderRow={this.renderProject}
              renderSeparator={()=> {return (<ListSeparator/>)}}
              />
      );
    }

  });

/* ==============================
  Styles
  =============================== */
  var styles = StyleSheet.create({
    list_row_main: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    left_block: {
      marginRight: 10,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    type_icon: {
      width: 20,
      height: 20,
    },
    right_btn: {
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    right_btn_arrow: {
      width: 30,
      height: 30,
    },
  });

/* ==============================
  Done!
  =============================== */
  module.exports = Projects;
