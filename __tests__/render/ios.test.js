import 'react-native';
import React from 'react';
import NuButton from '../../lib/index';
import {shallow,mount} from 'enzyme';

describe("ios 容器测试",()=>{
    it("ios render correctly",()=>{
        const fb= shallow(<NuButton>default</NuButton>)
        expect(fb.find("Wrap").find("Text").prop("children")).toBe("default")
    })
    it("ios touchopacity",()=>{
        const fb= mount(<NuButton>default</NuButton>)
        expect(fb.find("TouchableOpacity").debug()).not.toBe("")
    })
})