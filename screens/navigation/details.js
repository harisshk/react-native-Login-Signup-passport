import React from 'react';
import {useNavigation} from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import {
    StyleSheet,View,Text
} from 'react-native'
export default function Details(){
    const navigation = useNavigation();
    function navigateToBack(){
        navigation.goBack("Profile");
    }
    
    return (
        <View>
            <Text>Details</Text>
            <TouchableOpacity style={styles.button} onPress={()=>navigateToBack()}> 
                <Text style={styles.text}> Back</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    button:{
        elevation: 8,
        backgroundColor: "#009688",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12
    },
    text:{
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    }
})