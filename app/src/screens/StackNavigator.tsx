import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from './sing-in'
import ProfileScreen from './profile'
import { NavigationContainer } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';

const Stack = createStackNavigator();

export interface StackNavigatorProps {
  loading: boolean;
}

const StackNavigator = ({ loading }: StackNavigatorProps) => {

  return (
    <>
      <Spinner visible={loading} textStyle={{ color: "#fff" }} textContent={'Cargando, espere...'} overlayColor="rgba(0, 0, 0, 0.75)" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="sing-in" component={SignInScreen} options={{ headerShown: false }} />
          <Stack.Screen name="profile" component={ProfileScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  loading: state.users.loading
})

export default connect(mapStateToProps, null)(StackNavigator)
