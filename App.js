/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Button} from 'react-native';

import ListPlaces from './src/components/ListItem/ListPlaces';
import AddPlaces from './src/components/InputForm';
import PlaceImage from './src/assets/1.jpg';
import PlaceDetail from './src/components/PlaceDetail';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component{
  state = {
    placeName: "",
    places: [],
    selectedPlace: null,
  };

  changeName = (e) => {
    this.setState({placeName: e});
  };

  addPlace = () => {
    if(this.state.placeName.trim() === "") {
      return;
    }

    this.setState(prevState => {
      return {
        places: prevState.places.concat({
          key: Math.random(),
          name: prevState.placeName,
          image: PlaceImage
        })
      }
    });
  };

  onDeletePlace = (key) => {
    this.setState(prevState => {
      return {
        places:   prevState.places.filter(place => {
          return place.key !== key
        }),
        selectedPlace: null
      }
    })
  };

  closeModal = () => {
    this.setState({selectedPlace: null})
  };

  onSelectedItem = key => {
    this.setState(prevState => {
      return {
        selectedPlace: prevState.places.find(place => {
          return {
            place: place.key === key
          }
        })
      };
    });

  };

  render() {
    const { places, placeName, selectedPlace } = this.state;
    return (
      <View style={styles.container}>
        <PlaceDetail
          selectedPlace={selectedPlace}
          closeModal={this.closeModal}
          deletePlace={this.onDeletePlace}
        />
        <AddPlaces
          addPlace={this.addPlace}
          name={placeName}
          changeName={this.changeName}
        />
        <View style={styles.listContainer}>
          <ListPlaces
            places={places}
            selectedItem={this.onSelectedItem}
          />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  listContainer: {
    width: "100%",
  }
});

