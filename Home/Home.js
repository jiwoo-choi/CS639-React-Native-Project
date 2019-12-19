
import React from 'react';
import { Text, View, StyleSheet, ScrollView, ActivityIndicator, StatusBar} from 'react-native';
import UserDataManager from '../Model/UserDataManager'
import { Button, Card, Title, Paragraph, Divider } from 'react-native-paper';
import ChipMaker from './ChipMaker';

class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'Home',
    headerTintColor : "#fff",
    headerStyle: {backgroundColor : "#171F33"}
  };

  constructor(props){
    
    super(props)

    this.state = {
      loading : true
    }

    this.userDataManager = new UserDataManager();
    this.userDataManager.userData = this.props.screenProps.userData;
    this.styles = this.props.screenProps.styles.home;

    //DUMMY FOR REACT-NATIVE 2 ASSIGNMENT

    /*
    let meal = new MealData();
    let food = new FoodData();

    //there should be only FOUR!
    let mealData = meal.makeDummydata();
    let foodData = food.makeDummydata();


    this.mealDataDisplay = mealData.map((value) => {
      const foodDataTemp = foodData.map((food) => {
        return new FoodData(food);
      })

      value.food = foodDataTemp;
      return new MealData(value);
    })*/

    this.todayActivity = [];
    this.todayMeals = [];
  }

  async componentDidMount(){

    this.focusListener = this.props.navigation.addListener('didFocus', async() => {
      this.setState({loading:true}, async()=>{
          const activities = await this.userDataManager.getTodayActivity();
          const meals = await this.userDataManager.getTodayMeals();
          this.todayActivity = activities;
          this.todayMeals = meals;
          this.setState({loading:false});
        })
    });
  }


  getTodayMeals(){
    
    if (this.todayMeals.length === 0) {

        return(
          <View style={this.styles.emptyCard}>
            <Text style={this.styles.cardHeader}> You don't have any meals yet </Text>
            <Button onPress={()=>{this.props.navigation.navigate('Meals')}}> Add Meals.. </Button>
          </View>
        )
      } else {
        return this.todayMeals.map((value,index) => {
          return(
          <Card style={this.styles.cardContainer} key={index+"today_meal"}>
          <Card.Content>
            <Title><Text style={this.styles.cardHeader}>{value.name}</Text></Title>
            <Paragraph><Text style={this.styles.cardSubtitle}>* Total Calories : {this.getCaloriesTotal(value)}</Text></Paragraph>
            <View style ={{height:10}}/>
            <ChipMaker styles={this.styles} data={value.food.map((value)=>value.name)}></ChipMaker>
            </Card.Content>
        </Card>);
        })

    }
} 

  getCaloriesTotal(meals){
    let totalCalories = 0;
      meals.food.map((value) => {
          totalCalories = totalCalories + value.calories;
    })
    return totalCalories;
  }





  getTodayActivity(){

    if (this.todayActivity.length === 0) {

      return(
        <View style={this.styles.emptyCard}>
          <Text style={this.styles.cardHeader}> You don't have any activities yet </Text>
          <Button onPress={()=>{this.props.navigation.navigate('Activity')}}> Add Activities.. </Button>
        </View>
      )
    } else {
      return this.todayActivity.map((value,index) => {
        return(
        <Card style={this.styles.cardContainer} key={index+"today_Activity"}>
        <Card.Content>
          <Title><Text style={this.styles.cardHeader}>{value.name}</Text></Title>
          <Paragraph> <Text style={this.styles.cardSubtitle}>* Total Calories : {value.calories} </Text>
          </Paragraph>
        </Card.Content>
       </Card>);
      })
  }}


  render() {
 
      
    if (this.state.loading === true) {

      return(
        <View style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
      );

    }  else {
      return (
        <View style={{ flex: 1 }}>
        <ScrollView>
        <View style={this.styles.container}>
        <Text style={this.styles.header}>Today's Meal</Text> 
        {this.getTodayMeals()}
        <Text style={this.styles.header}>Today's Activity</Text>
        {this.getTodayActivity()}
        </View>
        </ScrollView>
        <Divider style={{backgroundColor:"#A9A9A9"}}></Divider>
        <Button mode="contained" icon="calendar-check" style={this.styles.bottomButton} onPress={()=> this.props.navigation.navigate('Report')} > GET TRACKER REPORT </Button>
        </View>
      );
    }
    }
}

export default HomeScreen;




//just for IDE
const styles = StyleSheet.create({

  //Page # 1

  container:{
    marginLeft:10,
    marginRight:10,
  },

  chipText : {
    color:"#000",
  },
  chipBackground: {
  },
  
  header:{
    fontWeight:'500',
    fontSize:28,
  },

  cardContainer:{
    borderWidth: 1,
  },

  cardHeader:{
  }, 

  cardSubtitle:{
  }

});