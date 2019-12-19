import React from 'react';
import { 
    View, 
    StyleSheet,
    ActivityIndicator,
    StatusBar,
    ScrollView
} from 'react-native';

import { 
    Card,
    IconButton,
    Button,
    Title,
    DataTable
} from 'react-native-paper';


import { EvilIcons } from '@expo/vector-icons'; 

import { Text } from 'react-native-paper';
import ProfileDialog from './ProfileDialog';
import UserDataManager from '../Model/UserDataManager';

class Profile extends React.Component {


    static navigationOptions = {
        title: 'Profile',
        headerTintColor : "#fff",
        headerStyle: {backgroundColor : "#171F33"}
      };

      

    constructor(props) {

        super(props);

        this.state = {
            loading : true,
            visible: false,
            currentType:0,
            currentTitle:"",
            username:"",
            goalData:{},
        }

        this.getName = {};

        this.userDataManager = new UserDataManager();
        this.userDataManager.userData = this.props.screenProps.userData;
        this.styles = this.props.screenProps.styles.profile;

        this.update = 0;
    }


    initialMapper(value){
        let result = {};
        for (const val of Object.keys(value)) {
            let key = value[val];
            if (key === 0 || key === null || key === "" || key === undefined) {
                result[val] = 'Nan';
            } else {
                result[val] = key.toString();
            }
        }
        return result;
    }
    
    displayMapper(data) {   
        let value = this.initialMapper(data);
        console.log(value);
        result = {};
        result.firstName = value.firstName;
        result.lastName = value.lastName;
        result.goalDailyActivity = value.dailyactivity;
        result.goalDailyCalories = value.dailycal;
        result.goalDailyCarbohydrates = value.dailycarbo ;
        result.goalDailyFat = value.dailyfat;
        result.goalDailyProtein = value.dailyprotein;
        console.log(result);
        return result;
    }
    
    changed(){
        this.update = 1;
    }
    
    async componentDidMount(){
        
        this.focusListener = this.props.navigation.addListener('didFocus', async() => {

            if (this.update) {
                this.setState({loading:true});
                const response = await this.userDataManager.getUserData();
                this.setState({goalData:this.displayMapper(response), loading:false});
                this.update = 0;
            }
        });

        
        try {
            const response = await this.userDataManager.getUserData();
            this.setState({username:this.userDataManager.userData.id, goalData:this.displayMapper(response),loading: false});
        } catch (error) {
            alert(error);
        }

    }

    render() {

        if (this.state.loading) {
        return (
            <View style={styles.container}>
              <ActivityIndicator />
              <StatusBar barStyle="default" />
            </View>
          );
        } else {
        return(
                <View style={{flex: 1, alignItems:'stretch'}}>
                <View style={{marginTop:10 ,alignItems : 'center'}}>
                <Text style={this.styles.header}> Welcome! {this.state.username} </Text>
                </View>
                <Button style={{margin:20, marginBottom:10, padding: 5, backgroundColor:'#171F33'}} mode="contained" icon="account-edit" onPress={()=> { this.props.navigation.navigate('ProfileDialog', { userData : this.userDataManager.userData, changed:this.changed.bind(this)})}}> Edit your TRACKER Info </Button>
                <Button style={{marginLeft:20, marginRight:20, marginBottom:20, backgroundColor:'#171F33'}} mode="contained" icon="settings" onPress={()=> this.props.navigation.navigate('AccountSetting')}> Setting </Button>
                <Text style={this.styles.subheader}> My Daily Goal Info </Text>
                <ScrollView style={styles.scrollView}>
                
                <DataTable>
             
                <View style={{height:20}}></View>

                <DataTable.Header>
                <DataTable.Title><Text style={this.styles.tableHeader}>Nuturition</Text></DataTable.Title>
                <DataTable.Title numeric><Text style={this.styles.tableHeader}>Goal(g)</Text></DataTable.Title>
                </DataTable.Header>

                <DataTable.Row>
                <DataTable.Cell><Text style={this.styles.tableDescription}>Carbohydrate</Text></DataTable.Cell>
                <DataTable.Cell numeric><Text style={this.styles.tableDescription}> {this.state.goalData.goalDailyCarbohydrates}</Text></DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                <DataTable.Cell><Text style={this.styles.tableDescription}>Protein</Text></DataTable.Cell>
                <DataTable.Cell numeric><Text style={this.styles.tableDescription}>{this.state.goalData.goalDailyProtein}</Text></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>

                <DataTable.Cell><Text style={this.styles.tableDescription}>Fat</Text></DataTable.Cell>
                <DataTable.Cell numeric><Text style={this.styles.tableDescription}>{this.state.goalData.goalDailyFat}</Text></DataTable.Cell>
                </DataTable.Row>

                <View style={{height:20}}></View>


                <DataTable.Header>
                <DataTable.Title><Text style={this.styles.tableHeader}>Nuturition</Text></DataTable.Title>
                <DataTable.Title numeric><Text style={this.styles.tableHeader}>Goal(Kal)</Text></DataTable.Title>
                </DataTable.Header>

                <DataTable.Row>
                <DataTable.Cell><Text style={this.styles.tableDescription}>Calories</Text></DataTable.Cell>
                <DataTable.Cell numeric><Text style={this.styles.tableDescription}>{this.state.goalData.goalDailyCalories}</Text></DataTable.Cell>
                </DataTable.Row>

                <View style={{height:20}}></View>
                <DataTable.Header>
                <DataTable.Title><Text style={this.styles.tableHeader}>Activitiy</Text></DataTable.Title>
                <DataTable.Title numeric><Text style={this.styles.tableHeader}>Goal (Duration)</Text></DataTable.Title>
                </DataTable.Header>

                <DataTable.Row>
                <DataTable.Cell><Text style={this.styles.tableDescription}>Activitiy</Text></DataTable.Cell>
                <DataTable.Cell numeric><Text style={this.styles.tableDescription}>{this.state.goalData.goalDailyActivity}</Text></DataTable.Cell>
                </DataTable.Row>

                </DataTable>
                </ScrollView>
                </View>
            );
       
        }
        }
}

export default Profile;

const styles = StyleSheet.create({
    name:{
        fontSize:30,
        fontWeight:'bold'
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    scrollView:{
        flex:1,
        marginHorizontal: 20,
    }
  });


  /*

  _showDialog = (value) => {this.setState({currentType: value},()=>{this.setState({ visible:true})})} ; 
  _hideDialog = () => this.setState({visible: false, currentType: 0});

  _editDialog = (type, value1, value2) => {

        if(type !== 1 && isNaN(value1)) {
            alert('it should be number') // number to change.. profile... // name goal.
            return;
        }

        let values = {};

        switch(type){
            case 1:
                values.firstName = value1;
                values.lastName = value2;
                break;
            case 2:
                values.goalDailyCalories = value1;
                break;
            case 3:
                values.goalDailyCarbohydrates = value1;
                break;
            case 4:
                values.goalDailyProtein = value1;
                break;
            case 5:
                values.goalDailyFat  = value1;
                break;
            case 6:
                values.goalDailyActivity = value1;
                break;
            default:
                break;
        }

        
        this.setState({visible: false, loading:true, currentType : 0}, 
            ()=>{
                this.editData(values);
            })
  };


  */