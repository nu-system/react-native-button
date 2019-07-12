import 'react-native';
import React from 'react';
import NuButton from '../../lib/index';
import {shallow} from 'enzyme';

describe("children属性",()=>{
    //'default', 'primary', 'secondary', 'warning', 'danger', 'success'
    it(`纯文字`,()=>{
        const tmp= shallow(<NuButton>default</NuButton>).find("Text")
        const {theme , style, Pre, Append, ...userProps}=tmp.props()
        expect(tmp.prop("children")).toBe("default")
    })
    it(`文字+空格+文字`,()=>{
        const tmp= shallow(<NuButton>default red</NuButton>).find("Text")
        const {theme , style, Pre, Append, ...userProps}=tmp.props()
        expect(tmp.prop("children")).toBe("default red")
    })
    it(`文字+变量`,()=>{
        const red="red";
        const tmp= shallow(<NuButton>default {red} {red}</NuButton>).find("Text")
        const {theme , style, Pre, Append, ...userProps}=tmp.props()
        expect(tmp.prop("children").length).toBe(3)
    })
})
