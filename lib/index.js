import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Text, View, ActivityIndicator, TouchableNativeFeedback, TouchableOpacity, Platform} from 'react-native';
import mergeDeep from "./mergeDeep.js";

/**
 *
 * [私有接口]
 * @private
 */
const _apiPrivate = {
    isAndroid: Platform.OS === "android",
    themes: {},
    getButtonInfoByProps: function ({level, variant, levelColors, wrapStyle, textStyle, contentStyle, size, circle, capsule, defaultBoolProps, otherProps}) {
        const styleProps = {circle, capsule, ...defaultBoolProps, ...otherProps};
        styleProps[variant] = true;
        if (level !== 'default') {
            styleProps[level] = true;
        }
        if (size) {
            styleProps[size] = true;
        }

        let wrapDefault = {...wrapStyle.default};
        let textDefault = {...textStyle.default};
        let contentDefault = {...contentStyle.default};

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
            if (contentStyle[item]) {
                contentDefault = {...contentDefault, ...contentStyle[item]};
            }
        });


        // 设置正元按钮
        if (circle) {
            wrapDefault.width = wrapDefault.height;
        }
        const levelColor = levelColors[level];
        // 创建预先设置的样式
        if (variant === 'fill') {
            wrapDefault.backgroundColor = levelColor;
        } else if (variant === 'ghost') {
            wrapDefault.borderColor = levelColor;
            textDefault.color = levelColor;
        } else if (variant === 'flat') {
            textDefault.color = levelColor;
        }

        // 自定义按钮
        if (typeof size === 'number') {
            wrapDefault.height = size;
        }

        if (typeof wrapStyle.customStyle === 'function') {
            wrapDefault = wrapStyle.customStyle({
                level,
                levelColor,
                variant,
                style: wrapDefault
            }) || wrapDefault;
        }
        if (typeof textStyle.customStyle === 'function') {
            textDefault = textStyle.customStyle({
                level,
                levelColor,
                variant,
                style: textDefault
            }) || textDefault;
        }

        if (typeof contentStyle.customStyle === 'function') {
            contentDefault = contentStyle.customStyle({
                level,
                levelColor,
                variant,
                style: contentDefault
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
    name: 'default',
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
        default: {
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row'
        }
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
    const buttonInfo = _apiPrivate.getButtonInfoByProps({
        level,
        variant,
        size,
        circle,
        capsule,
        ...newConfig,
        otherProps: otherProps
    });
    return (
        <Wrap
            {...buttonInfo}
            style={buttonInfo.wrapStyle}
            disabled={disabled || loading}
            {...otherProps}
        >
            <Content {...buttonInfo} style={buttonInfo.contentStyle}>
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
    variant: PropTypes.oneOf(['fill', 'ghost', 'flat']),
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
 * @param {object} wrapStyle - 主容器样式
 * @param {object} wrapProps - 主容器样式属性
 * @param {object} Content - 内容器
 * @param {object} contentStyle - 内容器样式
 * @param {object} Txt - 文本容器
 * @param {object} textStyle - 文本容器样式
 * @param {object} Loader - 加载对象
 */
const createNuButtonTheme = function ({name = "default", ...otherConfig}) {
    _apiPrivate.themes[name] = mergeDeep(_defaultConfig, otherConfig);
};

export default NuButton;
export {createNuButtonTheme, ButtonPropTypes};
