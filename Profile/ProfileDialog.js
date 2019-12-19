import React from 'react';
import { Modal, Portal, Button, TextInput } from 'react-native-paper';
import { 
    View, 
    Keyboard, 
    KeyboardAvoidingView, 
    TouchableWithoutFeedback,
    StyleSheet,
    Dimensions,
    Text,
    ScrollView,
} from 'react-native';

import { Header } from 'react-navigation-stack';
import UserDataManager from '../Model/UserDataManager'

class ProfileDialog extends React.Component {
    
constructor(props) {
    super(props)

    let userData = this.props.navigation.getParam('userData');
    console.log(userData);
    userData = this.initialMapper(userData);
    console.log(userData);

    this.state = {
        firstName : userData.firstName,
        lastName : userData.lastName,
        calGoal: userData.dailycal,
        carboGoal:userData.dailycarbo,
        proGoal:userData.dailyprotein,
        fatGoal:userData.dailyfat,
        actGoal:userData.dailyactivity,
    }

    this.userDataManager = new UserDataManager()
    this.userDataManager.userData = this.props.screenProps.userData;
    //if changed.. we need to reload again.
}


initialMapper(value){
    
    let result = {};
    for (const val of Object.keys(value)) {
        let key = value[val];
        if (key === 0 || key === null || key === "" || key === undefined) {
            result[val] = null;
        } else {
            result[val] = key.toString();
        }
    }
    return result;
}

editMapper() {

    let thisResult = this.initialMapper(this.state);
    result = {};
    result.firstName = thisResult.firstName;
    result.lastName = thisResult.lastName;
    result.goalDailyActivity = thisResult.actGoal;
    result.goalDailyCalories =thisResult.calGoal;
    result.goalDailyCarbohydrates= thisResult.carboGoal;
    result.goalDailyFat=thisResult.fatGoal;
    result.goalDailyProtein=thisResult.proGoal;

    return result;
}


static navigationOptions = {
    title: 'Edit Your Tracker Info',
    headerTintColor : "#fff",
    headerStyle: {backgroundColor : "#171F33"}
  };


  allFieldFilled(){
    let test1 = this.state.calGoal && this.state.carboGoal && this.state.proGoal && this.state.fatGoal && this.state.actGoal;
    let test2 = [this.state.calGoal,this.state.carboGoal,this.state.proGoal,this.state.fatGoal,this.state.actGoal].every((value)=> !isNaN(value));
    return test1 && test2;
  }

    render(){
        
        const required = this.allFieldFilled();
        const disable = required ? false : true;
        const icon = required ? "circle-edit-outline" :"alert-outline";
        const btnText = required ? "edit your info" : "check out required field";
        
            return(
                <View style={{flex:1}}>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <KeyboardAvoidingView style={{flex:1}} keyboardVerticalOffset = {Header.HEIGHT + 20} behavior="padding" enabled>
                        <ScrollView>

                        <View style={{marginLeft:15, marginRight:15}}>

                        <Text style={styles.textHeader}> User's Info (optional) </Text>

                        <View style={{
                            display:'flex',
                            flexDirection:'row',
                            height:60,
                            width:'100%',
                            justifyContent:'space-around',
                            alignItems:'center'
                        }}>
                        <TextInput
                        style={{flex:0.45}}
                        mode="outlined"
                        label='First name'
                        value={this.state.firstName}
                            onChangeText={text => this.setState({ firstName : text})}
                        />
                        <TextInput
                        style={{flex:0.45}}
                        mode="outlined"
                        label='Last name'
                        value={this.state.lastName}
                            onChangeText={text => this.setState({ lastName : text})}
                        />
                        </View>


                        <Text style={styles.textHeader}> Daily Nutrition Goal (required) </Text>

                        <TextInput
                            mode="outlined"
                            label='calories goal (kcal) '
                            value={this.state.calGoal}
                            onChangeText={text => this.setState({ calGoal : text})}
                        />

                        <TextInput
                            mode="outlined"
                            label='Carbo goal (g)'
                            value={this.state.carboGoal}
                            onChangeText={text => this.setState({ carboGoal : text})}
                        />

                        <TextInput
                            mode="outlined"
                            label='Protein goal (g)'
                            value={this.state.proGoal}
                            onChangeText={text => this.setState({ proGoal : text})}
                        />


                        <TextInput
                            mode="outlined"
                            label='Fat goal (g)'
                            value={this.state.fatGoal}
                            onChangeText={text => this.setState({ fatGoal : text})}
                        />

                        <Text style={styles.textHeader}> Daily Activity Duration Goal (required) </Text>

                        <TextInput
                            mode="outlined"
                            label='Activity goal (Minuites)'
                            value={this.state.actGoal}
                            onChangeText={text => this.setState({ actGoal : text})}
                        />
                        
                        </View>

                        <Button style={styles.buttonStyle} icon={icon} mode="contained" disabled={disable}
                        onPress={ async() => {
                            let response = await this.userDataManager.updateUserData(this.editMapper());
                            this.props.navigation.getParam('changed')();
                            this.props.navigation.goBack();
                        }
                        }
                        >
                            {btnText}
                        </Button>

                        </ScrollView>
                        </KeyboardAvoidingView>
                        </TouchableWithoutFeedback>
                    </View>



            ); //send message... can you do that..
        }

//                    <View style={{height:30, backgroundColor:'red'}}>
//</View>

}

export default ProfileDialog;

const styles = StyleSheet.create({
   textHeader:{
        fontSize:17,
        fontWeight:'bold',
        marginTop:10,
        marginBottom:7,
   },
   buttonStyle:{
        margin:20,
        padding:10
   }
  });


    /*

        if (this.props.type !== 1) {
            return(
                <Portal>
                    <Dialog
                        visible={this.props.visible}
                        onDismiss={this._hideDialog}>
                        <Dialog.Title>{title}</Dialog.Title>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <KeyboardAvoidingView behavior="padding" enabled> 
                        <Dialog.Content>
                        <TextInput
                            mode="outlined"
                            label='goal'
                            value={this.state.firstValue}
                            keyboardType="number-pad"
                            onChangeText={text => this.setState({ firstValue : text})}
                        />
                        </Dialog.Content>
                        </KeyboardAvoidingView>
                        </TouchableWithoutFeedback>
                        <Dialog.Actions>
                            <Button mode="contained" icon="account-edit" onPress={this._editDialog}>Edit</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            );
        } else {
            return(
            <Portal>
            <Dialog
                visible={this.props.visible}
                onDismiss={this._hideDialog}>
                <Dialog.Title>{title}</Dialog.Title>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView behavior="padding" enabled> 
                <Dialog.Content>
                    <TextInput
                        mode="outlined"
                        label='first name'
                        value={this.state.firstValue}
                        keyboardType="number-pad"
                        onChangeText={text => this.setState({ firstValue : text})}
                    />
                    <TextInput
                        mode="outlined"
                        label='last name'
                        keyboardType="number-pad"
                        value={this.state.secondValue}
                        onChangeText={text => this.setState({ secondValue : text }
                    )}
                    />
                </Dialog.Content>
                </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
                <Dialog.Actions>
                    <Button mode="contained" icon="account-edit" onPress={this._editDialog}>Edit</Button>
                </Dialog.Actions>
            </Dialog>
            </Portal>
            );
        }

       
    */
