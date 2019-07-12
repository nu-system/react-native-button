import 'react-native';
import React from 'react';
import NuButton from '../../lib/index';
import {shallow} from 'enzyme';


describe("枚举variant属性，判断结果是否正确",()=>{
    it(`default 状态，相当于fill`,()=>{
        const tmp= shallow(<NuButton>default</NuButton>)
        const {theme , style, Pre, Append, ...userProps}=tmp.props()
        expect(userProps.wrapStyle.backgroundColor).toBe(userProps.levelColor)
    })
    it(`fill 状态，背景色等于当前level色`,()=>{
        const tmp= shallow(<NuButton variant="fill">fill</NuButton>)
        const {theme , style, Pre, Append, ...userProps}=tmp.props()
        expect(userProps.wrapStyle.backgroundColor).toBe(userProps.levelColor)
    })
    it(`ghost border和字体颜色等于当前level色`,()=>{
        const tmp= shallow(<NuButton variant="ghost">ghost</NuButton>)
        const {theme , style, Pre, Append, ...userProps}=tmp.props()
        expect(userProps.wrapStyle.borderColor).toBe(userProps.levelColor)
        expect(userProps.textStyle.color).toBe(userProps.levelColor)
    })
    it(`link 字体颜色等于当前level色`,()=>{
        const tmp= shallow(<NuButton variant="ghost">ghost</NuButton>)
        const {theme , style, Pre, Append, ...userProps}=tmp.props()
        expect(userProps.textStyle.color).toBe(userProps.levelColor)
    })
})
describe("自定义variant是不可以的",()=>{
    it("custom variant is not allowed",()=>{
        const variant="custom"
        const oriError=console.error
        const warningError=new Error("warning")
        console.error=()=>{
            throw warningError
        }
        expect(()=>{<NuButton variant={variant}>{variant}</NuButton>}).toThrowError(warningError)
        console.error=oriError
    })
})
