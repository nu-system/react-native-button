import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  ActivityIndicator,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from 'react-native';
import merge from 'lodash.merge';

/**
 *
 * [私有接口]
 * @private
 */
// eslint-disable-next-line
const _apiPrivate = {
  isAndroid: Platform.OS === 'android',
  themes: {},
  getButtonInfoByProps({ styleConfig, useProps }) {
    const {
      levelColors, wrapStyle, textStyle, contentStyle,
    } = styleConfig;
    const styleProps = { ...useProps };
    const levelColor = levelColors[styleProps.level];
    const domsStyle = {
      wrap: { ...wrapStyle.default },
      text: { ...textStyle.default },
      content: { ...contentStyle.default },
    };

    /**
         * 等级变成 bool 类型
         */
    if (styleProps.level !== 'default') {
      styleProps[styleProps.level] = true;
    }

    /**
         * 将 size 变成 bool props
         */
    if (styleProps.size) {
      styleProps[styleProps.size] = true;
    }

    /**
         * 将变体和 level 变成 bool props
         */
    styleProps[styleProps.variant] = true;


    /**
         * circle 按钮 高宽一致
         */
    if (styleProps.circle) {
      domsStyle.wrap.width = domsStyle.wrap.height;
    }

    /**
         * 用户可以给 size 传数字
         */
    if (typeof styleProps.size === 'number') {
      domsStyle.wrap.height = styleProps.size;
    }

    if (styleProps.variant === 'fill') {
      // fill 按钮背景颜色等于主色
      domsStyle.wrap.backgroundColor = levelColor;
    } else if (styleProps.variant === 'ghost') {
      // ghost 按钮边框和文字颜色等于主色
      domsStyle.wrap.borderColor = levelColor;
      domsStyle.text.color = levelColor;
    } else if (styleProps.variant === 'link') {
      // link 按钮文字颜色等于主色
      domsStyle.text.color = levelColor;
    }

    /**
         * 将 prop 类型的样式合并到基础到样式中
         */
    const domsConfig = {
      wrap: wrapStyle,
      text: textStyle,
      content: contentStyle,
    };
      // eslint-disable-next-line no-restricted-syntax
    for (const [propKey, propValue] of Object.entries(styleProps)) {
      // eslint-disable-next-line no-restricted-syntax
      for (const [domKey, domConfig] of Object.entries(domsConfig)) {
        if (propValue === true && domConfig[propKey]) {
          domsStyle[domKey] = { ...domsStyle[domKey], ...domConfig[propKey] };
        }
      }
    }

    /**
         * 将 用户自定义的样式样式合并到基础到样式中
         */
    const customStyles = {
      wrap: wrapStyle.customStyle,
      text: textStyle.customStyle,
      content: contentStyle.customStyle,
    };
      // eslint-disable-next-line no-restricted-syntax
    for (const [key, customFunc] of Object.entries(customStyles)) {
      if (typeof customFunc === 'function') {
        const defaultStyle = domsStyle[key];
        domsStyle[key] = customFunc({
          levelColor,
          style: { ...defaultStyle },
          ...styleProps,
        }) || defaultStyle;
      }
    }

    return {
      levelColor,
      wrapStyle: { ...domsStyle.wrap },
      textStyle: { ...domsStyle.text },
      contentStyle: { ...domsStyle.content },
    };
  },

  renderChildren({
    buttonInfo, Txt, before, after, children,
  }) {
    /**
         * 如果子元素是个function 那么直接执行
         */
    if (typeof children === 'function') {
      return children({ ...buttonInfo });
    }

    let allChildrenIsString = true;
    React.Children.map(children, (element) => {
      if (typeof element !== 'string') {
        allChildrenIsString = false;
      }
    });

    /**
         * 如果所有的子元素都是字符串的时候放到 text 组件中
         */
    if (allChildrenIsString) {
      return (
      // eslint-disable-next-line react/jsx-filename-extension
        <Fragment>
          {typeof before === 'function' ? before({ ...buttonInfo }) : before}
          <Txt {...buttonInfo} style={buttonInfo.textStyle}>{children}</Txt>
          {typeof after === 'function' ? after({ ...buttonInfo }) : after}
        </Fragment>
      );
    }
    /**
         * 子元素除了 function 和 全部都是字符串之外的逻辑就直接输出 children
         */
    return children;
  },
};

/**
 * [默认配置]
 * @private
 */
