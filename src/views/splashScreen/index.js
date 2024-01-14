import React, {useEffect, useState, useRef} from 'react';
import {Animated, Easing, Text} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {spline} from '@georgedoescode/spline';
import {createNoise2D} from 'simplex-noise';
import {
  useValue,
  useComputedValue,
  useClockValue,
  Canvas,
  Path,
} from '@shopify/react-native-skia';

const SplashScreen = () => {
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const circleGreenX = useRef(new Animated.Value(RFValue(0))).current;
  const circleLilacX = useRef(new Animated.Value(RFValue(0))).current;
  const circleGreenY = useRef(new Animated.Value(RFValue(0))).current;
  const circleLilacY = useRef(new Animated.Value(RFValue(0))).current;
  const logoFade = useRef(new Animated.Value(RFValue(0))).current;
  const [start, setStart] = useState(false);
  const primaryColor = '#0ABAB5';
  const secondaryColor = '#63218D';
  const [scaleAnimation] = useState(new Animated.Value(1));
  const [scaleO] = useState(new Animated.Value(1));
  const [scaleImage] = useState(new Animated.Value(1));
  const oFade = useRef(new Animated.Value(RFValue(0))).current;
  const specialCharacterMovement = useRef(new Animated.Value(RFValue(200))).current;

  const noise = createNoise2D();
  const noiseStep = 0.01;
  const clock = useClockValue();

  const createPoints = () => {
    const newPoints = [];
    const numPoints = 6;
    const angleStep = (Math.PI * 2) / numPoints;
    const rad = 30;

    for (let i = 1; i <= numPoints; i++) {
      const theta = i * angleStep;
      const x = 60 + Math.cos(theta) * rad;
      const y = 60 + Math.sin(theta) * rad;

      newPoints.push({
        x,
        y,
        originX: x,
        originY: y,
        noiseOffsetX: Math.random() * 1000,
        noiseOffsetY: Math.random() * 1000,
      });
    }

    return newPoints;
  };

  const mapNumbers = (n, start1, start2, end1, end2) => {
    return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
  };

  const animate = () => {
    const newPoints = [];

    for (let i = 0; i < points.current.length; i++) {
      const point = points.current[i];

      const nX = noise(point.noiseOffsetX, point.noiseOffsetX);
      const nY = noise(point.noiseOffsetY, point.noiseOffsetY);

      const x = mapNumbers(nX, -1, 1, point.originX - 10, point.originX + 10);
      const y = mapNumbers(nY, -1, 1, point.originY - 10, point.originY + 10);

      point.x = x;
      point.y = y;

      point.noiseOffsetX += noiseStep;
      point.noiseOffsetY += noiseStep;

      newPoints.push(point);
    }
  };

  const points = useValue(createPoints());

  const path = useComputedValue(() => {
    animate();
    return spline(points.current, 1, true);
  }, [clock]);

  useEffect(() => {
    setTimeout(() => setStart(true), 1000);
  }, []);

  useEffect(() => {
    if (start === true) {
      Animated.timing(circleGreenX, {
        toValue: RFValue(60),
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.elastic(2),
      }).start();
      Animated.timing(circleLilacX, {
        toValue: RFValue(-60),
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.elastic(2),
      }).start();
      Animated.timing(circleGreenY, {
        toValue: RFValue(60),
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.elastic(2),
      }).start();
      Animated.timing(circleLilacY, {
        toValue: RFValue(-60),
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.elastic(2),
      }).start();

      setTimeout(function () {
        backAnimated();
      }, 400);
    }
  }, [start]);

  const backAnimated = () => {
    Animated.timing(circleGreenX, {
      toValue: RFValue(0),
      duration: 1000,
      useNativeDriver: true,
    }).start();
    Animated.timing(circleLilacX, {
      toValue: RFValue(0),
      duration: 1000,
      useNativeDriver: true,
    }).start();
    Animated.timing(circleGreenY, {
      toValue: RFValue(0),
      duration: 1000,
      useNativeDriver: true,
    }).start();
    Animated.timing(circleLilacY, {
      toValue: RFValue(0),
      duration: 1000,
      useNativeDriver: true,
    }).start();
    Animated.timing(scaleAnimation, {
      toValue: 1000,
      delay: 2000,
      duration: 7000,
      useNativeDriver: true,
    }).start();
    Animated.timing(scaleO, {
      toValue: 1000,
      delay: 2600,
      duration: 7000,
      useNativeDriver: true,
    }).start();
    Animated.timing(oFade, {
      toValue: 1,
      delay: 1000,
      duration: 2000,
      useNativeDriver: true,
    }).start();
    Animated.timing(scaleImage, {
      toValue: 200,
      delay: 2000,
      duration: 500,
      useNativeDriver: true,
    }).start();
    Animated.timing(logoFade, {
      toValue: 1,
      delay: 2500,
      duration: 2000,
      useNativeDriver: true,
    }).start();
    Animated.timing(specialCharacterMovement, {
      toValue: RFValue(356),
      duration: 2000,
      delay: 3000,
      easing: Easing.elastic(2),
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={{
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Animated.View
        style={{position: 'absolute', transform: [{translateX: circleGreenX}]}}>
        <Canvas style={{width: RFValue(100), height: RFValue(100)}}>
          <Path path={path} color={secondaryColor} />
        </Canvas>
      </Animated.View>
      <Animated.View
        style={{position: 'absolute', transform: [{translateX: circleLilacX}]}}>
        <Canvas style={{width: RFValue(100), height: RFValue(100)}}>
          <Path path={path} color={secondaryColor} />
        </Canvas>
      </Animated.View>
      <Animated.View
        style={{position: 'absolute', transform: [{translateY: circleGreenY}]}}>
        <Canvas style={{width: RFValue(100), height: RFValue(100)}}>
          <Path path={path} color={primaryColor} />
        </Canvas>
      </Animated.View>
      <Animated.View
        style={{
          position: 'absolute',
          transform: [{translateY: circleLilacY}, {scale: scaleAnimation}],
        }}>
        <Canvas style={{width: RFValue(100), height: RFValue(100)}}>
          <Path path={path} color={primaryColor} />
        </Canvas>
      </Animated.View>
      <Animated.Text
        style={{
          opacity: logoFade,
          transform: [{scale: scaleO}],
          position: 'absolute',
          top: 30,
          right: 280,
          fontSize: 50,
          color: '#63218D',
          fontWeight: '600',
        }}>
        O
      </Animated.Text>
      <Animated.Text
        style={{
          opacity: logoFade,
          transform: [{scale: scaleO}],
          position: 'absolute',
          top: 360,
          left: 400,
          fontSize: 50,
          color: '#63218D',
          fontWeight: '600',
        }}>
        O
      </Animated.Text>
      <Animated.Text
        style={{
          opacity: logoFade,
          transform: [{scale: scaleO}],
          position: 'absolute',
          top: 700,
          left: 280,
          fontSize: 50,
          color: '#63218D',
          fontWeight: '600',
        }}>
        O
      </Animated.Text>
      <Animated.Text
        style={{
          opacity: logoFade,
          transform: [{scale: scaleO}],
          position: 'absolute',
          top: 90,
          left: 180,
          fontSize: 50,
          color: '#63218D',
          fontWeight: '600',
        }}>
        O
      </Animated.Text>
      <Animated.Text
        style={{
          opacity: logoFade,
          transform: [{scale: scaleO}],
          position: 'absolute',
          top: 380,
          right: 180,
          fontSize: 50,
          color: '#63218D',
          fontWeight: '600',
        }}>
        O
      </Animated.Text>
      <Animated.Text
        style={{
          opacity: logoFade,
          transform: [{scale: scaleO}],
          position: 'absolute',
          top: 630,
          left: 180,
          fontSize: 50,
          color: '#63218D',
          fontWeight: '600',
        }}>
        O
      </Animated.Text>
      <Animated.Text
        style={{
          opacity: logoFade,
          transform: [{scale: scaleO}],
          position: 'absolute',
          top: 200,
          left: 280,
          fontSize: 50,
          color: '#63218D',
          fontWeight: '600',
        }}>
        O
      </Animated.Text>
      <Animated.Text
        style={{
          opacity: logoFade,
          transform: [{scale: scaleO}],
          position: 'absolute',
          top: 580,
          left: 80,
          fontSize: 50,
          color: '#63218D',
          fontWeight: '600',
        }}>
        O
      </Animated.Text>
      <Animated.View style={{opacity: logoFade}}>
        <Animated.Text style={{
            fontSize: 60,
            color: '#63218D',
            fontWeight: 'bold',
            letterSpacing: 5,
            position: 'absolute',
            bottom: 400,
            transform: [{translateY: specialCharacterMovement}],
            marginLeft: 67,
          }}>´</Animated.Text>
        <Animated.View style={{position: 'absolute', marginLeft: 72, marginTop: 30, width: RFValue(7), height: RFValue(30), backgroundColor: '#63218D'}}></Animated.View>
      <Animated.Text>
        <Text
          style={{
            fontSize: 60,
            color: '#63218D',
            fontWeight: 'bold',
            letterSpacing: 5,
          }}>
          Ol via's
        </Text>
        <Text style={{fontSize: 30, color: 'white'}}> App</Text>
      </Animated.Text>
      </Animated.View>
    </Animated.View>
  );
};

export default SplashScreen;
