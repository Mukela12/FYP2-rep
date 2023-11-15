import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import firebase from '../config';
import { SignUpScreenOwnerNavigationProp } from '../types';

type Props = {
  navigation: SignUpScreenOwnerNavigationProp;
};

const SignUpScreenOwner: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [businessName, setBusinessName] = useState('');

  const handleSignUp = async () => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
          firebase.auth().currentUser?.sendEmailVerification({
            handleCodeInApp: true,
            url : 'https://fyp2-auth-test.firebaseapp.com',
          })
          .then(() => {
            alert('Verification email sent');
          }).catch((error) => {
            alert(error.message);
          })
          .then(() => {
            firebase.firestore().collection('users')
              .doc(firebase.auth().currentUser?.uid)
              .set({
                businessName,
                email,
              });
          }).catch((error) => {
            alert(error.message);
          });
        })
        .catch((error) => {
          alert(error.message);
        });
      // Navigate to Home Screen upon successful sign up
      navigation.navigate('HomeStore');
    } catch (error) {
      console.error(error);
      alert('Account creation failed!');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Edu Owners Sign Up</Text>
        
        <TextInput
          placeholder="Store Name"
          onChangeText={setBusinessName}
          autoCapitalize="none"
          style={styles.input}
        />

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType='email-address'
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          autoCapitalize="none"
          style={styles.input}
        />

        <TouchableOpacity onPress={handleSignUp} style={styles.button}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <Text 
          onPress={() => navigation.navigate('LoginOwner')}
          style={styles.loginText}>
          Already have an account? Login
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F6F6F6',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#FFF',
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 5,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginButton: {
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
  loginText: {
    marginTop: 15,
    color: '#007bff',
    textAlign: 'center',
  },
});

export default SignUpScreenOwner;


