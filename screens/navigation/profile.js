import React from 'react';
import {useNavigation} from '@react-navigation/native';

import { AuthContext } from './../../components/context';
import {
    View,Text,StyleSheet,TouchableOpacity
} from 'react-native'

export default function Profile(){
    const navigation = useNavigation();
    const {signOut} = React.useContext(AuthContext)
     
    
    return(
        <View>
        
        <TouchableOpacity style={styles.button} onPress={()=>signOut()}> 
            <Text style={styles.text}> Logout</Text>
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