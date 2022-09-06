import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'

import imgCompleteInfomation from '../../assets/welcome/pre-re.png'
import logoOrbita from '../../assets/orbitas.png'

const CompleteInformation = () => {
    return (
        <View style={{ height: '50%' }} >
            <View style={{ flexDirection:'row', alignItems:'center'}} >
                <Image
                    style={{ marginVertical: 10, marginLeft: 10, width: 35, height: 40 }}
                    source={logoOrbita}
                />
                <Text style={{fontSize:25, marginLeft:10}} >gymBE</Text>
            </View>
            <Image
                style={{ width: 360, height: 299 }}
                source={imgCompleteInfomation}
            />

        </View>
    )
}

export default CompleteInformation

const styles = StyleSheet.create({})