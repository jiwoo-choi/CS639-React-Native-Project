import { 
    
    View,
    Text, 
    StyleSheet, 
    Keyboard, 
    KeyboardAvoidingView,
    TouchableWithoutFeedback, 
    ScrollView
} from 'react-native';

import { FAB, Card, Chip , Modal, Portal,TextInput, Button, Divider} from 'react-native-paper';
import React from 'react';
import { Dimensions, } from "react-native";
import { Paragraph, Menu, Provider } from 'react-native-paper';
import UserDataManager from '../../Model/UserDataManager'
import Loading from './Loading'

class FoodSearchList extends React.Component {
    

    static navigationOptions = ({ navigation }) => ({
        title: "Foods List",
        headerTintColor : "#fff",
        headerStyle: {backgroundColor : "#171F33"}
    });

    constructor(props) {

        super(props)

        this.state = {
            loading:true
        }
        this.userDataManager = new UserDataManager();
        this.userDataManager.userData = this.props.screenProps.userData;
        this.styles = this.props.screenProps.styles.meals;
        this.foodsearchlist = [];

    }
    

    async componentDidMount(){
        const list = await this.userDataManager.getFoodsList();
        this.foodsearchlist = list;
        this.setState({loading:false});
    }


    done(){
        this.props.navigation.getParam('changed')();
        this.props.navigation.goBack();
    }


    getCards(){

        return this.foodsearchlist.map((value,index) => {

            return (
                <Card key={index+"_foodlist"} style={this.styles.cardContainer}>
                <View style={{display:"flex", flex:1,flexDirection:"row",justifyContent:"space-between"}}>
                    <View style={{}}>
                        <Text style={this.styles.cardHeader}>{value.name}</Text>
                        <Paragraph>
                        <Text style={this.styles.cardSubtitle}>
                        * total Calories : {value.calories}
                        </Text>
                        </Paragraph>
                        <Paragraph>
                        <Text style={this.styles.cardSubtitle}>
                        * carbohydrates : {value.carbohydrates}
                        </Text>
                        </Paragraph><Paragraph>
                        <Text style={this.styles.cardSubtitle}>
                        * protein : {value.protein}
                        </Text>
                        </Paragraph><Paragraph>
                        <Text style={this.styles.cardSubtitle}>
                        * fat : {value.fat}
                        </Text>
                        </Paragraph>


                    </View>
                </View>

                <Divider style={this.styles.divider}></Divider>

                <View style={styles.buttonContainer}>
                <Button style={styles.button_edit}
                icon="plus-box-outline" 
                mode="contained" 
                onPress={ async() => {
                    
                   
                    this.setState({loading:true});
                    const mealid = this.props.navigation.getParam('mealid');
                    await this.userDataManager.addFoodsToMeal(mealid, this.foodsearchlist[index]);
                    this.props.navigation.getParam('changed')();
                    this.props.navigation.goBack();
                }}>
                    ADD This Food
                </Button>
                </View>
               </Card>

        )})
    }

    render(){
        return(
            <View>
                <Loading visible={this.state.loading}/>
                <ScrollView>
                    {this.getCards()}
                    <View style={{height:70}}></View>
                </ScrollView>
                <FAB
                style={[styles.fab,{backgroundColor : "#171F33"}]}
                icon={"plus"}
                accessibilityLabel="add activity"
                color = "#FFFFFF"
                label = "CREATE YOUR OWN"
                onPress={() =>  {

                    const mealid = this.props.navigation.getParam('mealid');
                    this.props.navigation.navigate('FoodDialogs', 
                    { mealid: mealid, done:this.done.bind(this)})  
                    }

                }/>
            </View>
        )
    }
}

export default FoodSearchList;

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
  
  
  