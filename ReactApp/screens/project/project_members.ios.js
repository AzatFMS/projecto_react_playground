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
    renderNoMembers: function() {
      return (
          <View style={[AppStyles.container, AppStyles.containerCentered]}>
            <Text style={AppStyles.baseText}>Нет задач</Text>
          </View>
        );
    },
    renderMember: function(member) {

      var avatar, workpost;
      if (member.profileData && member.profileData.avatar) {
        avatar = <Image
          style={styles.thumbnail}
          source={{uri: 'http://opt.organizer2016.ru/' + member.profileData.avatar}}
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
        <Text style={styles.list_row_subtitle}>
          {member.workPost.post_name}
        </Text>;
      }


        return (
          <TouchableOpacity style={styles.list_row}>
            {avatar}
            <View style={{flex: 1}}>
              <Text style={styles.list_row_title}>
                {member.formatted_name} {member.id == this.state.project.uid ? '(Автор)' : ''}
              </Text>
              {workpost}
            </View>
          </TouchableOpacity>
        );
      },
    renderResults: function() {
        return (
            <ListView
            dataSource={this.state.membersDataSource}
            renderRow={this.renderMember}
            />
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
