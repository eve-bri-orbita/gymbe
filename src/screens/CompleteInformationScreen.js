
import { useState, useEffect } from "react";
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import { Input, NativeBaseProvider, Icon, Text, View, Button } from 'native-base'
import { Image, StyleSheet, TouchableOpacity, ScrollView, TextInput, Platform } from 'react-native'
import { Formik } from 'formik';
import * as yup from 'yup';
import { MaterialIcons, AntDesign } from "@expo/vector-icons"

import CompleteInformation from '../components/login/CompleteInformation'


export default function CompleteInformationScreen() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState(''); 
    useEffect( async () => {
        setName(await AsyncStorage.getItem('name'))
        setEmail(await AsyncStorage.getItem('email'))
      });

    const loginValidationSchema = yup.object().shape({
        email: yup
            .string()
            .email("Por favor introduzca un email válido")
            .required('Se requiere email'),
        password: yup
            .string()
            .required('Se requiere contraseña'),
        confirmPassword:yup 
            .string()
            .required('Confirme contraseña'),
    })

    return (
        <NativeBaseProvider>
            <ScrollView>
                <View style={styles.container} >
                    <CompleteInformation/>
                    <Formik
                        validationSchema={loginValidationSchema}
                        initialValues={{password:'', confirmPassword:'', userType:'' }}
                        onSubmit={values => console.log(values)}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, isValid, errors }) => (

                            <View style={{ height: 250, marginTop: 25, justifyContent: 'space-around' }} >
                                <Input
                                    value={name}
                                    size="2xl"
                                    variant="rounded"
                                    mx="3"
                                    space={4}
                                    placeholder="Nombre"
                                    disabled
                                    w={{
                                        base: "80%",
                                        md: "25%",
                                    }}
                                    en
                                    InputLeftElement={
                                        <Icon
                                            as={<MaterialIcons name="person" />}
                                            size={5}
                                            ml="2"
                                            color="muted.400"
                                        />
                                    }
                                />
                                <Input
                                    value={email}
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
                                <Input
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    type='password'
                                    size="2xl"
                                    variant="rounded"
                                    mx="3"
                                    placeholder="Contraseña"
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
                                <Input
                                    onChangeText={handleChange('confirmPassword')}
                                    onBlur={handleBlur('confirmPassword')}
                                    value={values.confirmPassword}
                                    type='password'
                                    size="2xl"
                                    variant="rounded"
                                    mx="3"
                                    placeholder="Confirmar Contraseña"
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
                                {errors.confirmPassword &&
                                    <Text style={{ marginLeft: 15, fontSize: 10, color: 'red' }}>{errors.confirmPassword}</Text>
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