import React from 'react';
import {Button} from 'react-native-paper';
import { Alert,  View, Text, StyleSheet, TextInput, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback ,AsyncStorage} from 'react-native';
import LoginManager from '../Model/LoginManager';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      signUpShow:false,
    }
  }

    signUpShow(){
      this.props.navigation.navigate('SignUp');
    }


  async signIn(){
   
    if (this.state.username.length < 5) {
      alert("User name should be longer than 5 characters!");
      return;
  }

  if (this.state.password.length < 5) {
      alert("Password should be longer than 5 characters!");
      return;
  }

    let loginManager = new LoginManager();

    await loginManager.signIn(this.state.username, this.state.password)
    .then(response => {
      _signInAsync = async(password) => {
        await AsyncStorage.setItem('TOKEN', response.userData.token);
        await AsyncStorage.setItem('USERNAME', response.userData.id);
        await AsyncStorage.setItem('PASSWORD', password);

        Alert.alert(
          "Hello!",
          "Welcome back! " + `${response.userData.id}`,
          [
            {text: 'Go', onPress: () => {
              let test = this.props.screenProps.handler;
              test(loginManager.getUserData());
            }},
          ],
          {cancelable: false},
        );
      }
      _signInAsync(this.state.password);

    })
    .catch( error => alert(error));
  }


  render(){
        return(
          <>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} behavior="padding" enabled>
                  <Text style={{fontSize: 30, color: 'gray', textAlign: 'center', margin: 20}}>Login</Text>
                  <Text style={{fontSize: 15, color: 'gray', textAlign: 'center', margin: 5}}>Please login to access your own Tracker</Text>
                  <TextInput
                    style={{width: 300, height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 20, margin: 20, paddingLeft: 10}}
                    onChangeText={text => this.setState({username: text})}
                    value={this.state.text}
                    placeholder="Username"
                  />
                  <TextInput
                    style={{width: 300, height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 20, margin: 10, paddingLeft: 10}}
                    onChangeText={text => this.setState({password: text})}
                    value={this.state.text}
                    placeholder="Password"
                    secureTextEntry={true}
                  />
                 <View style={{width: 300, margin:20, flexDirection: "row", justifyContent: 'center', alignItems: 'center'}}>
                  <Button icon="account-plus" style={styles.buttonStyle} mode="contained" onPress={()=>this.signUpShow()}> Sign Up </Button>
                  <Button icon="login" style={styles.buttonStyle} mode="contained" onPress={()=>this.signIn()}> Sign In </Button>
                </View>
                </KeyboardAvoidingView>
              </TouchableWithoutFeedback>
        </>
      );
    }
}

export default Login;

const styles = StyleSheet.create({
  textStyle : {
    color : '#FFF'
  },
  buttonStyle : {
    flex:0.5,
    margin :5,
    padding:5,
    backgroundColor: '#171F33', 
    alignItems: 'center', 
    justifyContent: 'center', 
    borderRadius: 8}
})