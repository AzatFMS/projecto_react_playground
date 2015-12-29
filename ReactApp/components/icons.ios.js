/**
 * Icons
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
'use strict';

/**
  * =============================
  Initialise Component
  =============================== */
  // Ract
  var React = require('react-native');

  // App Globals
  var AppStyles = require('../styles.ios');
  var AppConfig = require('../config.ios');

  var {Icon,} = require('react-native-icons');

  var {
    View,
    Image,
    Component,
    TouchableOpacity,
  } = React;

  /**
    * Custom 'Menu' button component
    */
  class MenuIcon extends React.Component {
    render() {
      return (
        <TouchableOpacity onPress={this.props.leftButtonPress}>
          <Icon
             name={'fontawesome|bars'}
             size={25}
             color='#fff'
             style={AppStyles.navbar_button}
             />
        </TouchableOpacity>
      );
    }
  }
  exports.MenuIcon = MenuIcon;

  /**
    * Custom 'Back' button component
    */
  class BackIcon extends React.Component {
    render() {
      return (
        <TouchableOpacity onPress={this.props.leftButtonPress}>
        <Icon
           name={'fontawesome|chevron-left'}
           size={25}
           color='#fff'
           style={AppStyles.navbar_button}
           />
        </TouchableOpacity>
      );
    }
  }
  exports.BackIcon = BackIcon;

  class AddIcon extends React.Component {
    render() {
      return (
        <TouchableOpacity onPress={this.props.addButtonPress}>
          <Icon
             name={'fontawesome|plus-square'}
             size={25}
             color='#fff'
             style={AppStyles.navbar_button_right}
             />
        </TouchableOpacity>
      );
    }
  }
  exports.AddIcon = AddIcon;
