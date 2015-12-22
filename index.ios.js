/**
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
'use strict';

/* ==============================
  Initialise App
  =============================== */
  // React
  var React = require('react-native');
  var EventEmitter = require('EventEmitter');
  var Subscribable = require('Subscribable');

  // 3rd Party Components
  var NavigationBar = require('react-native-navbar');
  var SideMenu = require('react-native-side-menu');

  // App Globals
  var AppStyles = require('./ReactApp/styles.ios');

  // Components
  var Icons = require('./ReactApp/components/icons.ios');
  var Menu = require('./ReactApp/components/menu.ios');

  // Screens / Pages
  var Index = require('./ReactApp/screens/tabbar.ios');
  var Projects = require('./ReactApp/screens/projects.ios');
  var StartScreen = require('./ReactApp/screens/start.ios');

  var FormValidation = require('tcomb-form-native');

  var UTIL = require('./ReactApp/util.ios');

  var {
    AppRegistry,
    Component,
    StyleSheet,
    Navigator,
    Text,
    View,
    TextInput,
    ScrollView,
    TouchableOpacity,
    AlertIOS,
  } = React;

/* ==============================
  Main Navigator with Sidemenu
  =============================== */

  /**
   * Custom `Title` component
   */
  class CustomTitle extends React.Component {
    render() {
      return (
          <Text style={[AppStyles.baseText, AppStyles.strong, AppStyles.navbar_title]}>{UTIL.cutString(this.props.title, 30)}</Text>
      );
    }
  }

  /**
   *  Main View w/ Sidebar
   */
  var Application = React.createClass({
    mixins: [Subscribable.Mixin],

    getInitialState: function() {

      var valid_login = FormValidation.refinement(
        FormValidation.String, function (email) {
          var re = /^[0-9-A-z_]{2,}$/i;
          return re.test(email);
        }
      );

      var valid_password = FormValidation.refinement(
        FormValidation.String, function (password) {
          if(password.length < 2) return false;
          return true;
        }
      );

      return {
        user_id: null,
        touchToClose: true,
        disableGestures: false,
        show_save_msg: false,
        form_fields: FormValidation.struct({
          login: valid_login,
          password: valid_password,
        }),
        form_values: {},
        options: {
          fields: {
            login: {
              label: 'Логин',
              error: 'Некорректный логин',
            },
            password: {
              label: 'Пароль',
              error: 'Некорректный пароль',
              password: true,
            },
          }
        },
      };
    },

    /**
      * On Load
      */
    componentWillMount: function() {
      this.eventEmitter = new EventEmitter();
    },

    /**
      * When Back Button from NavBar is Clicked
      */
    onLeftBackButtonPress: function(navigator) {
      this.refs.rootNavigator.pop();
    },

    /**
      * When Hamburger from NavBar is Clicked
      */
    onLeftButtonPress: function() {
      this.eventEmitter.emit('toggleMenu');
    },

    /**
      * Navigates to page from menu
      */
    navigate: function(title, link) {
      this.refs.rootSidebarMenu.closeMenu();

      this.refs.rootNavigator.replace({
        title: title,
        component: link,
      });
    },

    login: function() {
      var value = this.refs.form.getValue();

      if (value) {
        /*
        AlertIOS.alert(
          'Приветствуем',
          'Логин: "' + value.login + '" Пароль "' + value.password + '"',
        );
        this.setState({user_id: 1});
        */
        fetch('http://opt.organizer2016.ru/site/token/', {
          method: 'POST',
          body: 'login=' + value.login + '&password=' + value.password
        })
       .then(response => {
         if (response.status != 200) {
           this.setState({error: 'Некорректный логин/пароль'});
           return Promise.reject(new Error(response.statusText));
         } else {
           this.setState({error: null});
           return response;
         }
       })
       .then(response => response.json())
       .then(jsonData => {
             AlertIOS.alert(
               'Приветствуем',
               'Вы вошли как "' + value.login + '"',
             );
             this.setState({user_id: jsonData.id, token: jsonData.token});
           })
       .catch(error => console.dir(error));
      }
    },

    logout: function() {
      this.setState({user_id: null});
    },

    /**
      * Generate Custom Navbar
      */
    renderScene: function(route, navigator) {
      var Component = route.component;
      var navBar = route.navigationBar;

      // Icons
      var MenuIcon = Icons.MenuIcon;
      var BackIcon = Icons.BackIcon;

      // Navbar Setup
      if (navBar) {
        navBar = React.addons.cloneWithProps(navBar, {
          navigator: navigator,
          route: route
        });
      }

      // Default Navbar Title
      var title = 'Стартовая';
      if(route.title != undefined) {
        title = route.title;
      }

      // Determine which Icon component - hamburger or back?
      var customPrev = <MenuIcon leftButtonPress={this.onLeftButtonPress} />;
      if (route.index > 0){
        var customPrev = <BackIcon leftButtonPress={this.onLeftBackButtonPress} />;
      }

      // Done
      return (
        <View style={AppStyles.container}>
          <NavigationBar
            title={title}
            style={AppStyles.navbar}
            customPrev={customPrev}
            customTitle={<CustomTitle title={title} />} />

          <Component navigator={navigator} route={route} />
        </View>
      );
    },

    renderLogin: function() {
      var Form = FormValidation.form.Form;
      if (this.state.error) {
        var error = <Text style={[AppStyles.centered, AppStyles.error]}>{this.state.error}</Text>;
      }

      return (
        <View style={styles.container}>
           <View>
              <View style={[AppStyles.paddingHorizontal]}>

                <Text style={[AppStyles.baseText, AppStyles.h3, AppStyles.centered]}>
                  Вход
                </Text>

                <View style={AppStyles.hr} />

                <Form
                  ref="form"
                  type={this.state.form_fields}
                  value={this.state.form_values}
                  options={this.state.options} />

                    {error}

                <View style={AppStyles.hr} />

                <View style={[AppStyles.paddingHorizontal]}>

                  <TouchableOpacity
                    style={[AppStyles.formButton]}
                    onPress={this.login}>
                    <Text style={[AppStyles.baseText, AppStyles.formButton_text]}>Войти</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
        </View>
      );
    },

    renderMain: function() {
      return (
        <SideMenu
          ref="rootSidebarMenu"
          menu={<Menu events={this.eventEmitter} navigate={this.navigate} logout={this.logout}/>}
          touchToClose={this.state.touchToClose}
          disableGestures={this.state.disableGestures}>

          <Navigator
            ref="rootNavigator"
            style={[AppStyles.container, AppStyles.appContainer]}
            renderScene={this.renderScene}
            initialRoute={{
              title: 'PROJECTO',
              component: StartScreen,
            }} />

        </SideMenu>
      );
    },

    /**
      * RENDER
      */
    render: function() {
      if (!this.state.user_id) {
        return this.renderLogin();
      } else {
        return this.renderMain();
      }
    }
  });

/* ==============================
  Styles
  =============================== */
  var styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 50,
      paddingBottom: 20,
      justifyContent: 'flex-start',
    },
  });

/* ==============================
  Done!
  =============================== */
  AppRegistry.registerComponent('PROJECTO', () => Application);
