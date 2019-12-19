import * as React from 'react';
import {
  View,
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
} from 'react-native';

import MainNavigationWrapper from './MainNavigationWrapper';
import LoginStack from './LoginComponent/LoginStack'
import LoginManager from './Model/LoginManager'

import { Provider as PaperProvider } from 'react-native-paper';
import UserData from './Model/UserData';
import Theme from './Theme';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLogin : null,
      textMode: false,
      viewUpdate: false,
    };

    this.loginManager = new LoginManager();
    this.userData = new UserData();
  }

  getStyleSheet(value){
    let theme = new Theme(value);
    return theme.getStyleSheet();
  }


  async reteriveData(){

    const userToken = await AsyncStorage.getItem('TOKEN');
    const userName = await AsyncStorage.getItem('USERNAME');
    const passWord = await AsyncStorage.getItem('PASSWORD');

    if (userToken) {

      let verified = await this.loginManager.verifyKey(userToken, userName);
      if (verified) {
        this.userData.token = userToken;
        this.userData.id = userName;
        this.userData.pwd = passWord;
      } else {
        await AsyncStorage.clear();
      }
      return verified;
    } else {
      return false;
    }
  }

  async componentDidMount(){

    const data = await this.reteriveData();
    if(data){
      this.setState({isLogin : true});
    } else {
      this.setState({isLogin : false});
    }
  }

  updateIsLogin(userData){
    this.userData = userData;
    this.setState({isLogin:true});
  }

  logout(){
    this.setState({isLogin : false});
  }

  updateTextMode(){
    //forceUpdate!
    this.setState({viewUpdate:true}, () =>{
      this.setState({viewUpdate:false, textMode : !this.state.textMode})
    })
  }

  render() {

    if (this.state.isLogin === null) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
        </View>
      );
    } else if (this.state.isLogin === true) {

      if (this.state.viewUpdate) {
        return (<View style={styles.container}></View>);
      } else {
        return (
          <PaperProvider>
          <MainNavigationWrapper screenProps={{
            styles:this.getStyleSheet(this.state.textMode), 
            userData:this.userData, 
            logout:this.logout.bind(this),
            textModeUpdate:this.updateTextMode.bind(this),
            textMode:this.state.textMode,
            }}></MainNavigationWrapper>
          </PaperProvider>
        );  
      }
    } else {
      return (
        <LoginStack screenProps={{handler:this.updateIsLogin.bind(this)}}/>  
     );
    }
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
