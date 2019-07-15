import 'react-native';
import React from 'react';
import NuButton from '../../lib/index';
import {shallow} from 'enzyme';


describe("默认loading",()=>{
    it(`存在ActivityIndicator`,()=>{
        const tmp= shallow(<NuButton loading></NuButton>)
        expect(tmp.find("ActivityIndicator").debug({ ignoreProps: true })).toMatch('ActivityIndicator');
        expect(tmp.contains("Text")).toEqual(false)
    })
})