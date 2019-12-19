import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import { FontAwesome, MaterialCommunityIcons, Entypo} from '@expo/vector-icons'; 

import Home from './Home/Home';
import Profile from './Profile/Profile';
import Activity from './Activities/Activity'
import Report from './Home/Report/Report'
import AccountSetting from './Profile/AccountSetting'
import ProfileDialog from './Profile/ProfileDialog'
import ActivityModal from './Activities/ActivityModal'
import Meals from './Meals/Meals'
import MealsDialogs from './Meals/MealsDialogs'
import MealsDetail from './Meals/MealsDetail'
import FoodSearchList from './Meals/Foods/FoodSearchList'
import FoodDialogs from './Meals/Foods/FoodDialogs'


const HomeStack = createStackNavigator(
    {
      Home: Home,
      Report: Report,
    }, 
    {
        initialRouteName: 'Home',
    }
  )

const ProfileStack = createStackNavigator(
    {
      Profile: Profile,
      AccountSetting: AccountSetting,
      ProfileDialog:ProfileDialog
    }, 
    {
      initialRouteName: 'Profile',
    }
 )

const ActivityStack = createStackNavigator(
  {
    Activity : Activity,
    ActivityModal : ActivityModal,
  },
  {
    initialRouteName: 'Activity',
  }
)
  

const MealStack = createStackNavigator(
  {
    Meals : Meals,
    MealsDialogs:MealsDialogs,
    MealsDetail: MealsDetail,
    FoodSearchList: FoodSearchList,
    FoodDialogs :FoodDialogs
  },
  {
    initialRouteName: 'Meals',
  }
)
  

class Tabbar extends React.Component {

  render(){
    return(<TabbarConst></TabbarConst>);
  }
}
  

const MainNavigationWrapper = createBottomTabNavigator(
    {
      Home: { 
        screen: HomeStack,
        path : '/',
        navigationOptions: {
          tabBarIcon: ({ focused, tintColor }) => {
              return <FontAwesome name={"home"} size={25} color={tintColor} />;
          }
      }},

      Meals:{
        screen: MealStack ,
        path : '/',
        navigationOptions: {
          tabBarIcon: ({ focused, tintColor }) => {
              return <Entypo name={"bowl"} size={25} color={tintColor} />;
          }
        }
      },

      Activity: { 
        screen: ActivityStack ,
        path : '/',
        navigationOptions: {
          tabBarIcon: ({ focused, tintColor }) => {
              return <MaterialCommunityIcons name={"run-fast"} size={25} color={tintColor} />;
          }
        }
      },


      Profile: { 
        screen: ProfileStack ,
        path : '/',
        navigationOptions: {
          tabBarIcon: ({ focused, tintColor }) => {
              return <FontAwesome name={"user"} size={25} color={tintColor} />;
          }
        }
      },

      
    },
    {
      tabBarOptions: {
          showLabel: true, 
          activeTintColor: '#F8F8F8', 
          inactiveTintColor: '#586589',  
          style: {
              backgroundColor: '#171F33'
          }
      }
  });
  
  export default createAppContainer(MainNavigationWrapper);


