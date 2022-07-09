import { 
  View, 
  StyleSheet, 
  TouchableOpacity,
  Text, Dimensions, 
  ImageBackground, 
  Image, 
  Alert  } from "react-native";
import React, {useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {decrement} from '../redux/pointSlice';
import {useDispatch, useSelector} from 'react-redux';
import { images } from "../assets";
import { useEffect } from "react";

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const Home = () => {
  const navigation = useNavigation();

  const points = useSelector(state => state.points);
  const dispatch = useDispatch();
  const [score, setScore] = useState(0);
  const cal = useRef(['+','-','*','/']).current;
  const [randomNum1, setRandomNum1] = useState(Math.floor(Math.random() * 50));
  const [randomNum2, setRandomNum2] = useState(Math.floor(1 + Math.random() * 100));
  const [randomCal, setRandomCal] = useState(Math.floor(Math.random() * 3));
  const [result, setResult] = useState(0);


  useEffect(() => {
    switch(cal[randomCal]){
      case '+':
        return setResult(randomNum1 + randomNum2);
      case '-':
        return setResult(randomNum1 - randomNum2);
      case '*':
        return setResult(randomNum1 * randomNum2);
      default:
        return setResult(randomNum1 / randomNum2);
    }
  },[]);

  const onClickStartButton = () => {
    if (points.value === 0) {
      Alert.alert('Please buy more turn');
      return false;
    }
    dispatch(decrement());
    navigation.navigate("Play");
  }


  const onClickTurnButton = () => {
    navigation.navigate("BUY");
  }


  return (
    <View style={appStyle.homeView}>
      <View style={appStyle.appBar}>
        <ImageBackground source={images.score} style={appStyle.scoreStyle}>
          <Text style={appStyle.turnText}>{score}</Text>
        </ImageBackground>
        <TouchableOpacity onPress={onClickTurnButton}>
          <ImageBackground source={images.turn} style={appStyle.scoreStyle}>
            <Text style={appStyle.turnText}>{points.value}</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
      <Image source={images.top} style={appStyle.textImage} />
      <TouchableOpacity onPress={onClickStartButton}>
        <Image source={images.play1} style={appStyle.backStyle} />
      </TouchableOpacity>
      <ImageBackground source={images.panel} style={appStyle.centerImage}>
        <Text style={appStyle.labelText}>{`${randomNum1} ${cal[randomCal]} ${randomNum2}`}</Text>
        <Text style={appStyle.labelText}>=</Text>
        <Text style={appStyle.labelText}>{result}</Text>
      </ImageBackground>
      <View style={appStyle.centerView}>
        <Image source={images.true} style={appStyle.itemImage}/>
        <Image source={images.false} style={appStyle.itemImage}/>
      </View>
    </View>
  );
};


export const appStyle = StyleSheet.create({
  homeView: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    resizeMode: 'cover',
    backgroundColor: '#2d1416',
  },
  appBar: {
    paddingTop: 20,
    flex: 0.1,
    width: '100%',
    paddingHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  centerImage: {
    width: windowWidth * 0.8,
    height: windowWidth * 0.7,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  itemImage: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.1,
    resizeMode: 'contain',
  },
  scoreStyle: {
    width: windowWidth * 0.3,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: 20,
    justifyContent: 'flex-end'
  },
  turnText: {
    fontSize: 30,
    color: 'white',
    fontFamily: 'Via Appia',
  },
  labelText: {
    fontSize: 50,
    color: 'black',
    fontFamily: 'Via Appia',
  },
  textImage: {
    width: windowWidth * 0.4,
    height: windowWidth * 0.4,
    resizeMode: 'contain',
  },
  centerView: {
    marginTop: 10,
    flex: 0.4,
    width: '80%',
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  keyworksImage: {
    width: windowWidth * 0.4,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
    alignItems: 'center',
    marginVertical: 20,
  },
  buyImage: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
  },
  buttonView: {
    flex: 0.4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: windowHeight * 0.7,
  },
  backStyle: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    resizeMode: 'contain',
  },
  buttonStyle: {
    width: windowWidth * 0.3,
    height: windowWidth * 0.3,
    resizeMode: 'contain',
    marginTop: windowHeight * 0.2,
  }
});

export default Home;