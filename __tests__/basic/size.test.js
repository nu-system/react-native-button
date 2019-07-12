import 'react-native';
import React from 'react';
import NuButton from '../../lib/index';
import {shallow} from 'enzyme';

const wrapSize={
    default:40,
    large: 48,
    middle: 32,
    small: 24
}
const textSize={
    default:16,
    large: 18,
    middle: 14,
    small: 12
}
describe("枚举size属性，判断结果是否正确",()=>{
    // 'large', 'default', 'middle', 'small'
    it(`default 状态`,()=>{
        const tmp= shallow(<NuButton>default</NuButton>)
        const {theme , style, Pre, Append, ...userProps}=tmp.props()
        expect(userProps.wrapStyle.height).toBe(wrapSize.default)
        expect(userProps.textStyle.fontSize).toBe(textSize.default)
    })
    it(`large 状态`,()=>{
        const tmp= shallow(<NuButton size="large">large</NuButton>)
        const {theme , style, Pre, Append, ...userProps}=tmp.props()
        expect(userProps.wrapStyle.height).toBe(wrapSize.large)
        expect(userProps.textStyle.fontSize).toBe(textSize.large)
    })
    it(`middle 状态`,()=>{
        const tmp= shallow(<NuButton size="middle">middle</NuButton>)
        const {theme , style, Pre, Append, ...userProps}=tmp.props()
        expect(userProps.wrapStyle.height).toBe(wrapSize.middle)
        expect(userProps.textStyle.fontSize).toBe(textSize.middle)
    })
    it(`small 状态`,()=>{
        const tmp= shallow(<NuButton size="small">small</NuButton>)
        const {theme , style, Pre, Append, ...userProps}=tmp.props()
        expect(userProps.wrapStyle.height).toBe(wrapSize.small)
        expect(userProps.textStyle.fontSize).toBe(textSize.small)
    })
})
describe("自定义size是可以的，必须是数字",()=>{
    it("custom size is number",()=>{
        const size=40
        const tmp=shallow(<NuButton size={size}>{size}</NuButton>)
        expect(tmp.prop("wrapStyle").height).toBe(size)
    })
    it("custom size is not number",()=>{
        const size="custom"
        const oriError=console.error
        const warningError=new Error("warning")
        console.error=()=>{
            throw warningError
        }
        expect(()=>{<NuButton size={size}>{size}</NuButton>}).toThrowError(warningError)
        console.error=oriError
    })
})
