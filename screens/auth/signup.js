import React from 'react';
import {useNavigation} from '@react-navigation/native';
import { AuthContext } from '../../components/context';
import { 
    Text,
     View,
    StyleSheet,
    SafeAreaView,
    TextInput,
    TouchableOpacity
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather'

export default function SignupScreen(){
    const navigation = useNavigation();
    const {signup} = React.useContext(AuthContext)
    const [data,setData] =React.useState({
        username:'',
        password:'',
        confirmpassword:'',
        checkInputChange:false,
        textSecurity:true,
        textSecurityC:true,
        passwordMatch:false,
        userLength:false,
        passLength:false
   });

   const textInputChange=(val)=>{
       if(val.length >2){
           setData({
               ...data,
               username: val,
               checkInputChange:true,
               userLength:false
           })
       }
       else{
           setData({
               ...data,
               email: val,
               checkInputChange:false,
               userLength:true
           })
       }

   }
   const passHandler=(val)=>{
      if(val.length>2){
        setData({
            ...data,
            password:val,
            passLength:false
        })
      }
      else {
          setData({
              ...data,
              passLength:true
          })
      }
   }
   const passwordVisiblity=()=> {
       setData({
           ...data,
           textSecurity:!data.textSecurity
       })
   }
   const passHandlerC=(val)=>{
    if (val===data.password){
        setData({
            ...data,
            confirmpassword:val,
            passwordMatch:false,
        })
    }
    else{
        setData({
            ...data,
            passwordMatch:true,
        })
    }
}
const passwordVisiblityC=()=> {
    setData({
        ...data,
        textSecurityC:!data.textSecurityC
    })
}

const signupHandler = async (username,password)=>{
    const userData = await signup(username,password)
    navigation.navigate("LoginScreen")
    console.log('--------------userData---------', userData);
}
    return (
        <SafeAreaView style={styles.container}>
    <View style={styles.header}>  
    <Text style={styles.headerText}>Signup.</Text>

    </View>
    <View style={styles.footer}>  
    <View style={{marginTop:20}}>
    <Text style={{fontSize:18}}>Email</Text>
       <View style={styles.containerIn}>
           <FontAwesome name="user-o"
           color="#05375a"
           size={25 } />
           
           <TextInput style={styles.input}
           placeholder="Username"   onChangeText={(val)=>textInputChange(val)}></TextInput>
            {
                data.checkInputChange &&
                <Feather name="check-circle"
           color="green"
           size={25} style={{paddingRight:10}}></Feather>

            }
           
           
           </View>
           {
               data.userLength &&
               <Text style={styles.error}>username must be atleast 3 characters</Text>
           }
    </View>
    <View style={{marginTop:20}}>
    <Text style={{fontSize:18}}>Password</Text>
       <View 
       style={styles.containerIn}
       ><Feather name="lock"
           color="#05375a"
           size={25 } />
           <TextInput style={styles.input}
           placeholder="Password" secureTextEntry={data.textSecurity}
           onChangeText={(val)=>passHandler(val)}
           ></TextInput>
           <TouchableOpacity onPress={()=>passwordVisiblity()}>
           {
               data.textSecurity ?
               <Feather name="eye-off"
           color="black"
           size={25} style={{paddingRight:10}}></Feather> :
           <Feather name="eye"
           color="black"
           size={25} style={{paddingRight:10}}></Feather>
           
           }
           </TouchableOpacity>
           </View>
           {
               data.passLength &&
               <Text style={styles.error}>username must be atleast 3 characters</Text>
           }
    </View>

    <View style={{marginTop:20}}>
    <Text style={{fontSize:18}}>Confirm Password</Text>
       <View 
       style={styles.containerIn}
       ><Feather name="lock"
           color="#05375a"
           size={25 } />
           <TextInput style={styles.input}
           placeholder="Confirm password" secureTextEntry={data.textSecurityC}
           onChangeText={(val)=>passHandlerC(val)}
           ></TextInput>
           <TouchableOpacity onPress={()=>passwordVisiblityC()}>
           {
               data.textSecurityC ?
               <Feather name="eye-off"
           color="black"
           size={25} style={{paddingRight:10}}></Feather> :
           <Feather name="eye"
           color="black"
           size={25} style={{paddingRight:10}}></Feather>
           
           }
           </TouchableOpacity>
           </View>
           {data.passwordMatch &&
           <Text style={styles.error}>Passwords do not match
               </Text>}
    </View>
    <View>
   
           <TouchableOpacity style={styles.button} onPress={()=>{signupHandler(data.username,data.password)}} >
               <Text style={{
                   fontSize:30,alignItems:'center',justifyContent:"center"
               }}>
                 Signup
                   </Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.buttonS} onPress={()=>{navigation.replace("LoginScreen")}}>
               <Text style={{
                   fontSize:30,alignItems:'center',justifyContent:"center"
               }}>
                 Login
                   </Text>
           </TouchableOpacity>
    
    </View>
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
error:{
    color:"#ff0000"
},
header:{
    flex:1,
    justifyContent:'center',
    paddingLeft:34,
    
},
footer:{
    flex:4,
    paddingTop:30,
    paddingLeft:10,
    backgroundColor:"#ffff",
    borderTopLeftRadius:50,
    borderTopRightRadius:50,
},
headerText:{
    fontSize:40,   
},
button:{
    marginTop:40,
    backgroundColor:"#52A7E7",
    width:"100%",
    justifyContent:"center",
    alignItems:'center',
    borderRadius:30
},
buttonS:{
    marginTop:40,
    borderColor:'#52A7E7',
    width:"100%",
    justifyContent:"center",
    alignItems:'center',
    borderRadius:30,
    borderWidth:3
},
containerIn:    {   
    flexDirection:'row',
    marginTop:10,
    borderBottomWidth:1,
    paddingBottom:5
},
input:{
    flex:1,
    marginTop:-12,
    paddingLeft:10
    
}
})