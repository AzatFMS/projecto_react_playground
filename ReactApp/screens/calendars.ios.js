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

  var Calendar = require('react-native-calendar');
  var moment = require('moment');
  // App Globals
  var AppStyles = require('../styles.ios');
  var AppConfig = require('../config.ios');

  /* Screens / Pages */
  // var AnotherPage = require('./tabbar.ios');

  var {
    StyleSheet,
    View,
    Text,
    Component,
    DatePickerIOS,
  } = React;

  var customDayHeadings = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

/* ==============================
  View
  =============================== */
  var Calendars = React.createClass({

    getInitialState: function() {
        return {
          selectedPickerDate: new Date(),
          selectedDate: moment().format(),
          timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
        };
    },

    onDateChange: function(date) {
      this.setState({selectedPickerDate: date});
    },
    /**
      * RENDER
      */
    render() {

      var calendar =
      <View>
        <Calendar
          ref="calendar"
          eventDates={['2015-12-03', '2015-12-05', '2015-12-10', '2015-12-15', '2015-12-20', '2015-12-25', '2015-12-28', '2015-12-30']}
          scrollEnabled={true}
          showControls={true}
          dayHeadings={customDayHeadings}
          titleFormat={'MMMM YYYY'}
          prevButtonText={'<'}
          nextButtonText={'>'}
          onDateSelect={(date) => this.setState({selectedDate: date})}
          onTouchPrev={() => console.log('Back TOUCH')}
          onTouchNext={() => console.log('Forward TOUCH')}
          onSwipePrev={() => console.log('Back SWIPE')}
          onSwipeNext={() => console.log('Forward SWIPE')}/>
      </View>;
      var datePicker =
      <View style={styles.container}>
        <DatePickerIOS
          date={this.state.selectedPickerDate}
          mode="date"
          timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
          onDateChange={this.onDateChange}
        />
        <Text>Выбранная дата: {this.state.selectedPickerDate.toLocaleDateString()}</Text>
      </View>;

      return (
        <View>
          {calendar}
        </View>
      );
    }

  });

/* ==============================
  Styles
  =============================== */
  var styles = StyleSheet.create({
    container: {
      alignItems: 'center',
    }
  });

/* ==============================
  Done!
  =============================== */
  module.exports = Calendars;
  module.exports.details = {
    title: 'Календари'
  };
