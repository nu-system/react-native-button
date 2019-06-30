import React, {Fragment} from 'react';
import {Text, View, ActivityIndicator, TouchableNativeFeedback, TouchableOpacity, Platform} from 'react-native';
import PropTypes from 'prop-types';
import mergeDeep from "./mergeDeep.js";

/**
 *
 * [私有接口]
 * @private
 */
const _apiPrivate = {
    isAndroid: Platform.OS === "android",
    themes: {},
    getButtonInfoByProps: function ({level, variant, levelColors, wrapStyle, textStyle, size, circle, defaultBoolProps}) {
        const styleProps = {...defaultBoolProps};
        styleProps[variant] = true;
        if (level !== 'default') {
            styleProps[level] = true;
        }
        if (size) {
            styleProps[size] = true;
        }

        let wrapDefault = {...wrapStyle.default};
        let textDefault = {...textStyle.default};

        /**
         * 添加自定义属性样式
         */
        Object.keys(styleProps).map((item) => {
            if (wrapStyle[item]) {
                wrapDefault = {...wrapDefault, ...wrapStyle[item]};
            }
            if (textStyle[item]) {
                textDefault = {...textDefault, ...textStyle[item]};
            }
        });

        // 确认主题色
        if (circle) {
            wrapDefault.width = wrapDefault.height;
        }


        let levelColor = levelColors[level];
        // 创建预先设置的样式
        if (variant === 'fill') {
            wrapDefault.backgroundColor = levelColor;
        } else if (variant === 'ghost') {
            wrapDefault.borderColor = levelColor;
            textDefault.color = levelColor;
        } else if (variant === 'flat') {
            textDefault.color = levelColor;
        }

        if (typeof wrapStyle.customStyle === 'function') {
            wrapDefault = wrapStyle.customStyle({
                level,
                levelColor,
                variant,
                styles: wrapDefault
            }) || wrapDefault;
        }
        if (typeof textStyle.customStyle === 'function') {
            textDefault = textStyle.customStyle({
                level,
                levelColor,
                variant,
                styles: textDefault
            }) || textDefault;
        }
        return {
            wrapStyle: {...wrapDefault},
            textStyle: {...textDefault}
        };
    },
    renderChildren: function ({buttonInfo, Txt, Pre, Append, children}) {
        if (typeof children === 'string' || typeof children === 'number') {
            return (
                <Fragment>
                    {typeof Pre === 'function' ? Pre({...buttonInfo}) : Pre}
                    <Txt {...buttonInfo} style={buttonInfo.textStyle}>{children}</Txt>
                    {typeof Append === 'function' ? Append({...buttonInfo}) : Append}
                </Fragment>
            );
        }
        if (typeof children === "function") {
            return children({...buttonInfo});
        }
        return children;
    }
};

/**
 * [默认配置]
 * @private
 */
const _defaultConfig = {
    defaultLevel: 'default',
    defaultVariant: 'fill',
    defaultBoolProps: {},
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
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    Content: View,
    Wrap: _apiPrivate.isAndroid ? TouchableNativeFeedback : TouchableOpacity,
    wrapProps: _apiPrivate.isAndroid ? {
        activeOpacity: 0.6,
    } : {
        background: TouchableNativeFeedback.SelectableBackground()
    },
    Loader: function ({textStyle}) {
        return (<ActivityIndicator animating={true} color={textStyle.color}/>);
    },
    Txt: Text
};

const NuButton = function ({theme = 'default', Pre, Append, size, loading, circle, disabled, capsule, children, ...otherProps}) {
    const _config = _apiPrivate.themes[theme] ? _apiPrivate.themes[theme] : _apiPrivate.themes.default;
    const {Wrap, wrapProps, Loader, Content, Txt, defaultLevel, defaultVariant, ...newConfig} = _config;
    const level = otherProps.level || defaultLevel;
    const variant = otherProps.variant || defaultVariant;
    const {wrapStyle, textStyle} = _apiPrivate.getButtonInfoByProps({level, variant, size, circle, ...newConfig});
    const buttonInfo = {level, variant, wrapStyle, textStyle};
    return (
        <Wrap
            {...buttonInfo}
            style={wrapStyle}
            disabled={disabled || loading}
            {...otherProps}
        >
            <Content {...buttonInfo} style={_config.contentStyle}>
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
    level: PropTypes.string,
    /**
     *  按钮 daoxiao
     */
    size: PropTypes.string,
    /**
     *  按钮变体
     */
    variant: PropTypes.string,
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
 * @param userConfig
 * @param name
 */
const createNuButtonTheme = function (userConfig, name = 'default') {
    _apiPrivate.themes[name] = mergeDeep(_defaultConfig, userConfig);
};

export default NuButton;
export {createNuButtonTheme, ButtonPropTypes};
