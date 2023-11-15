import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import firebase from '../config'; // Ensure this points to your Firebase config file
import { SignUpScreenNavigationProp } from '../types'; // Ensure this points to your types file
import { sendEmail } from '../send-email'; // Ensure this points to your send-email file

type Props = {
  navigation: SignUpScreenNavigationProp;
};

const SignUpScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');

  const handleSignUp = async () => {
    try {
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      
      if (userCredential.user) {
        const userId = userCredential.user.uid;
        await firebase.firestore().collection('users').doc(userId).set({
          firstname,
          lastname,
          email,
        });

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Send request to your server to send the email

        try {

          await sendEmail(
            email,
            'Your OTP',
            `Hi ${firstname}, your OTP is: ${otp}`
          );

          console.log('Email intent opened!');

          alert('Verification email sent');
            
          navigation.navigate('OtpVerificationscreen', { userId: userId, otp: otp });

        } catch (error) {
          console.error('Error sending email:', error);
        }
      } else {
        throw new Error('User creation failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Account creation failed: ');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="First Name"
        value={firstname}
        onChangeText={setFirstName}
        autoCapitalize="none"
        style={styles.input}
      />

      <TextInput
        placeholder="Last Name"
        value={lastname}
        onChangeText={setLastName}
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

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  input: {
    backgroundColor: '#FFF',
    borderColor: '#DDD',
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
  loginText: {
    marginTop: 15,
    color: '#007AFF',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default SignUpScreen;
