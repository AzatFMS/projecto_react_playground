/**
 * Menu Contents
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
  var EventEmitter = require('EventEmitter');
  var Subscribable = require('Subscribable');

  // App Globals
  var AppStyles = require('../styles.ios');
  var AppConfig = require('../config.ios');

  // Screens / Pages
  var Index = require('../screens/tabbar.ios');
  var Projects = require('../screens/projects.ios');
  var ComingSoon = require('../screens/soon.ios');
  var FormExample = require('../modules/example/screens/forms.ios');
  var Calendars = require('../screens/calendars.ios');
  var ListSeparator = require('./list_separator.ios');

  var Util = require('../util.ios');

  var {Icon,} = require('react-native-icons');

  var {
    StyleSheet,
    View,
    Text,
    Component,
    TouchableOpacity,
    Image,
  } = React;

/* ==============================
  Menu Component
  =============================== */
var Menu = React.createClass({
  mixins: [Subscribable.Mixin],

  getInitialState: function() {
    return {
        isLoading: true,
        user: {},
      };
  },

  fetchUser: function() {
     fetch(Util.buildUrl('/accounts/accounts/current/'))
    .then(response => response.json())
    .then(jsonData => {
          this.setState({
             isLoading: false,
             user: jsonData,
          });
        })
    .catch(error => console.dir(error));
  },

  /**
    * Allow this component to see sidebar menu functions
    */
  contextTypes : {
    menuActions: React.PropTypes.object.isRequired
  },

  /**
    * On Load
    */
  componentDidMount: function() {
    this.addListenerOn(this.props.events, 'toggleMenu', this.onLeftButtonPress);
    this.fetchUser();
  },

  /**
    * When Navbar Left Button Tapped
    */
  onLeftButtonPress: function() {
    this.context.menuActions.toggle();
  },

  /**
    * Go To Screen
    */
  goToScreen: function(title, link) {
    this.props.navigate(title, link);
  },

  /**
    * RENDER
    */
  render: function() {
    // Programatically Generate the Links
    var linksJsx = [];

    // ['**TITLE**', '**MODULE_NAME**']
    var links = [
      ['Проекты', Projects, 'fontawesome|briefcase'],
      ['Календари', Calendars, 'fontawesome|calendar'],
      //['Инбокс', Index],
      //['Заметки', FormExample],
      //['Файлы', ComingSoon],
    ];

    // Build the actual Menu Items
    for (var i=0; i < links.length; i++) {
      linksJsx.push(
        <View>
          <TouchableOpacity
           style={styles.menuItem}
            onPress={this.goToScreen.bind(this, links[i][0], links[i][1])}>
              <Icon
               name={links[i][2]}
               size={20}
               color={AppConfig.textIcon}
               style={styles.icon}
               />
              <Text style={[AppStyles.baseText, styles.menuItemText]}>{links[i][0]}</Text>
          </TouchableOpacity>
          <ListSeparator/>
        </View>
      );
    }

    var avatar;
    if (this.state.user.profileData && this.state.user.profileData.avatar) {
      avatar = <Image
        style={styles.thumbnail}
        source={{uri: 'http://opt.organizer2016.ru/' + this.state.user.profileData.avatar}}
        />;
    } else {
      avatar = <Icon
       name={'fontawesome|user'}
       size={30}
       color={AppConfig.textMain}
       style={styles.thumbnail}
       />;
    }

    return (
      <View style={styles.container}>
        <View>
          <TouchableOpacity style={styles.header}>
            {avatar}
            <View style={styles.headerRirgt}>
              <Text style={styles.headerTitle}>{this.state.user.formatted_name}</Text>
              <Text style={styles.headerSubtitle}>{this.state.user.workPost ? this.state.user.workPost.post_name : ''}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <ListSeparator/>
        <View style={styles.menu}>
          {linksJsx}
        </View>
        <View>
          <TouchableOpacity
            style={styles.logout}
            onPress={this.props.logout}>
              <Text style={styles.headerTitle}>Выйти</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  },
});

/* ==============================
  Styles
  =============================== */
  var styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f9f9f9',
      width: AppConfig.windowWidth * 0.68,
      height: AppConfig.windowHeight,
      paddingTop: AppConfig.statusBarHeight,
    },
    header: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-start',
      padding: 10,
    },
    headerTitle: {
      flex: 1,
      color: AppConfig.textMain,
      fontSize: 16,
      //fontWeight: 'bold',
    },
    headerSubtitle: {
      flex: 1,
      color: AppConfig.textMain,
    },
    menu: {
      flex: 1,
      paddingBottom: 20,
    },
    menuItem: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
    },
    menuItemText: {
      fontSize: 18,
      //fontWeight: 'bold',
      flex: 1,
      color: AppConfig.textMain,
    },
    icon: {
      width: 20,
      height: 20,
      marginRight: 10,
    },
    logout: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
    },
    thumbnail: {
      width: 40,
      height: 40,
      marginRight: 10,
      borderRadius: 20,
    },
  });

/* ==============================
  Done!
  =============================== */
  module.exports = Menu;
