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


  /* Screens / Pages */
  // var AnotherPage = require('./tabbar.ios');
  var Projects = require('./projects.ios');

  var DB = require('../db.ios');

  var {Icon,} = require('react-native-icons');

  var Store = require('../store');

  var {
    StyleSheet,
    View,
    Text,
    Component,
    Animated,
    AsyncStorage,
  } = React;

var ANIMATE_TIME = 1000;

/* ==============================
  View
  =============================== */
  var Start = React.createClass({

    getInitialState: function() {
      return {
          posAnim: new Animated.Value(0),
          token_id: Store.getItem('token_id'),
          token: Store.getItem('token'),
        };
    },

    /**
      * Navigates to page from menu
      */
    navigate: function() {
      this.props.navigator.replace({
        title: "Проекты",
        component: Projects,
      });
    },


    _animate() {

      var start = this.state.posAnim._value == 0 ? 0 : -50;
      var end = this.state.posAnim._value == 0 ? -50 : 0;


      this.state.posAnim.setValue(start);

      this._anim = Animated.timing(this.state.posAnim, {
        toValue: end,
        duration: ANIMATE_TIME,
      }).start(this._animate);
    },


    componentDidMount() {
       Animated.timing(
         this.state.posAnim,
         {toValue: -50},
       ).start(this._animate);
   },

    /**
      * RENDER
      */
    render() {
      return (
        <View style={[AppStyles.container, AppStyles.containerCentered]}>
             <View>
               <Animated.View
                style={[{left: this.state.posAnim}, styles.animated ]}>
                <Icon
                   name={'ion|ios-arrow-thin-left'}
                   size={30}
                   color={AppConfig.textIcon}
                   style={styles.iconHand}
                   />
                <Text onPress={this.navigate} style={styles.navigate}>
                  Потяните меню слева
                </Text>
              </Animated.View>
            </View>
        </View>
      );
    }

  });

/* ==============================
  Styles
  =============================== */
  var styles = StyleSheet.create({
    navigate: {
      color: AppConfig.textMain,
      fontSize: 16,
    },
    icon: {
      width: 100,
      height: 100,
      marginBottom: 20,
    },
    iconHand: {
      width: 30,
      height: 30,
      marginRight: 10,
    },
    animated: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    }
  });

/* ==============================
  Done!
  =============================== */
  module.exports = Start;
  module.exports.details = {
    title: 'Стартовая страница'
  };
