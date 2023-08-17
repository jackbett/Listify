import React from 'react';
import { Text, View, SafeAreaView, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
// import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../components/AuthContext'; 

const LoginScreen = () => {
  // const navigation = useNavigation();
  const  handleLogin  = useAuth(); // Use the handleLogin function from your AuthContext
  console.log(handleLogin)
  return (
    <LinearGradient colors={['#040306', '#131624']} style={{ flex: 1 }}>
      <SafeAreaView>
        <View style={{ height: 80 }} />
        <Text
          style={{
            color: 'white',
            fontSize: 40,
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: 40,
          }}
        >
          Create, Collaborate, Enjoy.
        </Text>

        <View style={{ height: 80 }} />
        <Pressable
          onPress={handleLogin}
          style={{
            backgroundColor: '#1DB954',
            padding: 10,
            marginLeft: 'auto',
            marginRight: 'auto',
            width: 300,
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 10,
          }}
        >
          <Text style={{ color: 'white', fontSize: 16 }}>Login with Spotify</Text>
        </Pressable>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LoginScreen;
