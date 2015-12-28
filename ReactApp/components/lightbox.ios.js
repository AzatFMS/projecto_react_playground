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

  var {
    View,
    Component,
    StyleSheet,
    Image,
    ScrollView,
  } = React;

  var Lightbox = require('react-native-lightbox');

  var LightboxView = React.createClass({

    getInitialState: function() {
      return {
          file: this.props.route.file,
        };
    },

    render: function() {
      console.log(AppConfig.api_url + '/files/link/' + this.state.file.id);
      return (
        <ScrollView style={styles.container}>
        <Lightbox navigator={this.props.navigator}>
          <Image
            style={{ height: 300 }}
            source={{ uri: AppConfig.api_url + '/files/link/' + this.state.file.id }}
          />
        </Lightbox>
        </ScrollView>
      );
    },
  });

  var styles = StyleSheet.create({
  });

  module.exports = LightboxView;
