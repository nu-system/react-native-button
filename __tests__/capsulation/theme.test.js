
import 'react-native';
import React from 'react';
import {ActivityIndicator,View,Text} from 'react-native';
import NuButton,{createNuButtonTheme} from '../../lib/index';
import {shallow,mount} from 'enzyme';

// 封装wrapper
const config={
    name:"test",
    textStyle: {
        bkg_c_blue:{
            backgroundColor:"blue"
        }
    }
}
createNuButtonTheme(config);

const config2={
    name:"test2",
    textStyle: {
        bkg_c_red:{
            backgroundColor:"red"
        }
    }
}
createNuButtonTheme(config2);

describe("测试二次封装",()=>{
    const props= shallow(<NuButton bkg_c_blue>default</NuButton>).props()
    it(`textStyle 自定义 class`,()=>{
        expect(props.textStyle.backgroundColor).not.toBe("blue")
    })
    const propsTheme= shallow(<NuButton theme="test" bkg_c_blue bkg_c_red>default</NuButton>).props()
    it(`textStyle 自定义 class`,()=>{
        expect(propsTheme.textStyle.backgroundColor).toBe("blue")
        expect(propsTheme.textStyle.backgroundColor).not.toBe("red")
    })
    const propsTheme2= shallow(<NuButton theme="test2" bkg_c_blue bkg_c_red>default</NuButton>).props()
    it(`textStyle 自定义 class`,()=>{
        expect(propsTheme2.textStyle.backgroundColor).toBe("red")
        expect(propsTheme2.textStyle.backgroundColor).not.toBe("blue")
    })
})
