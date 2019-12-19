import React from 'react'
import UserDataManager from '../../Model/UserDataManager'
import {View, Text, ScrollView, StyleSheet, ActivityIndicator, StatusBar} from 'react-native'
import { DataTable, Button, Divider} from 'react-native-paper';
import { Feather} from  '@expo/vector-icons'
import MyBarChart from './MyBarChart';

class WeeklyReport extends React.Component {

    constructor(props){

        super(props)

        this.state = {
            loading : true,
            activity : [],
            protein : [], 
            calroeis : [],
            fat : [],
            carbo: [],
        }

        this.userDataManager = new UserDataManager();    
        this.styles = {};
    }

    async componentDidMount(){
        this.userDataManager.userData = this.props.userData;
        this.styles = this.props.styles;
        this.update();
    }

    async update(){
        this.setState({loading : true}, async() => {

            const response = await this.userDataManager.get7daysReportData();

            let calories = response.meals.map((value)=>{
                return {key : value.key, data: value.data.calories}
            })

            let protein = response.meals.map((value)=>{
                return {key : value.key, data: value.data.protein}
            })

            let fat = response.meals.map((value)=>{
                return {key : value.key, data: value.data.fat}
            })

            let carbo = response.meals.map((value)=>{
                return {key : value.key, data: value.data.carbohydrates}
            })

            let activity = response.activities.map((value)=>{
                return {key : value.key, data: value.data.activities}
            })


            this.setState({loading:false,
                 activity:activity, 
                 protein : protein,
                 fat : fat,
                 carbo : carbo,
                 calroeis : calories,
                })
        })
    }

    dataTableMeals(){
        let element = [];

        element.push(
            <DataTable.Header key = {"tableheader"}>
            <DataTable.Title>Nutrition</DataTable.Title>
            <DataTable.Title> Today's total </DataTable.Title>
            <DataTable.Title> Daily Goal </DataTable.Title>
            </DataTable.Header>
        );

        const data = this.state.aggregatedMeals;
        for ( const mealelement of Object.keys(data)){
            element.push(this.dataRow(mealelement, this.state.aggregatedMeals[mealelement]))
        }

        return element;
    }


    dataTableActivities(){

        let element = [];

        element.push(
            <DataTable.Header key = {"tableheader1"}>
            <DataTable.Title></DataTable.Title>
            <DataTable.Title >Today's total</DataTable.Title>
            <DataTable.Title >Daily Goal </DataTable.Title>
            </DataTable.Header>
        );


        const data = this.state.aggregatedActivities
        for ( const activityelement of Object.keys(data)){
            element.push(this.dataRow(activityelement, this.state.aggregatedActivities[activityelement]))
        }

        return element;

    }

    dataRow(header, data) {

        let unit = "g"
        if (header === "activities") {
            unit = "min"
        } else if (header === "calories") {
            unit = "kcal"
        } else {
            unit = "g"
        }


        
        return (
                <DataTable.Row key = {header+"row"}>
                    <DataTable.Cell> {header} </DataTable.Cell>
                    <DataTable.Cell numeric>{data.value + ' ' + unit}</DataTable.Cell>
                    <DataTable.Cell numeric>{data.goal + ' ' + unit}</DataTable.Cell>
                    {/* <DataTable.Cell numeric>{this.OptionalNan(this.state.nutrition.totalFat, 'g')}</DataTable.Cell>
                    <DataTable.Cell numeric>{this.OptionalNan(this.state.goal.fat, 'g')}</DataTable.Cell> */}
                </DataTable.Row>
        )
    }

    

    colorPicker(value){

        if (value >= 1) {
            return "#4BB543"
        } else if (value >= 0.4){
            return "#EED202"
        } else if (value >= 0.2) {
            return "#B00020"
        } else {
            return "#171F33"
        }
    }

    valueMaker(value){

        if (value >= 1) {
            return (
            <View style={{display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
            <Feather name="check-circle" size={20} style={{marginRight:10}}></Feather>
            <Text style={styles.progressBigText}>Done</Text>
            </View>          
            )
        } else {
            return(
            <React.Fragment>
            <Text style={styles.progressBigText}> {Math.floor(value*100).toString() + "%"}</Text>
            </React.Fragment>
            )

        }
    }

    render(){


       if (this.state.loading) {
           return (
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
              </View>
           )
       } else {
        return(
            <View style={{display:"flex",height:"100%"}}>      
            <Text style={this.styles.header}> Weekly Report </Text>
            <View style={{display:"flex", height:35, flexDirection:"row", alignItems:'center', justifyContent:'space-around'}}>
            <Text style={this.styles.description}>Recent : {new Date().toLocaleString()} </Text> 
            <Button icon="refresh" mode="text" onPress={()=>this.update()}>refresh</Button> 
            </View>
            
            <Divider style={this.styles.divider}></Divider>

            <ScrollView>
            <Text style={this.styles.subheader}> Total Calories </Text>
            <MyBarChart data={this.state.calroeis}></MyBarChart>

            <Text style={this.styles.subheader}> Total Activities </Text>
            <MyBarChart data={this.state.activity}></MyBarChart>

            <Text style={this.styles.subheader}> Carbohydrates </Text>
            <MyBarChart data={this.state.carbo}></MyBarChart>

            <Text style={this.styles.subheader}> Protein </Text>
            <MyBarChart data={this.state.protein}></MyBarChart>

            <Text style={this.styles.subheader}> Fat </Text>
            <MyBarChart data={this.state.fat}></MyBarChart>

            <View style={{height:20}}>
            </View>
           
            </ScrollView>
            </View>
        )
       }
        
        
    }
}

export default WeeklyReport;

const styles = StyleSheet.create({
    header : {
      fontSize:40,
      fontWeight:'bold',
      marginLeft:10,
      marginTop:10,
    },

    subheader : {
        fontSize:28,
        fontWeight:'bold',
        marginLeft:10,
        marginTop:10,
      },

    description: {
        fontSize:16,
        color:'#A9A9A9',
      },

    divider:{
        marginBottom:10,
        marginTop:10,
        backgroundColor:"#A9A9A9",
    },

    progressText:{
        textAlign: 'center', 
        fontWeight:"bold",
        fontSize:15
    },

    progressBigText:{
        textAlign: 'center', 
        fontWeight:'100',
        fontSize:28
    }

  })
  