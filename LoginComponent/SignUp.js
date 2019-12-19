
import React from 'react';
import { Alert, View, Text, StyleSheet, TextInput, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback ,AsyncStorage} from 'react-native';
import {Button} from 'react-native-paper'
import LoginManager from '../Model/LoginManager'

class SignUp extends React.Component {

 
    constructor(props) {
        super(props);
        this.state = {
          username: '',
          password: '',
        }
      }



    componentDidMount(){
        this.keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        this._keyboardDidShow,
        );
        this.keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        this._keyboardDidHide,
        );
    }

    async confirm(){

        //first we need to check here!

        if (this.state.username.length < 5) {
            alert("user name should be longer than 5 characters!");
            return;
        }

        if (this.state.password.length < 5) {
            alert("password should be longer than 5 characters!");
            return;
        }

        let loginManager = new LoginManager();

        loginManager.signUp(this.state.username, this.state.password)
        .then( session => session.signIn(this.state.username,this.state.password))
        .then( response => {
            _signInAsync = async() => {
                await AsyncStorage.setItem('TOKEN', response.userData.token);
                await AsyncStorage.setItem('USERNAME', response.userData.id);
                await AsyncStorage.setItem('PASSWORD', this.state.password);

                Alert.alert(
                    'Succesfully Sign Up!',
                    'Hello! ' + `${response.userData.id}`,
                    [
                      {text: 'Go', onPress: () => {     
                        let test = this.props.screenProps.handler;
                        test(loginManager.getUserData());
                      }},
                    ],
                    {cancelable: false},
                  );          
            }
            _signInAsync();
        })
        .catch( error => alert(error) )
    }

    cancel(){
        this.props.navigation.navigate('Login');
    }

    render() {

        return(
            <>
                  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                  <KeyboardAvoidingView style={{flex: 1,justifyContent: 'center'}} behavior="padding" enabled>
                    <Text style={styles.headerText}>Sign Up</Text>
                    <Text style={styles.typeText}>Username</Text>
                    <TextInput
                      style={styles.inputText}
                      onChangeText={text => this.setState({username: text})}
                      value={this.state.text}
                      placeholder="Username"
                    />
                    <Text style={styles.smallText}> * user name should be longer than 5 character! </Text>

                    <Text style={styles.typeText}>Password</Text>
                    <TextInput
                      style={styles.inputText}
                      onChangeText={text => this.setState({password: text})}
                      value={this.state.text}
                      placeholder="Password"
                      secureTextEntry={true}
                    />
                    <Text style={styles.smallText}> * password should be longer than 5 character! </Text>
                    <View style={{display : "flex", height: 100, flexDirection:"coloum", justifyContent:'space-around', margin:15}}> 
                    <Button mode ="contained" icon="check" style={{backgroundColor:"#4CAF50"}} onPress={this.confirm.bind(this)} > Confirm </Button>
                    <Button mode='outlined' icon="keyboard-backspace" color="#a9a9a9" onPress={this.cancel.bind(this)}> Cancel </Button>
                     </View>
                     
                  </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
          </>
        );

    }
}

//style={[styles.buttonStyle, {backgroundColor:'#C5040B', marginTop: 50}]} 
export default SignUp;

const styles = StyleSheet.create({

    textStyle : {
      color : '#FFF'
    },

    buttonStyle : {
      marginRight :10, 
      backgroundColor: '#171F33', 
      alignItems: 'center', 
      justifyContent: 'center', 
      marginTop: 20,
      marginLeft:10,
      borderRadius: 8,
      height:40,
    },
    headerText : {
        fontSize:30,
        color : 'gray',
        margin : 15
    },
    typeText: {
        fontSize: 20, 
        marginLeft:17,
        marginTop:10
    },
    inputText: {
        alignItems: 'center', 
        justifyContent: 'center', 
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1, 
        borderRadius: 10, 
        marginTop:10,
        marginLeft: 17,
        marginRight :17, 
        paddingLeft: 10
    }, 
    smallText : {
        fontSize: 12, 
        marginLeft:17,
        marginTop:5
    },
    

  })

