import { 
    
    View,
    Text, 
    StyleSheet, 
    Keyboard, 
    KeyboardAvoidingView,
    TouchableWithoutFeedback, 
    ScrollView
} from 'react-native';

import DatePicker from 'react-native-datepicker';
import { Chip , Modal, Portal,TextInput, Button, Divider} from 'react-native-paper';
import React from 'react';
import {Dimensions, } from "react-native";
import ActivityData from './ActivityData';
import { Paragraph, Menu, Provider } from 'react-native-paper';
import {Ionicons} from  '@expo/vector-icons'
import { Header } from 'react-navigation-stack';
import UserDataManager from '../Model/UserDataManager'

class ActivityModal extends React.Component {


    static navigationOptions = {
        title: 'Activitiy Editor',
        headerTintColor : "#fff",
        headerStyle: {backgroundColor : "#171F33"}
      };

   
    constructor(props) {
        super(props)

        this.state = {
            id : null,
            name : null,
            calories: null,
            date: null,
            durationType: 0,
            duration:null,
            error:false,
            errorMessage:"",
        }

        this.userDataManager = new UserDataManager()
        this.userDataManager.userData = this.props.screenProps.userData;    
        //if they have props.. please say anything to me..
    }


    isSelected(myType){
        return this.state.durationType === myType ? true : false
    }

    select(value){
        this.setState({durationType:value, duration : this.durationTypeMapper(value)});
    }

  

    durationTypeMapper(type){
        switch(type) {
            case 1:
                return "15";
            case 2:
                return "30";
            case 3:
                return "60";
            case 4:
                return "90";
            default:
                return "";
        }
    }
    durationMapper(value){
        switch(value) {
            case "15":
                return 1;
            case "30":
                return 2;
            case "60":
                return 3;
            case "90":
                return 4;
            default:
                return 0;
        }
    }

    changed(){
        this.update = 1;
    }

    componentDidMount(){
        const isEdit = this.props.navigation.getParam('isEdit');
        if (isEdit) {
            const userData = this.props.navigation.getParam('userData');
            console.log(userData.id);
            this.setState({
                calories : userData.calories.toString(),
                date : new Date(userData.date),
                id : userData.id,
                name : userData.name,
                duration : userData.duration.toString(),
                durationType: this.durationMapper(userData.duration.toString()),
            })
        }  else {
            this.setState({
                calories : "0",
                date : "",
                id : null,
                duration: "",
                name : "",
                durationType : 0,
            })
        }
    }
   

    

    _confirm(){
        this.errorCheckAndSubmit();
    }

    errorCheckAndSubmit(){

        let errorMessage;

        if (this.state.name === undefined || this.state.name === "" || this.state.name === null){
            errorMessage = "your name field is not filled";
        } //else if (this.state.calories === undefined || this.state.calories === "" || this.state.calories === null){
        //
            //errorMessage = "your calories field is not filled"
        //}
        else if (this.state.date === undefined || this.state.date === "" || this.state.date === null){
            errorMessage = "your date field is not filled"
        } else if (this.state.duration === undefined || this.state.duration === "" || this.state.duration === null){
            errorMessage = "your duration field is not filled"
        } else {

        }

        if (errorMessage === undefined) { 

            this.setState({error:false}, async() => {

                const isEdit = this.props.navigation.getParam('isEdit');

                let calories;
                if (this.state.calories === undefined || this.state.calories === "" || this.state.calories === null) {
                    calories = "0"
                } else {
                    calories = this.state.calories
                }

                if (isEdit) {

                    let activity = new ActivityData(
                        this.state.id,
                        this.state.name,
                        this.state.duration,
                        this.state.date,
                        calories
                    );

                    await this.userDataManager.editActivities(activity.id, activity);
                    this.props.navigation.getParam('changed')();
                    this.props.navigation.goBack();
                    return;

                } else {
                    let activity = new ActivityData(
                        null,
                        this.state.name,
                        this.state.duration,
                        this.state.date,
                        calories,
                    );                     

                    await this.userDataManager.addActivities(activity);
                    this.props.navigation.getParam('changed')();
                    this.props.navigation.goBack();
                    return;

                }
            })

        } else {
        this.setState({error:true, errorMessage: errorMessage})
    }

    }
//                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//                     </TouchableWithoutFeedback>

