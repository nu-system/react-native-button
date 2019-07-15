import 'react-native';
import React from 'react';
import NuButton from '../../lib/index';
import {shallow,mount} from 'enzyme';

jest.mock('Platform', () => {
    const Platform = require.requireActual('Platform');
    Platform.OS = 'android';
    return Platform;
});

describe("android 容器测试",()=>{
    it("android render correctly",()=>{
        const fb= shallow(<NuButton>default</NuButton>)
        expect(fb.find("WrapAndroid").find("Text").prop("children")).toBe("default")
    })
    it("android touchopacity",()=>{
        const fb= mount(<NuButton>default</NuButton>)
        expect(fb.find("TouchableNativeFeedback").debug()||fb.find("DummyTouchableNativeFeedback").debug()).not.toBe("")
    })
})