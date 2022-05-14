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

const data = [{id: 1, text: "玉米", image: [images.corn, images.flower], result: images.com},{id: 2, text: "摩托车", image: [images.motor, images.car], result: images.motor},{id: 3, text: "紫色", image: [images.purple, images.green] , result: images.purple},{id: 4, text: "花 ", image: [images.flower, images.car] , result: images.flower},{id: 5, text: "火", image: [images.fire, images.snow] , result: images.fire} ]

const Home = () => {
  const navigation = useNavigation();

  const [score, setScore] = useState(0);
  const [random, setRandom] = useState(Math.floor(Math.random() * 1));
  const [item, setItem] = useState(data[Math.floor(Math.random() * 5)]);


  useEffect(() => {
    console.log(item);
  },[]);


  const onClickItemButton = (image) => {
    if(image === item.result){
      setScore(score + 100);
      setRandom(Math.floor(Math.random() * 1));
      console.log(random);
      setItem(data[Math.floor(Math.random() * 5)]);
      console.log(item);
    } else{
      navigation.goBack();
    }
  }


  return (
    <ImageBackground style={appStyle.homeView} source={images.background}>
      <View style={appStyle.appBar}>
        <ImageBackground source={images.score} style={appStyle.scoreStyle}>
          <Text style={appStyle.turnText}>{`Score: ${score}`}</Text>
        </ImageBackground>
      </View>
      <Image source={images.learnChinese} style={appStyle.textImage} />
        <ImageBackground source={images.keyworks} style={appStyle.keyworksImage}>
          <Text style={appStyle.text}>{item.text}</Text>
        </ImageBackground>
      <View style={appStyle.centerView}>
        <TouchableOpacity onPress={() => onClickItemButton(item.image[random + 1 || random - 1])}>
          <ImageBackground source={images.square1} style={appStyle.centerImage}>
            <Image source={item.image[random + 1 || random - 1]} style={appStyle.itemImage} />
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity onPress={()  => onClickItemButton(item.image[random])}>
          <ImageBackground source={images.square2} style={appStyle.centerImage}>
            <Image source={item.image[random]} style={appStyle.itemImage}/>
          </ImageBackground>
        </TouchableOpacity>
      </View>
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
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
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
    marginTop: 80,
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
  text: {
    fontSize: windowWidth > 640 ? 30 : 20,
    color: 'black',
    fontFamily: 'NotoSansCJKsc-Black',
  },
  buttonStyle: {
    width: windowWidth * 0.3,
    height: windowWidth * 0.3,
    resizeMode: 'contain',
    marginTop: windowHeight * 0.2,
  }
});

export default Home;