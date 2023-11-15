import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types'; // Update the import path as necessary

type OtpVerificationScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
  route: any; // Consider using a more specific type for route parameters
};

const OtpVerificationScreen: React.FC<OtpVerificationScreenProps> = ({ navigation, route }) => {
  const [otp, setOtp] = useState('');
  const { userId, sentOtp } = route.params;

  const verifyUserOtp = async (enteredOtp: string) => {
    try {
      if (enteredOtp === sentOtp) {
        console.log('OTP verified successfully');
        navigation.navigate('Home'); // Navigate to the Home screen
      } else {
        console.log('Incorrect OTP');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter OTP"
        value={otp}
        onChangeText={setOtp}
        keyboardType='numeric'
        style={styles.input}
      />
      <TouchableOpacity onPress={() => verifyUserOtp(otp)} style={styles.button}>
        <Text style={styles.buttonText}>Verify OTP</Text>
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
});

export default OtpVerificationScreen;
