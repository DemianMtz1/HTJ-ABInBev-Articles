import React, { useEffect, useRef } from 'react'
import * as SecureStore from 'expo-secure-store';

import { Animated, Image, ImageBackground, View, } from 'react-native';

import header from '../../assets/bg-pattern.jpg';
import logo from '../../assets/at-logo.png';

import { loadingStyles } from './styles/loadingStyles'
export const LoadingScreen = ({navigation}) => {

    const opacityAnim = useRef(new Animated.Value(.5)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence(
                [
                    Animated.timing(opacityAnim, {
                        toValue: 0.5,
                        duration: 500,
                        useNativeDriver: true
                    }),
                    Animated.timing(opacityAnim, {
                        toValue: 1,
                        duration: 500,
                        useNativeDriver: true
                    })
                ]
            )
        ).start()
    }, [])


    useEffect(() => {
        const haveToken = async () => {
            const results = await SecureStore.getItemAsync('token');
            if (!results) {
                navigation.navigate('SignIn')
                return
            }
            navigation.navigate('TabNav')
        }
        setTimeout(()=>{
            haveToken()
        }, 2000)
    }, [])

    return (
        <ImageBackground source={header} style={loadingStyles.containerShape}>
            <Animated.View style={[loadingStyles.headerShape, { opacity: opacityAnim }]}>
                <Image source={logo} style={loadingStyles.shapeImage} />
            </Animated.View>
        </ImageBackground>
    )
}
