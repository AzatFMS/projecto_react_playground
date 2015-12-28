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
    Image,
  } = React;

/* ==============================
  View
  =============================== */
  var ProjectMembers = React.createClass({

    getInitialState: function() {
      return {
          isLoading: true,
          members: [],
          membersDataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
          }),
          project: this.props.route.project,
        };
    },

    componentDidMount: function() {
      this.fetchMembers();
    },

    fetchMembers: function() {
       fetch(Util.buildUrl('/projects/members/' + this.state.project.id ))
      .then(response => response.json())
      .then(jsonData => {
            var _self = this;
            jsonData
            .sort(function(a, b) {
              if (a.id == _self.state.project.uid) {
                return -1;
              }
              if (b.id == _self.state.project.uid) {
                return 1;
              }
              if(a.formatted_name < b.formatted_name) return -1;
              if(a.formatted_name > b.formatted_name) return 1;
              return 0;
            });

            this.setState({
               isLoading: false,
               members: jsonData,
               membersDataSource: this.state.membersDataSource.cloneWithRows(jsonData)
            });
            this.list.hideHeader();
            this.list.hideFooter();
          })
      .catch(error => console.dir(error));
    },
    render: function() {
      if (this.state.isLoading) {
        return this.renderLoadingMessage();
      } else if (!this.state.members.length) {
        return this.renderNoMembers();
      } else {
        return this.renderResults();
      }
    },
    refreshMembers: function() {
      this.fetchMembers();
    },
    renderLoadingMessage: function() {
      return (
          <Loader/>
        );
    },
    renderNoMembers: function() {
      return (
          <NoItems text="Нет участников"/>
        );
    },
    renderMember: function(member) {

      var avatar, workpost;
      if (member.profileData && member.profileData.avatar) {
        avatar = <Image
          style={styles.thumbnail}
          source={{uri: api_url + '/' + member.profileData.avatar}}
          />;
      } else {
        avatar = <Icon
         name={'fontawesome|user'}
         size={30}
         color={AppConfig.textMain}
         style={styles.thumbnail}
         />;
      }

      if (member.workPost && member.workPost.post_name) {
        workpost =
        <Text style={AppStyles.list_row_subtitle}>
          {member.workPost.post_name}
        </Text>;
      }


        return (
          <TouchableOpacity style={AppStyles.list_row}>
            {avatar}
            <View style={AppStyles.list_row_main}>
              <Text style={AppStyles.list_row_title}>
                {member.formatted_name} {member.id == this.state.project.uid ? '(Автор)' : ''}
              </Text>
              {workpost}
            </View>
          </TouchableOpacity>
        );
      },
    renderResults: function() {
        return (
          <View style={styles.container}>
            <RefreshInfiniteListView
            ref = {(list) => {this.list = list}}
            dataSource={this.state.membersDataSource}
            onRefresh={this.refreshMembers}
            onInfinite={this.refreshMembers}
            renderHeaderRefreshIdle={()=> {return (<ListRefreshIdle/>)}}
            renderHeaderWillRefresh={()=> {return (<ListWillRefresh/>)}}
            renderHeaderRefreshing={()=> {return (<ListLoader/>)}}
            renderFooterWillInifite={()=> {return (<ListWillRefresh/>)}}
            renderFooterInifiteIdle={()=> {return (<ListRefreshIdle reverse={true}/>)}}
            renderFooterInifiting={()=> {return (<ListLoader/>)}}
            renderRow={this.renderMember}
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
    thumbnail: {
      width: 30,
      height: 30,
      marginRight: 10,
      borderRadius: 15,
    },
  });

/* ==============================
  Done!
  =============================== */
  module.exports = ProjectMembers;
  module.exports.details = {
    title: 'Участники проекта'
  };
