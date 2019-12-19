import * as React from 'react';
import {
    View,
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
  } from 'react-native';



class AuthLoading extends React.Component {
    constructor(props) {
      super(props);
      this._bootstrapAsync();
    }

  
    _bootstrapAsync = async () => {
      const userToken = await AsyncStorage.getItem('TOKEN');
      if (userToken) {
        this.props.navigation.navigate('Tabbar');
      } else {
        this.props.navigation.navigate('Login');
        
      }
    }
  
    render() {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
        </View>
      );
    }
  }
  
  export default AuthLoading; 

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  