
import 'react-native';
import React from 'react';
import {ActivityIndicator,View,Text} from 'react-native';
import NuButton,{createNuButtonTheme} from '../../lib/index';
import {shallow,mount} from 'enzyme';

// 封装wrapper
const config={
    defaultProps: {
        level: 'primary',
        variant: 'ghost'
    },
    levelColors: {
        default: 'red',
    },
    wrapStyle: {
        h100p: {
            height: 100
        },
        customStyle: function ({style}) {
            style.width = 100;
            return style;
        }
    },
    contentStyle:{
        h80p: {
            height: 80
        },
        customStyle: function ({style}) {
            style.width = 80;
            return style;
        }
    },
    textStyle: {
        bkg_c_blue:{
            backgroundColor:"blue"
        },
        customStyle: function ({style}) {
            style.color = '#333333';
            return style;
        }
    }
}
createNuButtonTheme(config);

describe("测试二次封装默认值",()=>{
    const props= shallow(<NuButton>default</NuButton>).props()
    it(`默认level`,()=>{
        expect(props.level).toBe("primary")
    })
    it(`默认形态`,()=>{
        expect(props.variant).toBe("ghost")
    })
})


describe("测试二次封装",()=>{
    const props= shallow(<NuButton h100p h80p bkg_c_blue>default</NuButton>).props()
    it(`textStyle 自定义 class`,()=>{
        expect(props.textStyle.backgroundColor).toBe("blue")
    })
    it(`textStyle customStyle自定义`,()=>{
        expect(props.textStyle.color).toBe('#333333')
    })
    it(`wrapStyle 自定义 class`,()=>{
        expect(props.wrapStyle.height).toBe(100)
    })
    it(`wrapStyle customStyle自定义`,()=>{
        expect(props.wrapStyle.width).toBe(100)
    })
    it(`contentStyle 自定义 class`,()=>{
        expect(props.contentStyle.height).toBe(80)
    })
    it(`contentStyle customStyle自定义`,()=>{
        expect(props.contentStyle.width).toBe(80)
    })
})

describe("loading",()=>{
    it("loading 二次封装",()=>{
        // 封装wrapper
        const config={
            Loader:()=><ActivityIndicator animating={true} color={'red'}/>
        }
        createNuButtonTheme(config);
        const fb= shallow(<NuButton loading={true}>default</NuButton>)
        expect(fb.contains("Text")).toEqual(false)
        expect(fb.find("ActivityIndicator").prop("color")).toEqual("red")
    })
})

describe("Wrap",()=>{
    it("Wrap 二次封装",()=>{
        // 封装wrapper
        const config={
            Wrap:function ({children, ...otherProps}) {
                return <View WrapCustom={true}  {...otherProps}>{children}</View>;
            },
        }
        createNuButtonTheme(config);
        
        const fb= mount(<NuButton>default</NuButton>)
        expect(fb.find({WrapCustom:true}).exists()).toEqual(true)
    })
})

describe("Content",()=>{
    it("Content 二次封装",()=>{
        // 封装wrapper
        const config={
            Content:function ({children, ...otherProps}) {
                return <View ContentCustom={true}  {...otherProps}>{children}</View>;
            },
        }
        createNuButtonTheme(config);
        
        const fb= mount(<NuButton>default</NuButton>)
        expect(fb.find({ContentCustom:true}).exists()).toEqual(true)
    })
})

describe("Txt",()=>{
    it("Txt 二次封装",()=>{
        // 封装wrapper
        const config={
            Txt:function ({children, ...otherProps}) {
                return <Text>red</Text>;
            },
        }
        createNuButtonTheme(config);
        const fb= mount(<NuButton>default</NuButton>)
        expect(fb.find({children:"red"}).exists()).toEqual(true)
    })
})