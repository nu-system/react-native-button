import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableHighlight, Image, ActivityIndicator} from 'react-native';
import {Row, Col, Wrap} from "./components/Grid/index.js";
import Button from "./components/Button/index.js";

const styles = StyleSheet.create({
    col: {
        backgroundColor: '#ff0000'
    }
});

export default function App() {
    const [theme, setTheme] = useState('default');
    return (
        <View style={{
            height: '100%'
        }}>
            <Text>Hello world</Text>
            <View style={{height: 50}}/>
            {/*<Wrap>*/}
            {/*    <Text style={styles.col}>Open up App.js to start</Text>*/}
            {/*</Wrap>*/}
            {/*<Row>*/}
            {/*    <Col span={1}><Text style={styles.col}>1</Text></Col>*/}
            {/*    <Col span={1}><Text style={styles.col}>2</Text></Col>*/}
            {/*    <Col span={1}><Text style={styles.col}>3</Text></Col>*/}
            {/*    <Col span={1}><Text style={styles.col}>4</Text></Col>*/}
            {/*    <Col span={1}><Text style={styles.col}>5</Text></Col>*/}
            {/*    <Col span={1}><Text style={styles.col}>6</Text></Col>*/}
            {/*</Row>*/}
            {/*<Row>*/}
            {/*    <Col span={2}><Text style={styles.col}>Hello1</Text></Col>*/}
            {/*    <Col span={2} offset={2}><Text style={styles.col}>Hello2</Text></Col>*/}
            {/*    <Col span={4} widthToInt><Text style={styles.col}>Hello1</Text></Col>*/}
            {/*    <Col span={2}><Text style={styles.col}>Hello1</Text></Col>*/}
            {/*    <Col span={4}><Text style={styles.col}>Hello1</Text></Col>*/}
            {/*    <Col span={2}><Text style={styles.col}>Hello1</Text></Col>*/}
            {/*</Row>*/}
            {/*<Row>*/}
            {/*    <Col span={3}><Text style={styles.col}>Hello1</Text></Col>*/}
            {/*    <Col span={3}><Text style={styles.col}>Hello2</Text></Col>*/}
            {/*</Row>*/}
            <View style={{height: 4}}/>
            <Row style={{
                marginBottom: 40
            }}>
                <Col span={2}>
                    <Button theme={theme} Pre={<ActivityIndicator animating={true} color={'red'}/>}>fill</Button>
                    <View style={{height: 4}}/>
                    <Button theme={theme} level="primary">primary</Button>
                    <View style={{height: 4}}/>
                    <Button theme={theme} level="secondary">secondary</Button>
                    <View style={{height: 4}}/>
                    <Button theme={theme} level="warning">warning</Button>
                    <View style={{height: 4}}/>
                    <Button theme={theme} level="danger">danger</Button>
                    <View style={{height: 4}}/>
                    <Button theme={theme} level="success">success</Button>
                    <View style={{height: 4}}/>
                    <Button theme={theme} capsule>capsule</Button>
                    <View style={{height: 4}}/>
                    <Button theme={theme} loading>default loading</Button>
                    <View style={{height: 4}}/>
                    <Button theme={theme} disabled>disabled</Button>
                    <View style={{height: 4}}/>
                    <Button theme={theme} size="large">large</Button>
                    <View style={{height: 4}}/>
                    <Button theme={theme} size="middle">middle</Button>
                    <View style={{height: 4}}/>
                    <Button theme={theme} size="small">small</Button>
                    <View style={{height: 4}}/>
                    <Button theme={theme} circle>+</Button>
                </Col>
                <Col span={2}>
                    <Button theme={theme} variant="ghost">Ghost</Button>
                    <View style={{height: 4}}/>
                    <Button theme={theme} variant="ghost" level="primary">primary</Button>
                    <View style={{height: 4}}/>
                    <Button theme={theme} variant="ghost" level="secondary">secondary</Button>
                    <View style={{height: 4}}/>
                    <Button theme={theme} variant="ghost" level="warning">warning</Button>
                    <View style={{height: 4}}/>
                    <Button theme={theme} variant="ghost" level="danger">danger</Button>
                    <View style={{height: 4}}/>
                    <Button theme={theme} variant="ghost" level="success">success</Button>
                    <View style={{height: 4}}/>
                    <Button theme={theme} variant="ghost" capsule>capsule</Button>
                    <View style={{height: 4}}/>
                    <Button theme={theme} variant="ghost" loading>loading</Button>
                    <View style={{height: 4}}/>
                    <Button theme={theme} variant="ghost" disabled>disabled</Button>
                    <View style={{height: 4}}/>
                    <Button theme={theme} variant="ghost" size="large">large</Button>
                    <View style={{height: 4}}/>
                    <Button theme={theme} variant="ghost" size="middle">middle</Button>
                    <View style={{height: 4}}/>
                    <Button theme={theme} variant="ghost" size="small">small</Button>
                    <View style={{height: 4}}/>
                    <Button theme={theme} variant="ghost" circle>+</Button>
                </Col>
                <Col span={2}>
                    <Button theme={theme} variant="link">Link</Button>
                    <View style={{height: 4}}/>
                    <Button theme={theme} variant="link" level="primary">primary</Button>
                    <View style={{height: 4}}/>
                    <Button theme={theme} variant="link" level="secondary">secondary</Button>
                    <View style={{height: 4}}/>
                    <Button theme={theme} variant="link" level="warning">warning</Button>
                    <View style={{height: 4}}/>
                    <Button theme={theme} variant="link" level="danger">danger</Button>
                    <View style={{height: 4}}/>
                    <Button theme={theme} variant="link" level="success">success</Button>
                    <View style={{height: 4}}/>
                    <Button theme={theme} variant="link" capsule>capsule</Button>
                    <View style={{height: 4}}/>
                    <Button theme={theme} variant="link" loading>loading</Button>
                    <View style={{height: 4}}/>
                    <Button theme={theme} variant="link" disabled>disabled</Button>
                    <View style={{height: 4}}/>
                    <Button theme={theme} variant="link" size="large">large</Button>
                    <View style={{height: 4}}/>
                    <Button theme={theme} variant="link" size="middle">middle</Button>
                    <View style={{height: 4}}/>
                    <Button theme={theme} variant="link" size="small">small</Button>
                    <View style={{height: 4}}/>
                    <Button theme={theme} variant="link">+</Button>
                </Col>
            </Row>
            <View style={{height: 4}}/>
            <Wrap>
                <Button theme={theme} onPress={() => {
                    setTheme(theme === 'default' ? 'test' : 'default');
                }}>{({textStyle})=>{
                    return <Text style={textStyle}>切换主题 「 {theme} 」</Text>;
                }}</Button>
            </Wrap>
        </View>
    )
};
