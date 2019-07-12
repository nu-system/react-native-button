import 'react-native';
import React from 'react';
import NuButton from '../../lib/index';
import {shallow} from 'enzyme';

describe("capsule有效",()=>{
    it(`borderRadius100`,()=>{
        const style= shallow(<NuButton capsule></NuButton>).prop("wrapStyle")
        expect(style.borderRadius).toBe(100)  
    })
})
describe("circle有效",()=>{
    it(`borderRadius100，宽=高`,()=>{
        const style= shallow(<NuButton circle></NuButton>).prop("wrapStyle")
        expect(style.height).toBe(style.width)
        expect(style.borderRadius).toBe(100)  
    })
})
describe("disabled有效",()=>{
    it(`透明度为0.4`,()=>{
        const style= shallow(<NuButton disabled></NuButton>).prop("wrapStyle")
        expect(style).toHaveProperty("opacity")
    })
})

describe("自定义style",()=>{
    it(`style有效`,()=>{
        const style= shallow(<NuButton style={{marginBottom: 4}}></NuButton>).prop("style")
        expect(style).toHaveProperty("marginBottom")
    })
})