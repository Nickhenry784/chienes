import { 
  View, 
  StyleSheet, 
  TouchableOpacity,
  Text, Dimensions, 
  ImageBackground, 
  Image,
  TextInput, 
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
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [success, setSuccess] = useState(false);
  const [play, setPlay] = useState(false);


  useEffect(() => {
    const timeOut = setTimeout(() => {
      if(play && seconds > 0){
        setSeconds(seconds - 1);
        console.log(seconds);
      }
      if(play && minutes > 0 && seconds === 0){
        setMinutes(minutes - 1);
        setSeconds(60);
        console.log("minutes",minutes);
      }
      if(play && hours > 0 && minutes === 0 && seconds === 0){
        setMinutes(60);
        setHours(hours - 1);
        console.log("minutes",minutes);
        console.log("second",seconds);
      }
      if(play && minutes === 0 && seconds === 0 && hours === 0) {
        console.log("ok");
        setSuccess(true);
      }
    }, 1000);
    return () => {
      clearTimeout(timeOut);
    }
  },[minutes, seconds, hours]);

  const onClickStartButton = () => {
    if (points.value === 0) {
      Alert.alert('Please buy more turn');
      return false;
    }
    if(minutes === 0 && hours === 0){
      Alert.alert('Please input text');
      return false;
    }
    dispatch(decrement());
    setPlay(true);
    setMinutes(Number(minutes));
    setHours(Number(hours));
  }

  const onClickSuccessImage = () => {
    setPlay(false);
    setSuccess(false);
  }


  const onClickTurnButton = () => {
    navigation.navigate("BUY");
  }


  return (
    <ImageBackground style={appStyle.homeView} source={images.background}>
      <View style={appStyle.appBar}>
          <Text style={appStyle.turnText}>{`Turn: ${points.value}`}</Text>
        <TouchableOpacity onPress={onClickTurnButton}>
          <Image source={images.iconbuy} style={appStyle.scoreStyle} />
        </TouchableOpacity>
      </View>
      <View style={appStyle.centerImage}>
          <View style={appStyle.inputView}>
            {play ? <Text style={appStyle.clockText}>{`${hours} : ${minutes}`}</Text> : 
            <>
            <TextInput
              style={appStyle.input}
              onChangeText={setHours}
              value={hours.toString()}
              keyboardType="numeric"
            />
            <Text style={appStyle.turnText}>:</Text>
            <TextInput
              style={appStyle.input}
              onChangeText={setMinutes}
              value={minutes.toString()}
              keyboardType="numeric"
            />
            </> }
          </View>
          <TouchableOpacity onPress={onClickStartButton}>
            <Image source={images.start} style={appStyle.buttonStyle} />
          </TouchableOpacity>
      </View>
      {success && 
        <TouchableOpacity onPress={onClickSuccessImage} style={appStyle.successButton}>
          <Image source={images.success} style={appStyle.successImage} />
        </TouchableOpacity> }
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
  successButton: {
    position: 'absolute',
    top: '10%',
  },
  appBar: {
    paddingTop: 10,
    flex: 0.2,
    width: '100%',
    paddingHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  successImage: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.4,
    resizeMode: 'contain',
  },
  centerImage: {
    marginTop: 20,
    width: windowWidth * 0.9,
    height: windowHeight * 0.4,
    borderColor: '#0a98c9',
    borderRadius: 8,
    borderWidth: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clockText: {
    fontSize: windowWidth > 640 ? 80 : 50,
    color: '#0a98c9',
    fontWeight: 'bold',
  },
  input: {
    height: windowWidth > 640 ? 100 : 60,
    width: windowWidth > 640 ? 100 : 60,
    margin: 12,
    fontSize: windowWidth > 640 ? 40 : 30,
    borderColor: '#0a98c9',
    borderRadius: 4,
    borderWidth: 2,
    textAlign: 'center',
    padding: 10,
  },
  itemImage: {
    width: windowWidth * 0.25,
    height: windowHeight * 0.08,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreStyle: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
    alignItems: 'center',
  },
  turnText: {
    fontSize: windowWidth > 640 ? 30 : 20,
    color: '#0a98c9',
    fontWeight: 'bold',
  },
  inputView: {
    width: windowWidth * 0.8,
    height: windowWidth * 0.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textImage: {
    width: windowWidth * 0.8,
    height: windowWidth * 0.2,
    resizeMode: 'contain',
  },
  centerView: {
    flex: 0.8,
    backgroundColor: 'red',
    width: '100%',
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
  }
});

export default Home;