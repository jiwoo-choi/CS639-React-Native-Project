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
import { Paragraph, Menu, Provider } from 'react-native-paper';
import {Ionicons} from  '@expo/vector-icons'
import { Header } from 'react-navigation-stack';
import UserDataManager from '../Model/UserDataManager'

import MealData from './MealData'
import Loading from './Foods/Loading'

class MealsDialog extends React.Component {
    

static navigationOptions = {
    title: 'Meal Editor',
    headerTintColor : "#fff",
    headerStyle: {backgroundColor : "#171F33"}
    };

constructor(props) {
    super(props)

    // let userData = this.props.navigation.getParam('userData');
    // userData = this.initialMapper(userData);

    this.state = {
        loading:false
    }

    this.userDataManager = new UserDataManager()
    this.userDataManager.userData = this.props.screenProps.userData;
    //if changed.. we need to reload again.
}


componentDidMount(){

    const isEdit = this.props.navigation.getParam('isEdit');
    //,
    if (isEdit) {
        const userData = this.props.navigation.getParam('userData');
        this.setState({
            name : userData.name,
            date : new Date(userData.date),
            id : userData.id,
            type : this.mealMapper(userData.name),
        })
    }  else {
        this.setState({
            name : "",
            date : "",
            id : null,
            type : 0,
        })
    }
}

isSelected(myType){
    return this.state.type === myType ? true : false
}

select(value){
    this.setState({type:value, name : this.mealTypeMapper(value)});
}

mealTypeMapper(type){
    switch(type) {
        case 1:
            return "Breakfast";
        case 2:
            return "Launch";
        case 3:
            return "Dinner";
        case 4:
            return "Snack";
        default:
            return "";
    }
}

mealMapper(value){

    let typed = value.toUpperCase();

    switch(typed) {
        case "BREAKFAST":
            return 1;
        case "LAUNCH":
            return 2;
        case "DINNER":
            return 3;
        case "SNNACK":
            return 4;
        default:
            return 0;
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
    } else {

    }

    if (errorMessage === undefined) { 

        this.setState({error:false, loading:true}, async() => {
            
            const isEdit = this.props.navigation.getParam('isEdit');

            if (isEdit) {

                let meal = new MealData({
                    id:this.state.id,
                    name:this.state.name,
                    date:this.state.date}
                );

                await this.userDataManager.editMeals(this.state.id, meal);
                this.props.navigation.getParam('changed')();
                this.props.navigation.goBack();
                return;

            } else {
                
                let meal = new MealData({id:null,
                    name:this.state.name,
                    date:this.state.date}
                );
        
                await this.userDataManager.addMeals(meal);
                this.props.navigation.getParam('changed')();
                this.props.navigation.goBack();
                return;
            }
        })

    } else {
    this.setState({error:true, errorMessage: errorMessage})
}
}
render(){
        const isEdit = this.props.navigation.getParam('isEdit');
        const header = isEdit ? "Edit Meals" : "Add Your Meals" ;
        const buttonMessage = isEdit ? "Edit your Meals" : "ADD MEALS" ;
        const buttonIcon = isEdit ? "square-edit-outline" : "plus-box-outline" ;

            return(
                <View style={{flex:1}}>
                <Loading visible={this.state.loading}/>
                <KeyboardAvoidingView style={{flex:1}} keyboardVerticalOffset = {Header.HEIGHT + 20} behavior="padding" enabled>
                <ScrollView>

                    <View style={styles.dialogContainer}>
                    <Text style={styles.dialogBigHeader}>{header}</Text>

                    <Text style={styles.dialogHeader}> Meal's name </Text>

                    <TextInput
                        selectionColor="#ce2029"
                        underlineColor="#ce2029"
                        mode="outlined"
                        label="Meal's name"
                        value={this.state.name}
                        onChangeText={text => this.setState({ name : text, type : this.mealMapper(text) })}
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
                        <Chip style={{marginBottom:10}} selected={this.isSelected(1)} mode ='outlined' icon="food-apple" onPress={() => this.select(1)}>Breakfast</Chip>
                        <Chip style={{marginBottom:10}} selected={this.isSelected(2)} mode ='outlined' icon="rice" onPress={() => this.select(2)}>Launch</Chip>
                        <Chip style={{marginBottom:10}} selected={this.isSelected(3)} mode ='outlined' icon="food-variant" onPress={() => this.select(3)}>Dinner</Chip>
                        <Chip style={{marginBottom:10}} selected={this.isSelected(4)} mode ='outlined' icon="cookie" onPress={() => this.select(4)}>Snack</Chip>
                    </View>


                    <Divider style={styles.divider}></Divider>
                    <Text style={styles.dialogHeader}> Date </Text>
                    <DatePicker
                        style={{width:'100%'}}
                        date={this.state.date}
                        mode="datetime"
                        placeholder={"Select your meal date"}
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

                    <View style={[this.state.error ? styles.errorMessage: styles.noErrorMessage]}>
                       <Text style={styles.errorMessageStyle}> Sorry, {this.state.errorMessage} </Text> 
                    </View>
                
                    <Button style={{padding:10,backgroundColor:"#171F33"}} icon={buttonIcon} mode="contained" onPress={this._confirm.bind(this)}>
                        {buttonMessage}
                    </Button>  

                    </View>     
                    </ScrollView>             
                    </KeyboardAvoidingView>
                    </View>     
        ); 
    }

}

export default MealsDialog;


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