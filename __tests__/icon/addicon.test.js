import 'react-native';
import React from 'react';
import { ActivityIndicator} from 'react-native';
import NuButton,{createNuButtonTheme} from '../../lib/index';
import {shallow,mount} from 'enzyme';

describe("头部加icon",()=>{
    it("icon render correctly",()=>{
        const str="ActivityIndicator Text"
        const fb= shallow(<NuButton Pre={<ActivityIndicator animating={true} color={'red'}/>}>default</NuButton>
        )
       let arr=fb.find("View").find({level:"default"}).prop("children").props.children
       expect(arr.map(element => {
         return element?element.type.displayName:""
       }).join(" ")).toEqual(expect.stringContaining(str))
    })
    it("function render correctly",()=>{
      const str="ActivityIndicator Text"
      const fb= shallow(<NuButton Pre={()=>{return <ActivityIndicator animating={true} color={'blue'}/>}}>default</NuButton>
      )
      let arr=fb.find("View").find({level:"default"}).prop("children").props.children
      expect(arr.map(element => {
        return element?element.type.displayName:""
      }).join(" ")).toEqual(expect.stringContaining(str))
    })
})


describe("尾部部加icon",()=>{
    it("icon render correctly",()=>{
        const str="Text ActivityIndicator"
        const fb= shallow(<NuButton Append={<ActivityIndicator animating={true} color={'red'}/>}>default</NuButton>
        )
       let arr=fb.find("View").find({level:"default"}).prop("children").props.children
       expect(arr.map(element => {
        return element?element.type.displayName:""
      }).join(" ")).toEqual(expect.stringContaining(str))
    })
    it("function render correctly",()=>{
      const str="Text ActivityIndicator"
      const fb= shallow(<NuButton Append={()=>{return <ActivityIndicator animating={true} color={'blue'}/>}}>default</NuButton>
      )
     let arr=fb.find("View").find({level:"default"}).prop("children").props.children
     expect(arr.map(element => {
      return element?element.type.displayName:""
    }).join(" ")).toEqual(expect.stringContaining(str))
  })
})