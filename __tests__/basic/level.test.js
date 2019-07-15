import 'react-native';
import React from 'react';
import NuButton from '../../lib/index';
import {shallow} from 'enzyme';

const levelColor={
    default: '#343a40',
    primary: '#007bff',
    secondary: '#6c757d',
    warning: '#ffc107',
    danger: '#dc3545',
    success: '#22A745'
}
describe("枚举level属性，判断结果是否正确",()=>{
    //'default', 'primary', 'secondary', 'warning', 'danger', 'success'
    it(`level default`,()=>{
        const tmp= shallow(<NuButton>default</NuButton>)
        const {theme , style, Pre, Append, ...userProps}=tmp.props()
        expect(userProps.levelColor).toBe(levelColor.default)
    })
    it(`level primary`,()=>{
        const tmp= shallow(<NuButton level="primary">primary</NuButton>)
        const {theme , style, Pre, Append, ...userProps}=tmp.props()
        expect(userProps.levelColor).toBe(levelColor.primary)
    })
    it(`level secondary`,()=>{
        const tmp= shallow(<NuButton level="secondary">secondary</NuButton>)
        const {theme , style, Pre, Append, ...userProps}=tmp.props()
        expect(userProps.levelColor).toBe(levelColor.secondary)
    })
    it(`level warning`,()=>{
        const tmp= shallow(<NuButton level="warning">warning</NuButton>)
        const {theme , style, Pre, Append, ...userProps}=tmp.props()
        expect(userProps.levelColor).toBe(levelColor.warning)
    })
    it(`level danger`,()=>{
        const tmp= shallow(<NuButton level="danger">danger</NuButton>)
        const {theme , style, Pre, Append, ...userProps}=tmp.props()
        expect(userProps.levelColor).toBe(levelColor.danger)
    })
    it(`level success`,()=>{
        const tmp= shallow(<NuButton level="success">success</NuButton>)
        const {theme , style, Pre, Append, ...userProps}=tmp.props()
        expect(userProps.levelColor).toBe(levelColor.success)
    })
})
describe("自定义level是不可以的",()=>{
    it("custom level is not allowed",()=>{
        const level="custom"
        const oriError=console.error
        const warningError=new Error("warning")
        console.error=()=>{
            throw warningError
        }
        expect(()=>{<NuButton level={level}>{level}</NuButton>}).toThrowError(warningError)
        console.error=oriError
    })
})