    render(){

        const isEdit = this.props.navigation.getParam('isEdit');
        const header = isEdit ? "Edit Activity" : "Add Activity" ;
        const buttonMessage = isEdit ? "Edit your Activity" : "Add your Activity" ;
        const buttonIcon = isEdit ? "square-edit-outline" : "plus-box-outline" ;
        return(
                <View style={{flex:1}}>

                <KeyboardAvoidingView style={{flex:1}} keyboardVerticalOffset = {Header.HEIGHT + 20} behavior="padding" enabled>
                <ScrollView>

                    <View style={styles.dialogContainer}>
                    <Text style={styles.dialogBigHeader}>{header}</Text>

                    <Text style={styles.dialogHeader}> Name </Text>

                    <TextInput
                        selectionColor="#ce2029"
                        underlineColor="#ce2029"
                        mode="outlined"
                        label="Activity Name"
                        value={this.state.name}
                        onChangeText={text => this.setState({ name : text })}
                        theme = {{colors: { primary: '#ce2029'}}}
                    />

                    <Divider style={styles.divider}></Divider>
                    <Text style={styles.dialogHeader}> Date </Text>
                    <DatePicker
                        style={{width:'100%'}}
                        date={this.state.date}
                        mode="datetime"
                        placeholder={"Select your activity date"}
                        format="YYYY-MM-DD HH:mm"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        maxDate={new Date()}
                        customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36,
                            borderRadius: 2,
                            borderWidth: 2,
                            height:'100%',
                        }
                        }}
                        onDateChange={(date) => { 
                            let result = date.split(' ');
                            let result1 = result[0] + 'T' + result[1] + ":03-06:00"
                            console.log(result1);
                            this.setState({date: result1})
                        }}
                    />

                    <View style={{
                        display:"flex", 
                        flexDirection:"row",
                        justifyContent:"flex-start",
                        alignItems:"center",
                        margin:13
                    }}>
                        <Ionicons name="md-checkmark-circle-outline" size={20} style={{color:"#777777"}}></Ionicons>
                        <Text style={styles.dialogQuick}> Quick Option </Text>
                    </View>
                    <Button style={{borderRadius:20, marginLeft:10, marginRight:10}} color='#777777' mode='outlined' icon="calendar-today"
                    onPress={() => this.setState({date:new Date()})}
                    
                    > Use current time </Button>

                    <Divider style={styles.divider}></Divider>

                    <Text style={styles.dialogHeader}> Duration </Text>

                    <TextInput
                        selectionColor="#ce2029"
                        underlineColor="#ce2029"
                        mode="outlined"
                        keyboardType="number-pad"
                        label="Minuite"
                        value={this.state.duration}
                        onChangeText={text => this.setState({ duration : text , durationType : this.durationMapper(text)})}
                        theme = {{colors: { primary: '#ce2029'}}}
                    />

                    <View style={{
                        display:"flex", 
                        flexDirection:"row",
                        justifyContent:"flex-start",
                        alignItems:"center",
                        margin:13
                    }}>
                        <Ionicons name="md-checkmark-circle-outline" size={20} style={{color:"#777777"}}></Ionicons>
                        <Text style={styles.dialogQuick}> Quick Option </Text>
                    </View>

                    <View style={{display:'flex', flexDirection:'row', flexWrap:'wrap', justifyContent:'space-between' , marginLeft:13, marginRight:13}}>
                        <Chip style={{marginBottom:10}} selected={this.isSelected(1)} mode ='outlined' icon="timer" onPress={() => this.select(1)}>15 min</Chip>
                        <Chip style={{marginBottom:10}} selected={this.isSelected(2)} mode ='outlined' icon="walk" onPress={() => this.select(2)}>30 min</Chip>
                        <Chip style={{marginBottom:10}} selected={this.isSelected(3)} mode ='outlined' icon="run" onPress={() => this.select(3)}>1 hour</Chip>
                        <Chip style={{marginBottom:10}} selected={this.isSelected(4)} mode ='outlined' icon="run-fast" onPress={() => this.select(4)}>90 min</Chip>
                    </View>


                    <Divider style={styles.divider}></Divider>
                    <Text style={styles.dialogHeader}> Calroies (Optional) </Text>

                     <TextInput
                        mode="outlined"
                        label="Calories"
                        value={this.state.calories}
                        keyboardType="number-pad"
                        onChangeText={text => this.setState({ calories: text })}
                        theme = {{colors: { primary: '#000'}}}
                    />

                    <Divider style={styles.divider}></Divider>

                    <View style={[this.state.error ? styles.errorMessage: styles.noErrorMessage]}>
                       <Text style={styles.errorMessageStyle}> Sorry, {this.state.errorMessage} </Text> 
                    </View>
                
                    <Button style={{padding:10, backgroundColor:"#171F33"}} icon={buttonIcon} mode="contained" onPress={() => this._confirm()}>
                        {buttonMessage}
                    </Button>  

                    </View>     
                    </ScrollView>             
                    </KeyboardAvoidingView>
                    </View>

         )
    }
}



export default ActivityModal;

const styles = StyleSheet.create({

      dialogContainer:{
          marginBottom:10,
          marginLeft:15,
          marginRight:15,
      },

      dialogQuick:{
        fontSize:18,
        fontWeight:'bold',
        marginLeft:5,
        color:"#777777"
      },

      dialogHeader:{
        fontSize:27,
        fontWeight:'bold',
        marginBottom:15,
        marginTop:0,
      },

      dialogBigHeader:{
        fontSize:40,
        fontWeight:'bold',
        marginBottom:20,
        marginTop:20,
      },

      divider:{
          marginTop:15,
          marginBottom:15,
          backgroundColor:"#777777"
      },

      errorMessage:{
          height:20,
          marginBottom:10,
      },
      errorMessageStyle:{
        fontSize: 15,
          fontWeight:'bold',
          color:'red',
    },
      noErrorMessage:{
          height:0
      }

  })
  