import React from 'react';
import {useNavigation} from '@react-navigation/native';
import { AuthContext } from '../../components/context';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet

} from 'react-native'

export default function Home(){

    function navigateToList(){
        navigation.navigate("Profile")
    }
    const navigation = useNavigation();
    
    return(
       <View>
            <View>
            <Text>Home</Text>
            <TouchableOpacity style={styles.appButtonContainer} onPress={()=>navigateToList()}>
                <Text style={styles.appButtonText}>list page</Text>
            </TouchableOpacity>
        </View>
        
       </View>
    )
}

const styles = StyleSheet.create({
    appButtonContainer: {
        elevation: 8,
        backgroundColor: "#009688",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12
        
      },
      appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
      }
})