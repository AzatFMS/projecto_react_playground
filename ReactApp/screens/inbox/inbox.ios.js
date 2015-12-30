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


  var Notices = require('./notices.ios');
  var MyTasks = require('./my_tasks.ios');
  var ControlledTasks = require('./controlled_tasks.ios');
  var AssignedTasks = require('./assigned_tasks.ios');
  var Events = require('./events.ios');

  var {
    StyleSheet,
    View,
    Text,
    Component,
    ActivityIndicatorIOS,
    TouchableOpacity,
    TabBarIOS,
  } = React;

  var {Icon, TabBarIOS} = require('react-native-icons');

/* ==============================
  View
  =============================== */
  var Inbox = React.createClass({

    getInitialState: function() {
      return {
          selectedTab: 'notices',
        };
    },

    render: function() {
      return (
        <TabBarIOS selectedTab={this.state.selectedTab}
        tintColor={'#e2e3e4'}
        barTintColor={'#000000'}>
          <TabBarIOS.Item
            selected={this.state.selectedTab === 'notices'}
            title="Уведомления"
            iconName={'fontawesome|warning'}
            iconSize={28}
            onPress={() => {
              this.setState({
                selectedTab: 'notices',
              });
            }}>
            <Notices navigator={this.props.navigator} style={styles.tab_content}/>
          </TabBarIOS.Item>
          <TabBarIOS.Item
            selected={this.state.selectedTab === 'my_tasks'}
            title="Мои задачи"
            iconName={'fontawesome|check-square-o'}
            iconSize={28}
            onPress={() => {
              this.setState({
                selectedTab: 'my_tasks',
              });
            }}>
            <MyTasks navigator={this.props.navigator} style={styles.tab_content}/>
          </TabBarIOS.Item>
          <TabBarIOS.Item
            selected={this.state.selectedTab === 'assigned_tasks'}
            title="Порученные мне"
            iconName={'fontawesome|list-alt'}
            iconSize={28}
            onPress={() => {
              this.setState({
                selectedTab: 'assigned_tasks',
              });
            }}>
            <AssignedTasks navigator={this.props.navigator} style={styles.tab_content}/>
          </TabBarIOS.Item>
          <TabBarIOS.Item
            selected={this.state.selectedTab === 'controlled_tasks'}
            title="Контроль"
            iconName={'fontawesome|eye'}
            iconSize={28}
            onPress={() => {
              this.setState({
                selectedTab: 'controlled_tasks',
              });
            }}>
            <ControlledTasks navigator={this.props.navigator} style={styles.tab_content}/>
          </TabBarIOS.Item>
          <TabBarIOS.Item
            selected={this.state.selectedTab === 'events'}
            title="События"
            iconName={'fontawesome|calendar'}
            iconSize={28}
            onPress={() => {
              this.setState({
                selectedTab: 'events',
              });
            }}>
            <Events navigator={this.props.navigator} style={styles.tab_content}/>
          </TabBarIOS.Item>
        </TabBarIOS>
      );
    },

  });

/* ==============================
  Styles
  =============================== */
  var styles = StyleSheet.create({
    tab_content: {
      //paddingBottom: 100,
    }
  });

/* ==============================
  Done!
  =============================== */
  module.exports = Inbox;
