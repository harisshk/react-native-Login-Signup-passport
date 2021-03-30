import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStackContainer from './screens/auth/rootAuth'
import HomeContainer from './screens/navigation/index'; 
import AsyncStorage from '@react-native-community/async-storage'
import { AuthContext} from './components/context'
import{
  View,
  ActivityIndicator
 } from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const App = () => {
  const url = 'https://153796a3fff7.ngrok.io/api/user'
// Reducer 

const   initialLoginState={
    isLoading:true,
    userName:null,
    userTokken:null
  };
 const loginReducer = (prevState,action)=>{
   switch(action.type){
    case 'CHECKLOGIN':
      return{
        ...prevState,
        userToken:action.token,
        isLoading:false
      };
     case 'LOGIN':
       return{
        ...prevState,
        userName:action.id,
        userToken:action.token,
        isLoading:false
       };
       case 'LOGOUT':
        return{
          ...prevState,
          userName:null,
        userToken:null,
          isLoading:false
        };
        case 'REGISTER':
       return{
        ...prevState,
        isLoading:false,
        userName:action.id,
        userToken:action.token,
       };
       case 'GOOGLELOGIN':
         return{
           ...prevState,
           userToken:action.token,
           isLoading:false,
           
         }
   }
 };

 const [loginState,dispatch] = React.useReducer(loginReducer,initialLoginState)

  const authContext = React.useMemo( ()=>({
    gSignIn:async(tokens) =>{
      AsyncStorage.setItem('userToken',tokens)
      console.log('-------------token----',tokens)
      dispatch({type:"GOOGLELOGIN",token:tokens})
    },
    signIn:async(userName,password) => {
      let userToken;
      userToken=null;
      // console.log("Uer",userName);
      // console.log("Pass",password);
    

      const vsl = axios.post(url+'/login',{
        username: userName,
        password: password
      })
      .then(function (response) {
        let tokenS=JSON.stringify(response["data"]['token'])
        let userLoged=JSON.stringify(response["data"]['username'])
        // console.log("[][][][username",userLoged)
        AsyncStorage.setItem('userToken',tokenS)
        AsyncStorage.setItem('userName',userLoged)
          dispatch({type:"LOGIN",id:userLoged,token:tokenS})
          return "sucess"
      })
      .catch(function (error) {
        alert(error.message)
      });
      console.log(vsl)
    },
    signOut:async() => {
      try{
        userToken =await AsyncStorage.removeItem('userToken')
      }
      catch(err){
        console.log(err)
      }
      dispatch({type:"LOGOUT"})
    },
    signup:async(username,password) =>{
      const user={
        username: username,
        password: password
      }
      console.log(axios)
      axios.post(url+'/register', user
      ).then(function(response){
        console.log(
        '-----------Respomse---------', response
        )
        return response.data
        
      })
      .catch(function (error) {
        console.log("error",error)
        console.log("user",user)
      });
    }

  }),[])
  useEffect(() =>{
    setTimeout(async() => {
      let userToken=null
      try{
        userToken =await AsyncStorage.getItem('userToken')
      }
      catch(err){
        console.log(err)
      }
      dispatch({ type:"CHECKLOGIN",token:userToken})
    },1000);
  },[])
  if(loginState.isLoading){
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large" color="#0000ff"></ActivityIndicator>
      </View>
    )
  }
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer >
        {
          loginState.userToken !== null ?
            <HomeContainer /> 
        :
        <AuthStackContainer />
}
     
    </NavigationContainer>

    </AuthContext.Provider>
  );
};

export default App;
