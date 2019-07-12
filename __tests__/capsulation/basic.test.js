
import 'react-native';
import React from 'react';
import NuButton,{createNuButtonTheme} from '../../lib/index';
import {shallow} from 'enzyme';

// 封装wrapper
const config={
    defaultProps: {
        onPress: () => {
            console.log('you click the button');
        }
    },
    levelColors: {
        default: 'red',
    },
    wrapStyle: {
        h100p: {
            height: 100
        },
        customStyle: function ({style}) {
            style.width = 100;
            return style;
        }
    },
    textStyle: {
        bkg_c_blue:{
            backgroundColor:"blue"
        },
        customStyle: function ({style}) {
            style.color = '#333333';
            return style;
        }
    }
}
createNuButtonTheme(config);

describe("测试二次封装",()=>{
    const props= shallow(<NuButton h100p bkg_c_blue>default</NuButton>).props()
    it(`遍历属性`,()=>{
       expect(props.levelColor).toBe(config.levelColors.default)
    })
    it(`textStyle 自定义 class`,()=>{
        expect(props.textStyle.backgroundColor).toBe("blue")
    })
    it(`textStyle customStyle自定义`,()=>{
        expect(props.textStyle.color).toBe('#333333')
    })
    it(`wrapStyle 自定义 class`,()=>{
        expect(props.wrapStyle.height).toBe(100)
    })
    it(`wrapStyle customStyle自定义`,()=>{
        expect(props.wrapStyle.width).toBe(100)
    })
})