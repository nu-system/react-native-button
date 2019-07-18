import 'react-native';
import React from 'react';
import {Text, View,Platform} from 'react-native';
import NuButton from '../../lib/index';
import {shallow} from 'enzyme';

describe("children属性",()=>{
    //'default', 'primary', 'secondary', 'warning', 'danger', 'success'
    it(`纯文字`,()=>{
        const tmp= shallow(<NuButton>default</NuButton>).find("Text")
        expect(tmp.prop("children")).toBe("default")
    })
    it(`文字+空格+文字`,()=>{
        const tmp= shallow(<NuButton>default red</NuButton>).find("Text")
        expect(tmp.prop("children")).toBe("default red")
    })
    it(`文字+变量`,()=>{
        const red="red";
        const expected = ['default ', red,red];
        const tmp= shallow(<NuButton>default {red} {red}</NuButton>).find("Text")
        expect(tmp.prop("children")).toEqual(expect.arrayContaining(expected))
    })
})
describe("回调函数",()=>{
    const viewStyle={color:"red"}
    const fb= shallow(<NuButton>{(styles) => {
        return (
            <View customStyle={viewStyle}>
                <Text style={styles.textStyle}>切换主题</Text>
            </View>
        );
    }}</NuButton>)
    it(`Text渲染正确`,()=>{
        expect(fb.find("Text").prop("children")).toEqual("切换主题")
    })
    it(`回调textStyle作用到Text上`,()=>{
        expect(fb.prop("textStyle")).toEqual(fb.find("Text").prop("style"))
    })
    it(`自定义style`,()=>{
        expect(fb.find({ customStyle: {color:"red"}}).debug()).not.toBe("")
    })
})
