import React from 'react'
import UserDataManager from '../../Model/UserDataManager'
import {View, Text, ScrollView, StyleSheet, ActivityIndicator, StatusBar} from 'react-native'
import { DataTable, Button, Divider} from 'react-native-paper';
import ProgressChart from './ProgressChart';
import { Feather} from  '@expo/vector-icons'

class DailyReport extends React.Component {

    constructor(props){

        super(props)

        this.state = {
            loading : true,
            aggregatedMeals : {},
            aggregatedActivities: {},
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

        this.setState({loading:true}, async()=>{
            const response = await this.userDataManager.getTodayReportData();
            this.setState({aggregatedMeals : response.meals, aggregatedActivities : response.activities, loading:false})
        });
    }


    dataTableMeals(){
        let element = [];

        element.push(
            <DataTable.Header key = {"tableheader"}>
            <DataTable.Title> <Text style={this.styles.tableHeader}>Nutrition</Text></DataTable.Title>
            <DataTable.Title> <Text style={this.styles.tableHeader}>Day Total</Text></DataTable.Title>
            <DataTable.Title> <Text style={this.styles.tableHeader}>Day Goal</Text></DataTable.Title>
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
            <DataTable.Title><Text style={this.styles.tableHeader}>Day total</Text></DataTable.Title>
            <DataTable.Title><Text style={this.styles.tableHeader}>Day Goal</Text></DataTable.Title>
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
                    <DataTable.Cell><Text style={this.styles.tableDescription}>{header}</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={this.styles.tableDescription}>{data.value + ' ' + unit}</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={this.styles.tableDescription}>{data.goal + ' ' + unit}</Text></DataTable.Cell>
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
            <Text style={this.styles.progressBigText}>Done</Text>
            </View>          
            )
        } else {
            return(
            <React.Fragment>
            <Text style={this.styles.progressBigText}> {Math.floor(value*100).toString() + "%"}</Text>
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
            <Text style={this.styles.header}> Daily Report </Text>
            <View style={{display:"flex", height:35, flexDirection:"row", alignItems:'center', justifyContent:'space-around'}}>
            <Text style={this.styles.description}>Recent : {new Date().toLocaleString()} </Text> 
            <Button color="#4652A0" icon="refresh" mode="text" onPress={()=>this.update()}>refresh</Button> 
            </View>
            <Divider style={this.styles.divider}></Divider>
            <ScrollView>
        
           
            <Text style={this.styles.subheader}> Nutrition Summary </Text>
            <DataTable>
                {this.dataTableMeals()}
            </DataTable>

            <Text style={this.styles.subheader}> Acitivity Summary </Text>
            <DataTable>
            {this.dataTableActivities()}
            </DataTable>

            <Text style={this.styles.subheader}> Progress Rings </Text>

            <View style={{display:"flex", flexDirection:"row",height:170, margin:10}}>

            <View style={{flex:0.33, display:"flex", flexDirection:'column', justifyContent:'center', alignContent:'center',textAlign: 'center'}}>
                <ProgressChart color={this.colorPicker(this.state.aggregatedMeals.carbohydrates.percentage)} progress={this.state.aggregatedMeals.carbohydrates.percentage}></ProgressChart>
                <Text style={this.styles.progressText}>Carbohydrates</Text>
                {this.valueMaker(this.state.aggregatedMeals.carbohydrates.percentage)}
            </View>

            <View style={{flex:0.33, flexDirection:'column', justifyContent:'center', alignContent:'center'}}>
                <ProgressChart color={this.colorPicker(this.state.aggregatedMeals.protein.percentage)} progress={this.state.aggregatedMeals.protein.percentage} ></ProgressChart>
                <Text style={this.styles.progressText}>Protein</Text>
                {this.valueMaker(this.state.aggregatedMeals.protein.percentage)}
            </View>

            <View style={{flex:0.33, flexDirection:'column', justifyContent:'center', alignContent:'center'}}>
                <ProgressChart color={this.colorPicker(this.state.aggregatedMeals.fat.percentage)} progress={this.state.aggregatedMeals.fat.percentage}></ProgressChart>
                <Text style={this.styles.progressText}>Fat</Text>
                {this.valueMaker(this.state.aggregatedMeals.fat.percentage)}
            </View>
            
            </View>


            <View style={{display:"flex", flexDirection:"row",height:170, margin:10}}>

            <View style={{flex:0.5, display:"flex", flexDirection:'column', justifyContent:'center', alignContent:'center',textAlign: 'center' }}>
                <ProgressChart color={this.colorPicker(this.state.aggregatedMeals.calories.percentage)} progress={this.state.aggregatedMeals.calories.percentage}></ProgressChart>
                <Text style={this.styles.progressText}>Calories</Text>
                {this.valueMaker(this.state.aggregatedMeals.calories.percentage)}
            </View>

            <View style={{flex:0.5, display:"flex", flexDirection:'column', justifyContent:'center', alignContent:'center',textAlign: 'center' }}>
                <ProgressChart color={this.colorPicker(this.state.aggregatedActivities.activities.percentage)} progress={this.state.aggregatedActivities.activities.percentage}></ProgressChart>
                <Text style={this.styles.progressText}>Activities</Text>
                {this.valueMaker(this.state.aggregatedActivities.activities.percentage)}
            </View>

            </View>

            <View style={{height:20}}>

            </View>

                </ScrollView>
            </View>
        )
       }
        
        
    }
}

export default DailyReport;

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
        backgroundColor:"#A9A9A9"
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
  