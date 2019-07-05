import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    View,
    ActivityIndicator,
    TouchableNativeFeedback,
    TouchableOpacity,
    Platform,
    StyleSheet
} from 'react-native';
import mergeDeep from "./mergeDeep.js";

/**
 *
 * [私有接口]
 * @private
 */
const _apiPrivate = {
    isAndroid: Platform.OS === "android",
    themes: {},
    getButtonInfoByProps: function ({styleConfig, useProps}) {
        const {levelColors, wrapStyle, textStyle, contentStyle} = styleConfig;
        const styleProps = {...useProps};
        let wrapDefault = {...wrapStyle.default};
        let textDefault = {...textStyle.default};
        let contentDefault = {...contentStyle.default};
        const levelColor = levelColors[styleProps.level];

        /**
         * 将变体和level 变成 bool props
         */
        if (styleProps.level !== 'default') {
            styleProps[styleProps.level] = true;
        }
        if (styleProps.size) {
            styleProps[styleProps.size] = true;
        }
        styleProps[styleProps.variant] = true;

        /**
         * 创建预先设置的样式
         */
        if (styleProps.circle) {
            wrapDefault.width = wrapDefault.height;
        }
        if (typeof styleProps.size === 'number') {
            wrapDefault.height = size;
        }
        if (styleProps.variant === 'fill') {
            wrapDefault.backgroundColor = levelColor;
        } else if (styleProps.variant === 'ghost') {
            wrapDefault.borderColor = levelColor;
            textDefault.color = levelColor;
        } else if (styleProps.variant === 'link') {
            textDefault.color = levelColor;
        }

        /**
         * 添加自定义属性样式
         */
        for (let [key, value] of Object.entries(styleProps)) {
            if (value === true && wrapStyle[key]) {
                wrapDefault = {...wrapDefault, ...wrapStyle[key]};
            }
            if (value === true && textStyle[key]) {
                textDefault = {...textDefault, ...textStyle[key]};
            }
            if (value === true && contentStyle[key]) {
                contentDefault = {...contentDefault, ...contentStyle[key]};
            }
        }
        if (typeof wrapStyle.customStyle === 'function') {
            wrapDefault = wrapStyle.customStyle({
                levelColor,
                style: wrapDefault,
                ...styleProps
            }) || wrapDefault;
        }

        if (typeof textStyle.customStyle === 'function') {
            textDefault = textStyle.customStyle({
                levelColor,
                style: textDefault,
                ...styleProps
            }) || textDefault;
        }

        if (typeof contentStyle.customStyle === 'function') {
            contentDefault = contentStyle.customStyle({
                levelColor,
                style: contentDefault,
                ...styleProps
            }) || contentDefault;
        }
        return {
            levelColor: levelColor,
            wrapStyle: {...wrapDefault},
            textStyle: {...textDefault},
            contentStyle: {...contentDefault}
        };
    },
    renderChildren: function ({buttonInfo, Txt, Pre, Append, children}) {
        if (typeof children === "function") {
            return children({...buttonInfo});
        }
        return (
            <Fragment>
                {typeof Pre === 'function' ? Pre({...buttonInfo}) : Pre}
                <Txt {...buttonInfo} style={buttonInfo.textStyle}>{children}</Txt>
                {typeof Append === 'function' ? Append({...buttonInfo}) : Append}
            </Fragment>
        );
    }
};

/**
 * [默认配置]
 * @private
 */
const _defaultConfig = {
    name: 'default',
    defaultProps: {
        level: 'default',
        variant: 'fill'
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
            borderRadius: 100
        },
        circle: {
            borderRadius: 100
        },
        large: {
            height: 48
        },
        middle: {
            height: 32
        },
        small: {
            height: 24
        },
        ghost: {
            borderWidth: 1
        },
        disabled: {
            opacity: 0.4
        }
    },
    textStyle: {
        default: {
            color: "#ffffff",
            fontSize: 16,
            textAlign: 'center',
            marginLeft: 8,
            marginRight: 8
        },
        large: {
            fontSize: 18
        },
        middle: {
            fontSize: 14
        },
        small: {
            fontSize: 12
        }
    },
    contentStyle: {
        default: {
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row'
        }
    },
    Content: View,
    WrapAndroid: function ({children, style, ...otherProps}) {
        return (
            <View style={style}>
                <TouchableNativeFeedback
                    background={TouchableNativeFeedback.SelectableBackground()} {...otherProps}>
                    {children}
                </TouchableNativeFeedback>
            </View>
        );
    },
    Wrap: function ({children, ...otherProps}) {
        return <TouchableOpacity activeOpacity={0.5} {...otherProps}>{children}</TouchableOpacity>;
    },
    Loader: function ({textStyle}) {
        return (<ActivityIndicator animating={true} color={textStyle.color}/>);
    },
    Txt: Text
};

const NuButton = function ({theme = 'default', style, Pre, Append, ...userProps}) {
    const _config = _apiPrivate.themes[theme] ? _apiPrivate.themes[theme] : _apiPrivate.themes.default;
    const {Wrap, wrapProps, Loader, Content, Txt, defaultProps, ...styleConfig} = _config;
    const useProps = {...defaultProps, ...userProps};
    const buttonInfo = _apiPrivate.getButtonInfoByProps({styleConfig, useProps});
    const {loading, disabled, children, ...leftProps} = useProps;
    return (
        <Wrap
            {...buttonInfo}
            style={StyleSheet.flatten([buttonInfo.wrapStyle, style])}
            disabled={disabled || loading}
            {...wrapProps}
            {...leftProps}
        >
            <Content {...buttonInfo} style={buttonInfo.contentStyle} {...leftProps}>
                {loading ? Loader({...buttonInfo}) : _apiPrivate.renderChildren({
                    Txt,
                    children,
                    Pre,
                    Append,
                    buttonInfo
                })}
            </Content>
        </Wrap>
    )
};

const ButtonPropTypes = {
    /**
     * 不可用状态
     */
    disabled: PropTypes.bool,
    /**
     * loading 状态
     */
    loading: PropTypes.bool,
    /**
     *  按钮等级
     */
    level: PropTypes.oneOf(['default', 'primary', 'secondary', 'warning', 'danger', 'success']),
    /**
     *  按钮大小
     */
    size: PropTypes.oneOfType([
        PropTypes.oneOf(['large', 'default', 'middle', 'small']),
        PropTypes.number
    ]),
    /**
     *  按钮变体
     */
    variant: PropTypes.oneOf(['fill', 'ghost', 'link']),
    /**
     * 胶囊按钮，左右都是圆角的按钮
     */
    capsule: PropTypes.bool,
    /**
     * 纯圆按钮
     */
    circle: PropTypes.bool,
};

NuButton.propTypes = ButtonPropTypes;


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
const createNuButtonTheme = function ({name = "default", ...otherConfig}) {
    const newConfig = mergeDeep(_defaultConfig, otherConfig);
    if (_apiPrivate.isAndroid) {
        newConfig.Wrap = newConfig.WrapAndroid;
    }
    _apiPrivate.themes[name] = newConfig;
};
createNuButtonTheme(_defaultConfig);
export default NuButton;
export {createNuButtonTheme, ButtonPropTypes};
