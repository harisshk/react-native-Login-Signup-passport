import React from 'react';
import { StyleSheet, Text, View ,Image,TouchableOpacity, Touchable} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import {useNavigation} from '@react-navigation/native';


export default function SplashScreen(){
    const navigation = useNavigation();
   
        setTimeout(() => {
            navigation.replace("LoginScreen")
        }, 1000)
    
  return(
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>  
        <Text style={styles.headerText}> Welcome to the App</Text>

        </View>
        <View style={styles.footer}>  
           <TouchableOpacity style={styles.button} >
               <Text style={{
                   fontSize:30,alignItems:'center',justifyContent:"center"
               }}>
                 wait to
                   </Text>
           </TouchableOpacity>
        </View>
        
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:"#52A7E7",
        height:"100%",
        width:"100%",
        
       
    },
    header:{
        flex:2,
        justifyContent:'center',
        
        alignItems:'center',
        
    },
    footer:{
        flex:1,
        justifyContent:'center',
        backgroundColor:"#ffff",
        borderTopLeftRadius:50,
        borderTopRightRadius:50,
        alignItems:'center',
    },
    headerText:{
        fontSize:40,
        
    },
    button:{
        backgroundColor:"#52A7E7",
        width:"50%",
        justifyContent:"center",
        alignItems:'center',
        borderRadius:30
    }
})