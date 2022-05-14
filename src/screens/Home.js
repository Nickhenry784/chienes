import { 
  View, 
  StyleSheet, 
  TouchableOpacity,
  Text, Dimensions, 
  ImageBackground, 
  Image, 
  Alert  } from "react-native";
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {decrement} from '../redux/pointSlice';
import {useDispatch, useSelector} from 'react-redux';
import { images } from "../assets";

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const Home = () => {
  const navigation = useNavigation();

  const points = useSelector(state => state.points);
  const dispatch = useDispatch();
  const [score, setScore] = useState(0);


  useEffect(() => {
    console.log(points);
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
    <ImageBackground style={appStyle.homeView} source={images.background}>
      <View style={appStyle.appBar}>
        <ImageBackground source={images.score} style={appStyle.scoreStyle}>
          <Text style={appStyle.turnText}>{`Score: ${score}`}</Text>
        </ImageBackground>
        <TouchableOpacity onPress={onClickTurnButton}>
          <ImageBackground source={images.heart} style={appStyle.scoreStyle}>
          <Text style={appStyle.turnText}>{points.value}</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
      <Image source={images.learnChinese} style={appStyle.textImage} />
      <ImageBackground source={images.keyworks} style={appStyle.keyworksImage}>
        <Image source={images.label} style={appStyle.buyImage} />
      </ImageBackground>
      <View style={appStyle.centerView}>
        <ImageBackground source={images.square1} style={appStyle.centerImage}>
          <ImageBackground source={images.motor} style={appStyle.itemImage}>
            <Image source={images.true} style={appStyle.backStyle} />
          </ImageBackground>
        </ImageBackground>
        <ImageBackground source={images.square2} style={appStyle.centerImage}>
          <ImageBackground source={images.car} style={appStyle.itemImage}>
            <Image source={images.false} style={appStyle.backStyle} />
          </ImageBackground>
        </ImageBackground>
      </View>
      <TouchableOpacity onPress={onClickStartButton}>
        <Image source={images.play} style={appStyle.buttonStyle} />
      </TouchableOpacity>
    </ImageBackground>
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
    width: windowWidth * 0.4,
    height: windowWidth * 0.4,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemImage: {
    width: windowWidth * 0.25,
    height: windowHeight * 0.08,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreStyle: {
    width: windowWidth * 0.32,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
    alignItems: 'center',
  },
  turnText: {
    fontSize: windowWidth > 640 ? 30 : 20,
    color: 'white',
    fontFamily: 'NotoSansCJKsc-Black',
  },
  textImage: {
    width: windowWidth * 0.8,
    height: windowWidth * 0.2,
    resizeMode: 'contain',
  },
  centerView: {
    marginTop: 20,
    flex: 0.4,
    width: '100%',
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