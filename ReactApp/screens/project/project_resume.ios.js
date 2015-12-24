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

  var Collapsible = require('react-native-collapsible');
  var ProjectTargets = require('./project_targets.ios');
  var ProjectMembers = require('./project_members.ios');

  var Util = require('../../util.ios');


  var {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Component,
    ActivityIndicatorIOS,
    TouchableOpacity,
    Modal,
    ListView,
    Image,
  } = React;

/* ==============================
  View
  =============================== */
  var ProjectResume = React.createClass({

    getInitialState: function() {
      return {
          isLoading: true,
          project: {},
          targets: [],
          members: [],
          targetsDataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
          }),
          showTargets: false,
          membersDataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
          }),
          showMemebrs: false,
        };
    },

    componentDidMount: function() {
      this.fetchProject();
    },

    fetchProject: function() {
       fetch(Util.buildUrl('/projects/view/' + this.props.project.id))
      .then(response => response.json())
      .then(jsonData => {
            this.setState({
               isLoading: false,
               project: jsonData,
            });

            this.fetchTargets();
            this.fetchMembers();
          })
      .catch(error => console.dir(error));
    },
    fetchTargets: function() {
       fetch(Util.buildUrl('/projects/objects/' + this.props.project.id))
      .then(response => response.json())
      .then(jsonData => {
            this.setState({
               targets: jsonData,
               targetsDataSource: this.state.targetsDataSource.cloneWithRows(jsonData),
            });
          })
      .catch(error => console.dir(error));
    },
    fetchMembers: function() {
       fetch(Util.buildUrl('/projects/members/' + this.props.project.id))
      .then(response => response.json())
      .then(jsonData => {
            this.setState({
               members: jsonData,
               membersDataSource: this.state.membersDataSource.cloneWithRows(jsonData),
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
    getStatusName: function(status) {
        var statuses = {
          0: 'В процессе',
          1: 'Завершён',
          2: 'Запланирован',
          3: 'На согласовании',
        };
        return statuses[status] ? statuses[status] : '';
    },

    renderResults: function() {

        var memebers_right_btn, targets_right_btn;
        if (this.state.targets.length) {
          targets_right_btn = <View
            style={styles.right_btn}>
            <Text style={styles.right_btn_arrow}>></Text>
          </View>;
        }
        if (this.state.members.length) {
          memebers_right_btn = <View
            style={styles.right_btn}>
            <Text style={styles.right_btn_arrow}>></Text>
          </View>;
        }

        return (
          <ScrollView style={[AppStyles.container, {marginBottom: 50}]}>
              <View style={styles.container}>
                <Text style={[styles.header]}>
                  {this.state.project.name}
                </Text>
                <Text style={[styles.text]}>
                  {this.getStatusName(this.state.project.project_status)}
                </Text>
                <Text style={[styles.text]}>
                  Автор: {this.state.project.user.formatted_name}
                </Text>
                <Text style={[styles.text]}>
                  {this.state.project.description}
                </Text>
              </View>
            <View>
              <Text style={styles.title}>Сводка</Text>
                <TouchableOpacity
                  style={[styles.list_row]}
                  onPress={() => {
                    if (this.state.targets.length) {
                      this.props.navigator.push({
                        title: "Цели проекта",
                        component: ProjectTargets,
                        project: this.state.project,
                        index: 1
                      });
                    }
                  }}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <Icon
                       name='fontawesome|flag-checkered'
                       size={20}
                       color='#777'
                       style={styles.icon}
                       />
                      <Text style={styles.list_row_text}>
                        Цели: { this.state.targets.length }
                      </Text>
                  </View>
                  { targets_right_btn }
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.list_row]}
                  onPress={() => {
                    if (this.state.members.length) {
                      this.props.navigator.push({
                        title: "Участники проекта",
                        component: ProjectMembers,
                        project: this.state.project,
                        index: 1
                      });
                    }
                  }}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <Icon
                     name='fontawesome|users'
                     size={20}
                     color='#777'
                     style={styles.icon}
                     />
                    <Text style={styles.list_row_text}>
                      Участники: { this.state.members.length }
                    </Text>
                  </View>
                  { memebers_right_btn }
                </TouchableOpacity>
            </View>
          </ScrollView>
        );
      }

  });

/* ==============================
  Styles
  =============================== */
  var styles = StyleSheet.create({
    container: {
      padding: 10,
      justifyContent: 'center',
      padding: 20,
    },
    header: {
      fontWeight: 'bold',
      fontSize: 14,
      color: '#777',
    },
    text: {
      color: '#777',
    },
    title: {
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 10,
      backgroundColor: AppConfig.primaryColor,
      color: '#FFF',
      fontWeight: 'bold',
    },
    list_row: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: AppConfig.subtleGreyBorder,
    },
    list_row_text: {
      color: '#777',
    },
    list_row_title: {
      color:  AppConfig.textMain,
    },
    list_row_subtitle: {
      fontSize: 10,
      color:  AppConfig.textMain,
    },
    icon: {
      width: 20,
      height: 20,
      marginRight: 10,
    },
    right_block: {
      width: 60,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    target_date: {
      color:  AppConfig.textMain,
      fontSize: 10,
    },
    right_btn: {
      width: 24,
      height: 24,
      alignItems: 'center',
      justifyContent: 'center',
    },
    right_btn_arrow: {
      color:  AppConfig.textMain,
      fontSize: 24,
    },
  });

/* ==============================
  Done!
  =============================== */
  module.exports = ProjectResume;
  module.exports.details = {
    title: 'Сводка по проекту'
  };