// eslint-disable-next-line
const _defaultConfig = {
  name: 'default',
  defaultProps: {
    level: 'default',
    variant: 'fill',
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
    default: {
      position: 'relative',
      overflow: 'hidden',
      height: 40,
    },
    capsule: {
      borderRadius: 100,
    },
    circle: {
      borderRadius: 100,
    },
    large: {
      height: 48,
    },
    middle: {
      height: 32,
    },
    small: {
      height: 24,
    },
    ghost: {
      borderWidth: 1,
    },
    disabled: {
      opacity: 0.4,
    },
  },
  textStyle: {
    default: {
      color: '#ffffff',
      fontSize: 16,
      textAlign: 'center',
      marginLeft: 8,
      marginRight: 8,
    },
    large: {
      fontSize: 18,
    },
    middle: {
      fontSize: 14,
    },
    small: {
      fontSize: 12,
    },
  },
  contentStyle: {
    default: {
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
  },
  Content: View,
  // eslint-disable-next-line
    WrapAndroid({children, style, ...otherProps}) {
    return (
      <View style={style}>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.SelectableBackground()}
          {...otherProps}
        >
          {children}
        </TouchableNativeFeedback>
      </View>
    );
  },
  // eslint-disable-next-line
    Wrap({children, ...otherProps}) {
    return <TouchableOpacity activeOpacity={0.5} {...otherProps}>{children}</TouchableOpacity>;
  },
  // eslint-disable-next-line
    Loader({textStyle}) {
    // eslint-disable-next-line
        return (<ActivityIndicator animating color={textStyle.color}/>);
  },
  Txt: Text,
};

const NuButton = ({
  theme,
  before,
  after,
  // eslint-disable-next-line react/prop-types
  style,
  ...userProps
}) => {
  // eslint-disable-next-line
    const _config = _apiPrivate.themes[theme] ? _apiPrivate.themes[theme] : _apiPrivate.themes.default;
  const {
    Wrap, wrapProps, Loader, Content, Txt, defaultProps, ...styleConfig
  } = _config;
  const useProps = { ...defaultProps, ...userProps };
  const buttonInfo = _apiPrivate.getButtonInfoByProps({ styleConfig, useProps });
  const {
    loading, disabled, children, ...leftProps
  } = useProps;
  return (
    <Wrap
      {...buttonInfo}
      style={StyleSheet.flatten([buttonInfo.wrapStyle, style])}
      disabled={disabled || loading}
      {...wrapProps}
      {...leftProps}
    >
      <Content {...buttonInfo} style={buttonInfo.contentStyle} {...leftProps}>
        {loading ? Loader({ ...buttonInfo }) : _apiPrivate.renderChildren({
          Txt,
          children,
          before,
          after,
          buttonInfo,
        })}
      </Content>
    </Wrap>
  );
};

const ButtonPropTypes = {
  theme: PropTypes.string,
  /**
     * 不可用状态
     */
  // eslint-disable-next-line
    disabled: PropTypes.bool,
  /**
     * loading 状态
     */
  // eslint-disable-next-line
    loading: PropTypes.bool,
  /**
     *  按钮等级
     */
  // eslint-disable-next-line
    level: PropTypes.oneOf(['default', 'primary', 'secondary', 'warning', 'danger', 'success']),
  /**
     *  按钮大小
     */
  // eslint-disable-next-line
    size: PropTypes.oneOfType([
    PropTypes.oneOf(['large', 'middle', 'small']),
    PropTypes.number,
  ]),
  /**
     *  按钮变体
     */
  // eslint-disable-next-line
    variant: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(['fill', 'ghost', 'link']),
  ]),
  /**
     * 胶囊按钮，左右都是圆角的按钮
     */
  // eslint-disable-next-line
    capsule: PropTypes.bool,
  /**
     * 纯圆按钮
     */
  // eslint-disable-next-line
    circle: PropTypes.bool,
  /**
     * 放到文字之前的元素
     */
  before: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
  ]),
  /**
     * 放到文字之后的元素
     */
  after: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
  ]),
};

NuButton.propTypes = ButtonPropTypes;
NuButton.defaultProps = {
  theme: 'default',
  before: null,
  after: null,
};

/**
 * 创建主题
 * @param {string} name - 主题名称
 * @param {object} levelColors - 按钮主色
 * @param {node} Wrap - 按钮容器对象
 * @param {node} WrapAndroid - 安卓按钮容器对象
 * @param {object} wrapStyle - 主容器样式
 * @param {object} Content - 内容器
 * @param {object} contentStyle - 内容器样式
 * @param {object} Txt - 文本容器
 * @param {object} textStyle - 文本容器样式
 * @param {object} Loader - 加载对象
 */
function createNuButtonTheme({ name = 'default', ...otherConfig }) {
  const newConfig = merge({}, _defaultConfig, otherConfig);
  if (_apiPrivate.isAndroid) {
    newConfig.Wrap = newConfig.WrapAndroid;
  }
  _apiPrivate.themes[name] = newConfig;
}
createNuButtonTheme(_defaultConfig);
export default NuButton;
export { createNuButtonTheme, ButtonPropTypes };
