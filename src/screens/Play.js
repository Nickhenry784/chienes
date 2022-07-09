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

  const [score, setScore] = useState(0);
  const cal = useRef(['+','-','*','/']).current;
  const [randomNum1, setRandomNum1] = useState(Math.floor(Math.random() * 50));
  const [randomNum2, setRandomNum2] = useState(Math.floor(1 + Math.random() * 100));
  const [randomCal, setRandomCal] = useState(Math.floor(Math.random() * 4));
  const [result, setResult] = useState(0);
  const [time, setTime] = useState(5);
  const [resultClick, setResultClick] = useState(0);
  const [popupState, setPopupState] = useState(false);


  useEffect(() => {
    switch(cal[randomCal]){
      case '+':
        return Math.floor(Math.random() * 3) === 0 ? setResult(randomNum1 + randomNum2) : setResult(randomNum1 + randomNum2 + Math.floor(-10 + Math.random() * 30));
      case '-':
        return Math.floor(Math.random() * 3) === 0 ? setResult(randomNum1 - randomNum2) : setResult(randomNum1 - randomNum2 + Math.floor(-10 + Math.random() * 30));
      case '*':
        return Math.floor(Math.random() * 3) === 0 ? setResult(randomNum1 * randomNum2) : setResult(randomNum1 * randomNum2 + Math.floor(-10 + Math.random() * 30));
      default:
        return Math.floor(Math.random() * 3) === 0 ? setResult(randomNum1 / randomNum2) : setResult(randomNum1 / randomNum2 + Math.floor(-10 + Math.random() * 30));
    }
  },[randomCal]);


  useEffect(() => {
    const timeOut = setTimeout(() => {
      if(!popupState && time > 0){
        setTime(time - 1);
      }
      if(!popupState && time === 0){
        if(resultClick === 0 || resultClick === false){
          setPopupState(true);
          setTimeout(() => {
            navigation.goBack();
          },5000);
        }else{
          setScore(score + 10);
          setRandomNum1(Math.floor(Math.random() * 50));
          setRandomNum2(Math.floor(Math.random() * 50));
          setRandomCal(Math.floor(Math.random() * 4));
          setResultClick(0);
          setTime(5);
        }
        clearTimeout(timeOut);
      }
    }, 1000);
    return () => {
      clearTimeout(timeOut);
    }
  }, [time]);

  const onClickBtn = (bool) => {
    var resultTemp = 0;
    if(cal[randomCal] === '+'){
      resultTemp = randomNum1 + randomNum2;
    } else if(cal[randomCal] === '-'){
      resultTemp = randomNum1 - randomNum2;
    } else if(cal[randomCal] === '*'){
      resultTemp = randomNum1 * randomNum2;
    } else{
      resultTemp = randomNum1 / randomNum2;
    }
    if(bool === true && result === resultTemp ){
      setResultClick(true);
    }else if(bool === true && result !== resultTemp ){
      setResultClick(false);
    }else if(bool === false && result !== resultTemp ){
      setResultClick(true);
    }else{
      setResultClick(false);
    }
  }


  return (
    <View style={appStyle.homeView}>
      <View style={appStyle.appBar}>
        <ImageBackground source={images.score} style={appStyle.scoreStyle}>
          <Text style={appStyle.turnText}>{score}</Text>
        </ImageBackground>
      </View>
      <Image source={images.top} style={appStyle.textImage} />
      <Text style={appStyle.timeText}>{time}</Text>
      <ImageBackground source={images.panel} style={appStyle.centerImage}>
        <Text style={appStyle.labelText}>{`${randomNum1} ${cal[randomCal] === '*' ? 'x' : cal[randomCal]} ${randomNum2}`}</Text>
        <Text style={appStyle.labelText}>=</Text>
        <Text style={appStyle.labelText}>{result}</Text>
      </ImageBackground>
      <View style={appStyle.centerView}>
        <TouchableOpacity onPress={() => onClickBtn(true)}>
          <Image source={images.true} style={appStyle.itemImage}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onClickBtn(false)}>
          <Image source={images.false} style={appStyle.itemImage}/>
        </TouchableOpacity>
      </View>
      {popupState && <View style={appStyle.popupView}>
        <ImageBackground source={images.popup} style={appStyle.popupImage}>
          <Text style={appStyle.scoreText}>{score}</Text>
        </ImageBackground>
        </View>}
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
  timeText: {
    fontSize: 70,
    color: 'white',
    fontFamily: 'Via Appia',
  },
  scoreText: {
    paddingTop: 30,
    fontSize: 50,
    color: 'white',
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
  popupView: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: '0%',
    left: '0%',
    right: '0%',
    bottom: '0%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  popupImage: {
    width: windowWidth * 0.7,
    height: windowHeight * 0.2,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default Home;