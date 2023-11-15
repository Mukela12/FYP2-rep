import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Home: undefined;
  LoginOwner: undefined;
  SignUpOwner: undefined;
  HomeStore: undefined;
  OtpVerificationscreen: {
    userId: string;
    otp: string; // Add this line
  };
};

export type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

export type SignUpScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SignUp'
>;

export type SignUpScreenOwnerNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SignUpOwner'
>;

export type LoginScreenOwnerNavigationProp = StackNavigationProp<
  RootStackParamList,
  'LoginOwner'
>;

export type HomeScreenOwnerNavigationProp = StackNavigationProp<
  RootStackParamList,
  'HomeStore'
>;

export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

export type OtpVerificationScreenProps = StackNavigationProp<
  RootStackParamList,
  'OtpVerificationscreen'
>;
