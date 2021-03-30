import React, { useEffect } from 'react';
import { Text, View,SafeAreaView,StyleSheet ,TextInput, Touchable} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather'
import { TouchableOpacity } from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import { AuthContext } from '../../components/context';
import AsyncStorage from '@react-native-community/async-storage';
import { Linking } from 'react-native';
import {LoginButton,AccessToken} from 'react-native-fbsdk'


export default function LoginScreen(){
    const navigation = useNavigation();

    const url = 'https://153796a3fff7.ngrok.io/api/user'

    const [data,setData] =React.useState({
         username:'',
         password:'',
         checkInputChange:false,
         textSecurity:true,
         usernameLength:false,
         passwordLength:false,
         identity:false,
         
    });
    const {signIn} = React.useContext(AuthContext)
    const {gSignIn} = React.useContext(AuthContext)
    const loginHandle=(username,password)=>{
        if(username.length >2 && password.length>2){
            signIn(username,password);
        }
        if(username.length<2){
            setData({
                ...data,
                usernameLength:true,
            })
        }
        if(password.length<2){
            setData({
                ...data,
                passwordLength:true,
            })
        }
        
    }
    const fbSignin=()=>{
        Linking.openURL(url+'/auth/facebook')
    }
    const googleSignin=()=>{
        Linking.openURL(url+'/auth/google')
    }
    useEffect(() =>
    {
        Linking.addEventListener('url',handleOpenURL)
    },[])
    const handleOpenURL = ({url}) =>{
        if(url){
            var urlArray=url.split("=")
            gSignIn(urlArray[1])
            
            console.log('IFURL+++++++++',urlArray[1])
        }
    }
    const textInputChange=(val)=>{
        if(val.trim().length >2){
            setData({
                ...data,
                username: val,
                checkInputChange:true,
                usernameLength:false
            })
        }
        else{
            setData({
                ...data,
                checkInputChange:false,
                usernameLength:true
            })
        }

    }
    const passHandler=(val)=>{
        if(val.trim().length >2){
            setData({
                ...data,
                password:val,
                passwordLength:false
            })
        }
        else{
            setData({
                ...data,
                passwordLength:true
            })
        }

        
    }
    const passwordVisiblity=()=> {
        setData({
            ...data,
            textSecurity:!data.textSecurity
        })
    }

   return(
        
    <SafeAreaView style={styles.container}>
    <View style={styles.header}>  
    <Text style={styles.headerText}>Welcome.</Text>

    </View>
    <View style={styles.footer}>  
    <View style={{marginTop:20}}>
    <Text style={{fontSize:18}}>Username</Text>
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
               data.usernameLength &&
               <Text style={styles.error}>Username must be atleast 3 characters</Text>
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
               data.passwordLength &&
               <Text style={styles.error}>Password must be atleast 3 characters</Text>
           }
    </View>
     { data.identity && 
        <Text style={styles.error}>
            Username or Password is incorrect
         </Text>
         }
    <View>
    <TouchableOpacity style={styles.button}  onPress={()=>{loginHandle(data.username,data.password)}}>
               <Text style={{
                   fontSize:30,alignItems:'center',justifyContent:"center"
               }}>
                 Login
                   </Text>
           </TouchableOpacity>
    
           <TouchableOpacity style={styles.buttonS} onPress={()=>{navigation.replace("SignupScreen")}}>
               <Text style={{
                   fontSize:30,alignItems:'center',justifyContent:"center"
               }}>
                 Signup
                   </Text>
           </TouchableOpacity>
    </View>
  <View style={{marginTop:40,width:"100%"}}>
      <Text style={{justifyContent:'center',alignItems:'center'}}>Sign in with :</Text>
      <TouchableOpacity style={styles.google} onPress={() => {googleSignin()}}>
          <Text style={{fontSize:20}}>
              Google
          </Text>
          
      </TouchableOpacity>
      <TouchableOpacity style={styles.google} onPress={() => {fbSignin()}}>
          <Text style={{fontSize:20}}>
              Facebook
          </Text>
          
      </TouchableOpacity>
      
  </View>
    </View> 

    
</SafeAreaView>
)
}
const styles = StyleSheet.create({
    google:{
        marginTop:40,
        borderColor:'#52A7E7',
        width:"100%",
        justifyContent:"center",
        alignItems:'center',
        borderRadius:30,
        borderWidth:3
    },
    error:{
        color:"#ff0000"
    },
container:{
    backgroundColor:"#52A7E7",
    height:"100%",
    width:"100%",
    
   
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