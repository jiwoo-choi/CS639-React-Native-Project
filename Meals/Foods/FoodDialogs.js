import { 
    View,
    Text, 
    StyleSheet, 
    Keyboard, 
    KeyboardAvoidingView,
    TouchableWithoutFeedback, 
    ScrollView
} from 'react-native';

import {TextInput, Button, Divider} from 'react-native-paper';
import React from 'react';
import { Header } from 'react-navigation-stack';
import UserDataManager from '../../Model/UserDataManager'
import FoodData from './FoodData'
import Loading from './Loading'
import TypeChecker from '../../Util/TypeChecker'

class FoodDialogs extends React.Component {


    static navigationOptions = {
        title: 'Activitiy Editor',
        headerTintColor : "#fff",
        headerStyle: {backgroundColor : "#171F33"}
      };

   
    constructor(props) {
        super(props)

        this.state = {
            name : null,
            calories: null,
            carbohydrates:null,
            protein:null,
            fat:null,
            error:false,
            errorMessage:"",
            loading:false
        }

        this.userDataManager = new UserDataManager()
        this.userDataManager.userData = this.props.screenProps.userData;
        this.styles = this.props.screenProps.styles.meals;    
    
        //if they have props.. please say anything to me..
    }

  
    componentDidMount(){

        const isEdit = this.props.navigation.getParam('isEdit');

        if (isEdit) {
            const data = this.props.navigation.getParam('data');
            this.setState({
                name : data.name.toString(), 
                calories : data.calories.toString(),
                carbohydrates : data.carbohydrates.toString(),
                protein : data.protein.toString(),
                fat : data.fat.toString(),
            })
        }  else {
            this.setState({
                name : "", 
                calories : "",
                carbohydrates : "",
                protein : "",
                fat : "",
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
        } else if (this.state.calories === undefined || this.state.calories === "" || this.state.calories === null){
            errorMessage = "your calories field is not filled"
        } else if (this.state.carbohydrates === undefined || this.state.carbohydrates === "" || this.state.carbohydrates === null){
            errorMessage = "your carbohydrates field is not filled"
        } else if (this.state.protein === undefined || this.state.protein === "" || this.state.protein === null){
            errorMessage = "your protein field is not filled"
        } else if (this.state.fat === undefined || this.state.fat === "" || this.state.fat === null){
            errorMessage = "your fat field is not filled"
        } else if (![this.state.calories,this.state.carbohydrates,this.state.protein,this.state.fat].every((value)=> !isNaN(value))){
            errorMessage = "(Kcal)&(g) field should be number "
        } else {
            errorMessage = undefined;
        }

        if (errorMessage === undefined) { 

            const isEdit = this.props.navigation.getParam('isEdit');
            const mealid = this.props.navigation.getParam('mealid');

            if (isEdit) {
                const data = this.props.navigation.getParam('data');
                
                this.setState({error:false, loading:true}, async() => {
                        let food = new FoodData(this.state);
                        await this.userDataManager.editFoodsFromMeal(mealid, data.id, food);
                        this.props.navigation.getParam('changed')();
                        this.props.navigation.goBack();
                })
            } else {
                this.setState({error:false, loading:true}, async() => {
                    let food = new FoodData(this.state);
                    await this.userDataManager.addFoodsToMeal(mealid, food);
                    this.props.navigation.getParam('done')();
                    this.props.navigation.goBack();
            })

            }

        } else {
        this.setState({error:true, errorMessage: errorMessage})
    }

    }
//                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//                     </TouchableWithoutFeedback>

    render(){

        const isEdit = this.props.navigation.getParam('isEdit');
        const header = isEdit ? "Edit Food" : "Add Food" ;
        const buttonMessage = isEdit ? "Edit Your Food" : "Add Your Food" ;
        const buttonIcon = isEdit ? "square-edit-outline" : "plus-box-outline" ;


        
        return(
                <View style={{flex:1}}>
                <Loading visible={this.state.loading}></Loading>
                <KeyboardAvoidingView style={{flex:1}} keyboardVerticalOffset = {Header.HEIGHT + 20} behavior="padding" enabled>
                <ScrollView>

                    <View style={styles.dialogContainer}>
                    <Text style={styles.dialogBigHeader}> {header} </Text>

                    <Text style={styles.dialogHeader}> Food Name </Text>

                    <TextInput
                        selectionColor="#ce2029"
                        underlineColor="#ce2029"
                        mode="outlined"
                        label="Food Name"
                        value={this.state.name}
                        onChangeText={text => this.setState({ name : text })}
                        theme = {{colors: { primary: '#ce2029'}}}
                    />

<Divider style={this.styles.divider}></Divider>
                <Text style={styles.dialogHeader}> Calories </Text>
                <TextInput
                    selectionColor="#ce2029"
                    underlineColor="#ce2029"
                    mode="outlined"
                    label="Calories (Kcal)"
                    value={this.state.calories}
                    onChangeText={text => this.setState({ calories : text })}
                    theme = {{colors: { primary: '#ce2029'}}}
                />

<Divider style={this.styles.divider}></Divider>
                <Text style={styles.dialogHeader}> Carbohydrates </Text>
                <TextInput
                    selectionColor="#ce2029"
                    underlineColor="#ce2029"
                    mode="outlined"
                    label="Carbohydrates (g)"
                    value={this.state.carbohydrates}
                    onChangeText={text => this.setState({ carbohydrates : text })}
                    theme = {{colors: { primary: '#ce2029'}}}
                />

<Divider style={this.styles.divider}></Divider>
                <Text style={styles.dialogHeader}> Protein </Text>
                <TextInput
                    selectionColor="#ce2029"
                    underlineColor="#ce2029"
                    mode="outlined"
                    label="Protein (g)"
                    value={this.state.protein}
                    onChangeText={text => this.setState({ protein : text })}
                    theme = {{colors: { primary: '#ce2029'}}}
                />

<Divider style={this.styles.divider}></Divider>
                <Text style={styles.dialogHeader}> Fat </Text>
                <TextInput
                    selectionColor="#ce2029"
                    underlineColor="#ce2029"
                    mode="outlined"
                    label="Fat (g)"
                    value={this.state.fat}
                    onChangeText={text => this.setState({ fat : text })}
                    theme = {{colors: { primary: '#ce2029'}}}
                />

<Divider style={this.styles.divider}></Divider>


                    <View style={[this.state.error ? styles.errorMessage: styles.noErrorMessage]}>
                       <Text style={this.styles.errorMessageStyle}> Sorry, {this.state.errorMessage} </Text> 
                    </View>
                


                    <Button style={this.styles.bottomButton} icon={buttonIcon} mode="contained" onPress={() => this._confirm()}>
                        {buttonMessage}
                    </Button>  

                    </View>     
                    </ScrollView>             
                    </KeyboardAvoidingView>
                    </View>

         )
    }
}



export default FoodDialogs;

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
  