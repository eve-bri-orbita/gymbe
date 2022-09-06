import { Input, NativeBaseProvider, Icon, Text, View, Button } from 'native-base'
import { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons, AntDesign } from "@expo/vector-icons"
import { Image, StyleSheet, TouchableOpacity, ScrollView, TextInput, Platform } from 'react-native'
import { Formik } from 'formik';
import * as yup from 'yup';
import Welcome from '../components/login/Welcome'
import * as Google from 'expo-google-app-auth';
//import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {firebase} from '../db/firebase.js';
import { getUsersByOneParameter, saveUser } from '../api/userApi.js'

export default function LoginScreen() {

    const navegation = useNavigation()
    //const storage = AsyncStorage()
    const [typeDivice, setTypeDivice] = useState("");
    const [user, setUser] = useState();
    const [resultLogIn, setResultLogIn] = useState("");
    useEffect(() => {
        setTypeDivice(Platform.OS)
        firebase.auth().onAuthStateChanged(async (user)=> {
                if(user){
                    console.log(user)
                    navegation.navigate('HomeScreen')
                }
            }
        )
      });
    

    const loginValidationSchema = yup.object().shape({
        email: yup
            .string()
            .email("Por favor introduzca un email válido")
            .required('Se requiere email'),
        password: yup
            .string()
            .required('Se requiere contraseña'),
    })

    sigInWithAndroid= async () =>{
        const result = await Google.logInAsync({
            behavior: 'web',
            androidClientId: '78048458976-lq1b57fq645predvei1qhqd5fsbqne8d.apps.googleusercontent.com',
            scopes: ['profile', 'email'],
        });
        setUser(result.user)
        setResultLogIn(result.type)
    }
    sigInWithIOS = async () =>{
        const result = await Google.logInAsync({
            behavior: 'web',
            iosClientId: '78048458976-frl92v24nm2loj7lvbp4d5q1plf9qu7n.apps.googleusercontent.com',
            scopes: ['profile', 'email'],
          });
          setUser(result.user)
          setResultLogIn(result.type)
    }

    signInWithGoogleAsync = async () => {

        
        try {
            if(typeDivice === 'android'){
                await sigInWithAndroid();
            }else{
                await sigInWithIOS();
            }
            if (resultLogIn === 'success') {
                var users = await getUsersByOneParameter('email',user.email)
                await AsyncStorage.setItem('name', user.name);
                await AsyncStorage.setItem('email', user.email);
                await AsyncStorage.setItem('photo', user.photoUrl);
                if(users.length > 0){
                    if(users[0].state > 1){
                        await AsyncStorage.setItem('id', users[0].id);
                        navegation.navigate('HomeScreen')
                    }else{
                        navegation.navigate('CompleteInformationScreen')
                    }
                }else{
                    var result = await saveUser(user.name, user.name, user.id, user.email, user.photoUrl, 1, 'User')
                    if(result){
                        navegation.navigate('CompleteInformationScreen')
                    }else{
                        navegation.navigate('LoginScreen')
                    }
                }
            } else {
                return { cancelled: true };
            }
        } catch (e) {
            console.log(e)
            return { error: true };
        }
        
    }

    return (
        <NativeBaseProvider>
            <ScrollView>
                <View style={styles.container} >
                    <Welcome />
                    <Formik
                        validationSchema={loginValidationSchema}
                        initialValues={{ email: '', password: '' }}
                        onSubmit={values => console.log(values)}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, isValid, errors }) => (

                            <View style={{ height: 250, marginTop: 25, justifyContent: 'space-around' }} >
                                <Input
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    keyboardType='email-address'
                                    size="2xl"
                                    variant="rounded"
                                    mx="3"
                                    space={4}
                                    placeholder="Correo"
                                    w={{
                                        base: "80%",
                                        md: "25%",
                                    }}
                                    InputLeftElement={
                                        <Icon
                                            as={<MaterialIcons name="person" />}
                                            size={5}
                                            ml="2"
                                            color="muted.400"
                                        />
                                    }
                                />
                                {errors.email &&
                                    <Text style={{ marginLeft: 15, fontSize: 10, color: 'red' }}>{errors.email}</Text>
                                }
                                <Input
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    type='password'
                                    size="2xl"
                                    variant="rounded"
                                    mx="3"
                                    placeholder="contraseña"
                                    w={{
                                        base: "80%",
                                        md: "25%",
                                    }}
                                    InputLeftElement={
                                        <Icon
                                            as={<MaterialIcons name="lock" />}
                                            size={5}
                                            ml="2"
                                            color="muted.400"
                                        />
                                    }
                                />
                                {errors.password &&
                                    <Text style={{ marginLeft: 15, fontSize: 10, color: 'red' }}>{errors.password}</Text>
                                }

                                <View style={{ alignItems: 'center' }} >
                                    <Button
                                        disabled={!isValid}
                                        onPress={handleSubmit}
                                        width={'90%'}
                                        height={50}
                                        leftIcon={<AntDesign name="arrowright" size={30} color="white" />}
                                        colorScheme="blue"
                                    >
                                    </Button>
                                </View>

                            </View>

                        )}
                    </Formik>


                    <Text>O inicia con... </Text>

                    <View style={styles.socialContainer} >
                        <TouchableOpacity>
                            <Image
                                style={{ width: 50, height: 50 }}
                                source={require('../assets/icons/facebook.png')}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => signInWithGoogleAsync()}>
                            <Image
                                style={{ width: 50, height: 50 }}
                                source={require('../assets/icons/google.png')}
                            />
                        </TouchableOpacity>
                    </View>

                    <Text>¿Aun no tiene una cuenta?
                        <Text
                            style={{ color: 'blue' }}
                            onPress={() => navegation.navigate('RegisterScreen')}
                        > Registrarse
                        </Text>
                    </Text>

                </View>
            </ScrollView>
        </NativeBaseProvider>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    socialContainer: {
        flex: 1,
        marginTop: 10,
        width: '70%',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }
})
