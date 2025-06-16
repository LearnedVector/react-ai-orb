import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import Svg, { Circle, Defs, RadialGradient, Stop } from 'react-native-svg';
import { SvgElements } from '../SvgElements/SvgElements';
import { colorPalettes } from '../../palette/colorPalettes';
import {
  baseOrbSize,
  baseShapeSize,
  defaultAnimationSpeedBase,
  defaultAnimationSpeedHue,
  defaultBlobAOpacity,
  defaultBlobBOpacity,
  defaultHueRotation,
  defaultMainOrbHueAnimation,
  defaultNoShadowValue,
  defaultSize,
} from '../../constants';
import { ReactAIOrbProps } from '../../types';

export const Orb = ({
  palette = colorPalettes.cosmicNebula,
  size = defaultSize,
  animationSpeedBase = defaultAnimationSpeedBase,
  animationSpeedHue = defaultAnimationSpeedHue,
  hueRotation = defaultHueRotation,
  mainOrbHueAnimation = defaultMainOrbHueAnimation,
  blobAOpacity = defaultBlobAOpacity,
  blobBOpacity = defaultBlobBOpacity,
  noShadow = defaultNoShadowValue,
}: ReactAIOrbProps) => {
  const baseDuration = 1000 / (animationSpeedBase * 0.5);

  const rotA = useRef(new Animated.Value(0)).current;
  const rotB = useRef(new Animated.Value(0)).current;
  const rotC = useRef(new Animated.Value(0)).current;
  const rotD = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotA, {
        toValue: 1,
        duration: baseDuration,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    Animated.loop(
      Animated.timing(rotB, {
        toValue: 1,
        duration: baseDuration * 1.5,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    Animated.loop(
      Animated.timing(rotC, {
        toValue: 1,
        duration: baseDuration * 2,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    Animated.loop(
      Animated.timing(rotD, {
        toValue: 1,
        duration: baseDuration * 2.5,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [baseDuration]);

  const rotateA = rotA.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
  const rotateB = rotB.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
  const rotateC = rotC.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
  const rotateD = rotD.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  const orbSizePx = size * baseOrbSize;
  const shapeSizePx = size * baseShapeSize;

  return (
    <View
      style={[
        styles.container,
        {
          width: orbSizePx,
          height: orbSizePx,
          borderRadius: orbSizePx / 2,
          shadowColor: noShadow ? 'transparent' : palette.shadowColor4,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: noShadow ? 0 : 0.5,
          shadowRadius: 6,
        },
      ]}
    >
      <Svg width={orbSizePx} height={orbSizePx} style={StyleSheet.absoluteFill}>
        <Defs>
          <RadialGradient id="mainGrad" cx="50%" cy="30%" rx="50%" ry="50%">
            <Stop offset="0%" stopColor={palette.mainBgStart} />
            <Stop offset="70%" stopColor={palette.mainBgEnd} />
          </RadialGradient>
        </Defs>
        <Circle cx={orbSizePx / 2} cy={orbSizePx / 2} r={orbSizePx / 2} fill="url(#mainGrad)" />
      </Svg>

      <Animated.View
        style={{
          position: 'absolute',
          transform: [{ rotate: rotateA }],
        }}
      >
        <Svg width={shapeSizePx} height={shapeSizePx}>
          <Defs>
            <RadialGradient id="shapeA" cx="50%" cy="90%" rx="50%" ry="50%">
              <Stop offset="0%" stopColor={palette.shapeAStart} />
              <Stop offset="70%" stopColor={palette.shapeAEnd} />
            </RadialGradient>
          </Defs>
          <Circle cx={shapeSizePx / 2} cy={shapeSizePx / 2} r={shapeSizePx / 2} fill="url(#shapeA)" />
        </Svg>
      </Animated.View>

      <Animated.View
        style={{
          position: 'absolute',
          left: orbSizePx * 0.1,
          top: orbSizePx * 0.05,
          transform: [{ rotate: rotateB }],
        }}
      >
        <Svg width={shapeSizePx} height={shapeSizePx}>
          <Defs>
            <RadialGradient id="shapeB" cx="33%" cy="12%" rx="50%" ry="50%">
              <Stop offset="0%" stopColor={palette.shapeBStart} />
              <Stop offset="26%" stopColor={palette.shapeBMiddle} />
              <Stop offset="63%" stopColor={palette.shapeBEnd} />
            </RadialGradient>
          </Defs>
          <Circle cx={shapeSizePx / 2} cy={shapeSizePx / 2} r={shapeSizePx / 2} fill="url(#shapeB)" opacity={0.9} />
        </Svg>
      </Animated.View>

      <Animated.View
        style={{
          position: 'absolute',
          left: orbSizePx * 0.05,
          top: orbSizePx * 0.05,
          transform: [{ rotate: rotateC }],
          opacity: 0.65,
        }}
      >
        <Svg width={shapeSizePx} height={shapeSizePx}>
          <Defs>
            <RadialGradient id="shapeC" cx="31%" cy="12%" rx="50%" ry="50%">
              <Stop offset="0%" stopColor={palette.shapeCStart} />
              <Stop offset="31%" stopColor={palette.shapeCMiddle} />
              <Stop offset="77%" stopColor={palette.shapeCEnd} />
            </RadialGradient>
          </Defs>
          <Circle cx={shapeSizePx / 2} cy={shapeSizePx / 2} r={shapeSizePx / 2} fill="url(#shapeC)" />
        </Svg>
      </Animated.View>

      <Animated.View
        style={{
          position: 'absolute',
          left: orbSizePx * 0.05,
          top: orbSizePx * 0.05,
          transform: [{ rotate: rotateD }],
          opacity: 0.55,
        }}
      >
        <Svg width={shapeSizePx} height={shapeSizePx}>
          <Defs>
            <RadialGradient id="shapeD" cx="12%" cy="80%" rx="50%" ry="50%">
              <Stop offset="0%" stopColor={palette.shapeDStart} />
              <Stop offset="31%" stopColor={palette.shapeDMiddle} />
              <Stop offset="77%" stopColor={palette.shapeDEnd} />
            </RadialGradient>
          </Defs>
          <Circle cx={shapeSizePx / 2} cy={shapeSizePx / 2} r={shapeSizePx / 2} fill="url(#shapeD)" />
        </Svg>
      </Animated.View>

      <View style={[styles.glass, { width: shapeSizePx, height: shapeSizePx }]}/>

      <SvgElements color1={palette.mainBgStart} color2={palette.mainBgEnd} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  glass: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -baseShapeSize / 2,
    marginTop: -baseShapeSize / 2,
    borderRadius: baseShapeSize / 2,
    backgroundColor: 'transparent',
    opacity: 0.8,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
});

export default Orb;
