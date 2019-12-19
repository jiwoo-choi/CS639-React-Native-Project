import React from 'react';
import { 
    ScrollView,
    View,
    StyleSheet, 
    ActivityIndicator,
    StatusBar,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Keyboard
} from 'react-native';


import { 
    Button,
    Text,
    Card,
    FAB,
    Paragraph,
    Divider,
    Switch
} from 'react-native-paper';

import UserDataManager from '../Model/UserDataManager'
import {Ionicons } from "@expo/vector-icons"
import MyDate from '../Util/MyDate';


class Activity extends React.Component {

    //header add.
    //see all activites

    static navigationOptions = {
        title: 'Activities',
        headerTintColor : "#fff",
        headerStyle: {backgroundColor : "#171F33"}
      };

    constructor(props){

        super(props)

        this.state={
            loading:true,
            isSwitchOn:true,
            visible:false,
            isEdit:false,
        }

        this.userDataManager = new UserDataManager();
        this.userDataManager.userData = this.props.screenProps.userData;
        this.styles = this.props.screenProps.styles.activities;
        console.log(this.props.screenProps);
        this.activities = [];
        this.currentSelectedAcitivity = {};
        this.update = 0;
    }


    changed() {
        this.update = 1;
    }


    async componentDidMount(){

        this.focusListener = this.props.navigation.addListener('didFocus', async() => {

            if (this.update) {

        
                this.setState({loading:true}, async() => {

                    const updatedData = await this.userDataManager.getActivities();
                    this.activities = updatedData;
                    this.update = 0;
                    this.setState({loading:false});
                })
        
            }
        });

        const updatedData = await this.userDataManager.getActivities();
        this.activities = updatedData;
        this.setState({loading:false});
    }


    async deleteData(id){
        this.setState({loading:true}, async() => {
            await this.userDataManager.deleteActivities(id);
            const updatedData = await this.userDataManager.getActivities();
            this.activities = updatedData;
            this.setState({loading:false});
            this.forceUpdate();
        });
    }

    todayList(){
        return MyDate.getToday(this.activities);
    }
 
    getCards(){

        const activities = this.state.isSwitchOn ?  this.todayList() : this.activities;

        return activities.map((value,index) => {

            let date = new Date(value.date);
            
            return (
                <Card key={index+"_activity"} style={this.styles.cardContainer}>

                <Text style={this.styles.cardHeader}>{value.name}</Text>

                <Paragraph>
                    <Text style ={this.styles.cardSubtitle}>
                        * Duration : {value.duration} min.
                    </Text>
                </Paragraph>
                <Paragraph>
                    <Text style ={this.styles.cardSubtitle}>
                        * Date : {date.toLocaleString("en-US", {timeZone: "America/Chicago"})}
                    </Text>
                </Paragraph>
                <Paragraph>
                    <Text style ={this.styles.cardSubtitle}>
                        * Calories : {value.calories} Kcal.
                    </Text>
                </Paragraph>

                <Divider style={this.styles.divider}></Divider>

                <View style={styles.buttonContainer}>
                <Button style={styles.button_edit}
                icon="square-edit-outline" 
                mode="contained" 
                onPress={() => this._goToEditor({type:"edit", value:activities[index]})}>
                    EDIT
                </Button>
                <Button style={styles.button_delete} icon="delete" mode="contained" onPress={() => 
                    this.deleteData(value.id)                
                }>
                    DELETE
                </Button>
                </View>
               </Card>
        )})
    }
    

    _goToEditor(request){

            // { type : "add" , index : null }
            if (request.type === "add") {
                this.props.navigation.navigate('ActivityModal', 
                { isEdit : false, userData : null, changed:this.changed.bind(this)}) 
            // { type : "add" , index : 0 }
            } else if (request.type === "edit") {
                this.props.navigation.navigate('ActivityModal', 
                { isEdit : true, userData : request.value, changed:this.changed.bind(this)})  
            } else {
            }
            
    }


    /*
    async _confirmModal(activity){

        this.setState({visible: false})

        if (this.state.isEdit) {
            await this.editData(activity)
        } else {
            await this.addData(activity)
        }
    }*/


    durationMapper(type){

        if (type === undefined) {
            return 0;
        } else {
            switch(type) {
                case 15:
                    return 1;
                case 30:
                    return 2;
                case 60:
                    return 3;
                case 90:
                    return 4;
                default:
                    return 0;
            }
        }
        
    }

    dateParser(date){
        if (date === undefined) {
            return 0;
        } else {
            let a = new Date(date);
            return a;
        }
    }


    render(){

        if (this.state.loading) {
            return (
                <View style={styles.container}>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
              </View>
             );
        } else {

            return(
                <View style={styles.container}>
                
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
                <Text style={this.styles.description}> See only today's activities </Text>

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
                onPress={() => 
                    this._goToEditor({type:"add"})
                }/>
                </View>
            );
        }
    }
    
}

/*
                <ActivityModal 
                    onDismiss={this._hideModal.bind(this)}
                    onConfirm={this._confirmModal.bind(this)}
                    visible={this.state.visible}
                    isEdit={this.state.isEdit}
                    id={this.currentSelectedAcitivity.id}
                    name={this.currentSelectedAcitivity.name}
                    calories={this.currentSelectedAcitivity.calories}
                    date={this.dateParser(this.currentSelectedAcitivity.date)}
                    durationType={this.durationMapper(this.currentSelectedAcitivity.duration)}
                />


*/

export default Activity;

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


  })
  
  
  