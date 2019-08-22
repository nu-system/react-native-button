import React from 'react';
import { LinearGradient } from 'expo';
import { View } from 'react-native';
import NuButton, { createNuButtonTheme } from '../../packages/button/lib';

/**
 * 初始化一组按钮
 */
createNuButtonTheme({
  defaultProps: {
    onPress: () => {
      console.log('you click the button');
    },
  },
  levelColors: {
    default: '#343a40',
    primary: '#007bff',
    secondary: '#6c757d',
    warning: '#ffc107',
    danger: '#dc3545',
    success: '#22A745',
  },
  wrapStyle: {
    h100p: {
      height: 100,
    },
  },
  textStyle: {
    customStyle({
      warning, fill, style, secondary, before
    }) {
      if (before && secondary) {
        style.color = '#ff0000';
      }
      if (warning && fill) {
        style.color = '#333333';
      }
      return style;
    },
  },
});

/**
 * 创建按钮主题
 */
createNuButtonTheme({
  name: 'test',
  defaultProps: {
    capsule: true,
    onPress: () => {
      console.log('you click the button');
    },
  },
  levelColors: {
    default: '#000000',
    primary: '#1976d2',
    secondary: 'rgb(220, 0, 78)',
    warning: '#ff9900',
    danger: 'red',
    success: 'green',
  },
  Content({
    // eslint-disable-next-line react/prop-types
    children, style, level, variant,
  }) {
    if (level === 'danger' && variant === 'fill') {
      return (
      // eslint-disable-next-line react/jsx-filename-extension
        <LinearGradient
          colors={['red', 'blue']}
          style={style}
        >
          {children}
        </LinearGradient>
      );
    }
    return (
      <View style={style}>{children}</View>
    );
  },
});

export default NuButton;
