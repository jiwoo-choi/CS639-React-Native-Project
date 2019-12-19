
import React from 'react';


import { 
    Button,
    Text,
    Card,
    IconButton,
    DataTable,
    FAB,
    Paragraph,
    Divider,
    Surface,
    Switch
} from 'react-native-paper';

// import { Container, Header, Left, Body, Right, Button, Icon, Title, Segment, Content, Text } from 'native-base';

// import { Container, Header, Left, Body, Right, Icon, Segment, Content , Title,Text} from 'native-base';
import {Ionicons } from "@expo/vector-icons"


import { 
    View, 
    StyleSheet,
    ActivityIndicator,
    StatusBar,
    ScrollView
} from 'react-native';


import { EvilIcons } from '@expo/vector-icons'; 
import UserDataManager from '../Model/UserDataManager';
import Loading from './Foods/Loading';
import ChipMaker from '../Home/ChipMaker'

import MyDate from '../Util/MyDate';

class Meals extends React.Component {


    static navigationOptions = {
        title: 'Meals',
        headerTintColor : "#fff",
        headerStyle: {backgroundColor : "#171F33"}
      };

    constructor(props) {
        super(props);

        this.state = {
            loading : true,
            isSwitchOn: true
        }

        this.userDataManager = new UserDataManager();
        this.userDataManager.userData = this.props.screenProps.userData;
        this.styles = this.props.screenProps.styles.meals;
        this.update = 0;
        this.meals = [];

    }


    async componentDidMount(){

        this.focusListener = this.props.navigation.addListener('didFocus', async() => {

            if (this.update) {
                this.setState({loading:true}, async() => {
                    const updatedData = await this.userDataManager.getMeals();
                    this.meals = updatedData;
                    this.update = 0;
                    this.setState({loading:false});
                })
        
            }
        });

        const updatedData = await this.userDataManager.getMeals();
        this.meals = updatedData;
        this.setState({loading:false});
    }


    changed() {
        this.update = 1;
    }

    async _request(request){

        // { type : "add" , index : null }
        if (request.type === "add") {
            this.props.navigation.navigate('MealsDialogs', 
            { isEdit : false, value : null, changed:this.changed.bind(this)}) 
        // { type : "add" , index : 0 }
        } else if (request.type === "edit") {
            this.props.navigation.navigate('MealsDialogs', 
            { isEdit : true, userData : request.value, changed:this.changed.bind(this)})  
        } else if (request.type === "delete") {

            this.setState({loading:true}, async() => {
                await this.userDataManager.deleteMeals(request.mealid);
                const updatedData = await this.userDataManager.getMeals();
                this.meals = updatedData;
                this.setState({loading:false});
            });

        } else if  (request.type === "select") {
            this.props.navigation.navigate('MealsDetail', 
            { mealid : request.mealid, changed:this.changed.bind(this)})  
        } else {

        }
    }


    todayList(){


        return MyDate.getToday(this.meals);

        /* old today function.
        const isToday = (someDate) => {

            const today = new Date().toLocaleString("en-US", {timeZone: "America/Chicago"})

            let converter = today.split('/');
            let day = converter[0];
            let month = converter[1];
            let year = converter[2].split(',')[0];
            let converter1 = someDate.split('/');
            let day1 = converter1[0];
            let month1 = converter1[1];
            let year1 = converter1[2].split(',')[0];
            return day == day1 &&
            month == month1 &&
            year == year1
        }

        let test = this.meals.filter((value)=> {
            let myDate = new Date(value.date).toLocaleString("en-US", {timeZone: "America/Chicago"});
            return isToday(myDate);
        })
        return test;*/
    }

    getChips(chiplist){
        console.log(chiplist);
        if (chiplist.length === 0) {
            return null
        } else {
            return(
            <React.Fragment>
            <ChipMaker styles={this.styles} data={chiplist}></ChipMaker>
            <Divider style={[this.styles.divider,{marginBottom:10}]}></Divider>
            </React.Fragment>
            )
        }
    }

