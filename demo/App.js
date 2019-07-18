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
            <Row style={{
                marginBottom: 4
            }}>
                <Col span={2}>
                    <Button theme={theme} before={<ActivityIndicator animating={true} color={'red'}/>}>fill</Button>
                </Col>
                <Col span={2}>
                    <Button theme={theme} variant="ghost">Ghost</Button>
                </Col>
                <Col span={2}>
                    <Button theme={theme} variant="link">Link</Button>
                </Col>
            </Row>
            <Row style={{
                marginBottom: 20
            }}>
                <Col span={2}>
                    <Button style={{marginBottom: 4}} theme={theme} level="primary">primary</Button>
                    <Button style={{marginBottom: 4}} theme={theme} level="secondary">secondary</Button>
                    <Button style={{marginBottom: 4}} theme={theme} level="warning">warning</Button>
                    <Button style={{marginBottom: 4}} theme={theme} level="danger">danger</Button>
                    <Button style={{marginBottom: 4}} theme={theme} level="success">success</Button>
                    <Button style={{marginBottom: 4}} theme={theme} capsule>capsule</Button>
                    <Button style={{marginBottom: 4}} theme={theme} loading>default loading</Button>
                    <Button style={{marginBottom: 4}} theme={theme} disabled>disabled</Button>
                    <Button style={{marginBottom: 4}} theme={theme} size="large">large</Button>
                    <Button style={{marginBottom: 4}} theme={theme} size="middle">middle</Button>
                    <Button style={{marginBottom: 4}} theme={theme} size="small">small</Button>
                    <Button style={{marginBottom: 4}} theme={theme} circle>+</Button>
                </Col>
                <Col span={2}>

                    <Button style={{marginBottom: 4}} theme={theme} variant="ghost" level="primary">primary</Button>
                    <Button style={{marginBottom: 4}} theme={theme} variant="ghost" level="secondary">secondary</Button>
                    <Button style={{marginBottom: 4}} theme={theme} variant="ghost" level="warning">warning</Button>
                    <Button style={{marginBottom: 4}} theme={theme} variant="ghost" level="danger">danger</Button>
                    <Button style={{marginBottom: 4}} theme={theme} variant="ghost" level="success">success</Button>
                    <Button style={{marginBottom: 4}} theme={theme} variant="ghost" capsule>capsule2</Button>
                    <Button style={{marginBottom: 4}} theme={theme} variant="ghost" loading>loading</Button>
                    <Button style={{marginBottom: 4}} theme={theme} variant="ghost" disabled>disabled</Button>
                    <Button style={{marginBottom: 4}} theme={theme} variant="ghost" size="large">large</Button>
                    <Button style={{marginBottom: 4}} theme={theme} variant="ghost" size="middle">middle</Button>
                    <Button style={{marginBottom: 4}} theme={theme} variant="ghost" size="small">small</Button>
                    <Button style={{marginBottom: 4}} theme={theme} variant="ghost" circle>+</Button>
                </Col>
                <Col span={2}>
                    <Button style={{marginBottom: 4}} theme={theme} variant="link" level="primary">primary</Button>
                    <Button style={{marginBottom: 4}} theme={theme} variant="link" level="secondary">secondary</Button>
                    <Button style={{marginBottom: 4}} theme={theme} variant="link" level="warning">warning</Button>
                    <Button style={{marginBottom: 4}} theme={theme} variant="link" level="danger">danger</Button>
                    <Button style={{marginBottom: 4}} theme={theme} variant="link" level="success">success</Button>
                    <Button style={{marginBottom: 4}} theme={theme} variant="link" capsule>capsule</Button>
                    <Button style={{marginBottom: 4}} theme={theme} variant="link" loading>loading</Button>
                    <Button style={{marginBottom: 4}} theme={theme} variant="link" disabled>disabled</Button>
                    <Button style={{marginBottom: 4}} theme={theme} variant="link" size="large">large</Button>
                    <Button style={{marginBottom: 4}} theme={theme} variant="link" size="middle">middle</Button>
                    <Button style={{marginBottom: 4}} theme={theme} variant="link" size="small">small</Button>
                    <Button style={{marginBottom: 4}} theme={theme} variant="link">+</Button>
                </Col>
            </Row>
            <Wrap>
                <Button style={{marginBottom: 4}} theme={theme} onPress={() => {
                    setTheme(theme === 'default' ? 'test' : 'default');
                }}>{({textStyle}) => {
                    return (
                        <View>
                            <Text style={textStyle}>切换主题</Text>
                            <Text style={textStyle}>「 {theme} 」</Text>
                        </View>
                    );
                }}</Button>
            </Wrap>
            <View  style={{
                alignItems: 'flex-start'
            }}>
                <View style={{
                    backgroundColor: 'red',
                    height:50
                }}>
                    <Text style={{
                        paddingLeft:10,
                        paddingRight:10
                    }}>asdf</Text>
                </View>
            </View>
            <View  style={{
                alignItems: 'flex-start'
            }}>
                <Button>123</Button>
            </View>

        </View>
    )
};
