import React, { Component } from 'react';
import {StyleSheet, Animated} from 'react-native';
import{Container,Content,Text,View,Spinner} from 'native-base';

/*
* @images
*/
import Logo from '../images/Logo.png';
import Landing from '../images/Landing.png';
import { Actions } from 'react-native-router-flux';


class AnimateScene extends Component{
    constructor(props){
        super(props);

        this.state = {
            LogoAnime : new Animated.Value(0),
            LandingAnime: new Animated.Value(0),
            ISpinner: new Animated.Value(0),
        }
    }
    componentDidMount(){
        const {LogoAnime, LandingAnime, ISpinner} = this.state;

        Animated.parallel([
            Animated.spring(LogoAnime,{
                toValue: 1,
                tension: 10,
                friction: 2,
                duration: 700,
            }).start(),

            Animated.timing(LandingAnime, {
                toValue: 1,
                duration: 900,
             }).start(() => {
                Animated.spring(ISpinner,{
                    toValue: 1,
                    tension: 10,
                    duration: 3000,
                }).start(()=> Actions.replace('chatroom'));
            })
            .start(),
        ]) 
    }
    render(){
        const {LogoAnime,LandingAnime,ISpinner}=this.state;
        return(
            <Container style={styles.container}>
                <Content style={styles.content}>
                    <Animated.View style={[
                        {
                            opacity: LogoAnime,
                            top: LogoAnime.interpolate({
                                inputRange: [0,1],
                                outputRange:[1,0],
                            }),
                            left: LogoAnime.interpolate({
                                inputRange:[0,1],
                                outputRange:[-10,0],
                            }),
                        }, styles.logoTop
                    ]}>
                        <Image source ={Logo}/>
                    </Animated.View>

                    <Animated.View style={[{opacity: LandingAnime}, styles.Landing]}>
                        <Image source={Landing}/>
                    </Animated.View>

                    <Animated.View style={[
                        {
                            opacity:ISpinner,
                            bottom: ISpinner.interpolate({
                                inputRange:[0,1],
                                outputRange: [-20,0],
                            }),
                        },
                       ]}>
                           <Spinner color='#29AFA0'/>
                       </Animated.View>
                </Content>
            </Container>
        )
    }
}

export default AnimateScene;

const styles = StyleSheet.create({
    container:{
        width: '100%',
        flex: 1,
        position: 'relative',
        backgroundColor: '#ffffff',
    },
    content:{
        flex: 1,
        width:'100%',   
    },
    logoTop:{
        marginBottom: 20,
        marginTop: 65,
        alignItems: 'center',
    },
    Landing:{
        marginTop: 55,
        alignItems: 'center',
    },
    Spinner:{
        marginTop: 50,
        alignItems:'center',
    }
})