    getCards(){
        
        const meallist = this.state.isSwitchOn ?  this.todayList() : this.meals;

            return meallist.map((value, index) => {

                let date = new Date(value.date);
                const chiplist = value.food.map((value) => {return value.name})
                
                return (
                    <Card key={index+"_meals"} style={this.styles.cardContainer} onPress={()=> this._request({type:"select", mealid:value.id})}>
                    <View style={{display:"flex", flex:1,flexDirection:"row",justifyContent:"space-between"}}>
                        <View style={{}}>
                            <Text style={this.styles.cardHeader}>{value.name}</Text>
                            <Paragraph>
                            <Text style ={this.styles.cardSubtitle}>
                                * Date : {date.toLocaleString("en-US", {timeZone: "America/Chicago"})}
                            </Text>
                            </Paragraph>
                        </View>
                        <View style={{justifyContent:"center"}}>
                            <Ionicons name={"ios-arrow-forward"} size={35}> </Ionicons>
                        </View>
                    </View>
    
                    <Divider style={this.styles.divider}></Divider>
                    {this.getChips(chiplist)}
                    <View style={styles.buttonContainer}>
                    <Button style={styles.button_edit}
                    icon="square-edit-outline" 
                    mode="contained" 
                    onPress={() => this._request({type:"edit", mealid:value.id, value:value})}>
                        EDIT
                    </Button>
                    <Button style={styles.button_delete} icon="delete" mode="contained" onPress={() => 
                        this._request({type:"delete", mealid:value.id})            
                    }>
                        DELETE
                    </Button>
                    </View> 
                   </Card>
    
            )})

        }

    //getchips..

    render(){

        return(
            <View style={styles.container}>
            <Loading visible={this.state.loading}></Loading>
         
            <View style={{display:"flex", flexDirection:"row", alignContent:"center", alignItems:"center", height:25}}> 
                <Ionicons name="md-checkmark-circle-outline" size={25} style={{color:"#777777"}}></Ionicons>
                <Text style={{marginLeft: 10, fontSize:20, fontWeight:'bold'}}> Filter </Text>
                </View>

                <View style={{marginTop: 10, display:"flex", flexDirection:"row", alignItems:"center", height:35}}> 
                <Switch
                    value={this.state.isSwitchOn}
                    color="#171F33"
                    onValueChange={() =>
                    { this.setState({ isSwitchOn: !this.state.isSwitchOn }); }
                    }
            />
            <Text style={this.styles.description}> See only today's meal </Text>
            </View>

            <Divider style={this.styles.divider}></Divider>

            <ScrollView>
            {this.getCards()}
            </ScrollView>
            <FAB
            style={[styles.fab,{backgroundColor : "#171F33"}]}
            icon={"plus"}
            accessibilityLabel="add activity"
            color = "#FFFFFF"
            onPress={()=> this._request({type:"add"})}
            />
            </View>
        )
    }
}
export default Meals;


const styles = StyleSheet.create({
    fab: {
      position: 'absolute',
      margin:20,
      bottom:0,
      right:0,
    },container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: 'center',
        alignContent:'center',
        backgroundColor: '#ecf0f1',
        padding: 8,
      },
      paragraph: {
        paddingBottom: 10,
      },
      card : {
        display: "flex",
        backgroundColor: '#fff',
        padding: 10,
        borderWidth: 1,
        borderRadius:5,
        margin:10,
      },
      heading: {
        marginTop: 5,
        marginBottom: 5,
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'left',
      },

      divider :{
          margin:10
      },
      buttonContainer:{
        display:"flex",
        flexDirection: "row",
        justifyContent:'center',
        alignContent:'center',
        marginLeft:5,
        marginRight:5,
      },
      button_edit: {
        flexGrow:10,
        marginRight:10,
        backgroundColor: "#4CAF50",
      },
      button_delete: {
        flexGrow:0,
        backgroundColor: "#d11a2a",
      },

      dialogContainer:{
          marginBottom:10,
          marginLeft:20,
          marginRight:20,
      },
      dialogHeader:{
        fontSize:23,
        fontWeight:'bold',
        marginBottom:8
      },
      surface: {
        padding: 8,
        height: 80,
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
      }


  })
  
  
  