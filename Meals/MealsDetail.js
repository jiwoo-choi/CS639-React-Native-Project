import { 
    
    View,
    Text, 
    StyleSheet, 
    Keyboard, 
    KeyboardAvoidingView,
    TouchableWithoutFeedback, 
    ScrollView,
    
} from 'react-native';

import { Card ,Paragraph, Button, Divider} from 'react-native-paper';
import React from 'react';
import { Ionicons} from  '@expo/vector-icons'
import UserDataManager from '../Model/UserDataManager'
import Loading from './Foods/Loading'
import ChartMaker from './CartMaker'



class MealsDetail extends React.Component {
    

    static navigationOptions = ({ navigation }) => ({
        title: typeof(navigation.state.params)==='undefined' || typeof(navigation.state.params.title) === 'undefined' ? 'details': navigation.state.params.title,
        headerTintColor : "#fff",
        headerStyle: {backgroundColor : "#171F33"}
    });


    constructor(props){
        super(props)

        this.state ={ 
            loading:true
        }

        this.userDataManager = new UserDataManager();
        this.userDataManager.userData = this.props.screenProps.userData;
        this.styles = this.props.screenProps.styles.meals;
        this.update = 0;
        this.foodlist = [];

        
    }

    async componentDidMount(){

        this.focusListener = this.props.navigation.addListener('didFocus', async() => {

            if (this.update) {
                const mealid = this.props.navigation.getParam('mealid');
                this.setState({loading:true}, async() => {
                    const updatedData = await this.userDataManager.getFoodsFromMeal(mealid);
                    this.foodlist = updatedData;
                    this.update = 0;
                    this.setState({loading:false});
                })
        
            }
        });

        const mealid = this.props.navigation.getParam('mealid');
        const updatedData = await this.userDataManager.getFoodsFromMeal(mealid);
        this.foodlist = updatedData;
        this.setState({loading:false});
    }

    changed(){
        this.update = 1; 
    }


    _requset(request){

        const mealid = this.props.navigation.getParam('mealid');

        this.props.navigation.getParam('changed')();

        // { type : "add" , index : null }
        if (request.type === "add") {
            this.props.navigation.navigate('FoodSearchList', 
            { mealid:mealid ,changed:this.changed.bind(this)})    
        } else if (request.type === "edit") {
            this.props.navigation.navigate('FoodDialogs', 
            { isEdit: true, data:this.foodlist[request.index], mealid:mealid, changed:this.changed.bind(this)})    
        } else if (request.type === "delete") {
            const foodid = this.foodlist[request.index].id;

            this.setState({loading:true}, async() => {
                await this.userDataManager.deleteFoodsFromMeal(mealid, foodid);
                const updatedData = await this.userDataManager.getFoodsFromMeal(mealid);
                this.foodlist = updatedData;
                this.setState({loading:false});
            });

        } else {

        }

    }


    getCards(){

        return this.foodlist.map((value,index) => {
            return (
                <Card key={index+"_activity"} style={this.styles.cardContainer_detail}>

                <Text style={this.styles.cardHeader}>{value.name}</Text>


                <Paragraph>
                    <Text style={this.styles.description}>
                        * Calories : {value.calories} Kcal
                    </Text>
                </Paragraph>

                <Paragraph>
                    <Text style={this.styles.description}>
                        * Carbo : {value.carbohydrates} g
                    </Text>
                </Paragraph>

                <Paragraph>
                    <Text style={this.styles.description}>
                        * Protein : {value.protein} g
                    </Text>
                </Paragraph>


                <Paragraph>
                    <Text style={this.styles.description}>
                        * Fat : {value.fat} g
                    </Text>
                </Paragraph>


                <Divider style={this.styles.divider}></Divider>

                <View style={styles.buttonContainer}>
                <Button style={styles.button_edit}
                icon="square-edit-outline" 
                mode="contained" 
                onPress = {() => {this._requset({type:"edit", index:index})} }
                >
                    EDIT
                </Button>
                <Button style={styles.button_delete} icon="delete" mode="contained"
                onPress={()=>{this._requset({type:"delete", index:index})}}
                >
                    DELETE
                </Button>
                </View>
                </Card>

            )
            })
    }

    aggregate(){
        
        return this.foodlist.reduce((prev,current) => {

            let next = prev;
            let total = next.carbohydrates.value+ next.protein.value+next.fat.value
            // let total = (next.carbohydrates.value+ next.protein.value+next.fat.value === 0) ? 1 : next.carbohydrates+ next.protein+next.fat;

            next.carbohydrates.value = current.carbohydrates + next.carbohydrates.value
            total = total + current.carbohydrates;
            
            next.protein.value = current.protein + next.protein.value
            total = total + current.protein;

            next.fat.value = current.fat + next.fat.value
            total = total + current.fat;

            next.carbohydrates.percentage = (next.carbohydrates.value / total) * 100
            next.protein.percentage = (next.protein.value / total) * 100
            next.fat.percentage = (next.fat.value / total) * 100

            next.totalCalories = next.totalCalories + current.calories

            return next

        }, {carbohydrates : {value : 0, percentage:0}, protein:  {value : 0, percentage:0}, fat : {value : 0, percentage:0}, totalCalories:0})

        
    }
    

    render(){

        const data = [
            {
                value: 20,
                label: 'Carbohydrates',
            },
            {
                value: 10,
                label: 'Protein',
            },
            {
                value: 40,
                label: 'Fat',
            }
        ]


        const mealid = this.props.navigation.getParam('mealid');
        let aggregatedData = this.aggregate();

        return(

            <View style={{ flex: 1 }}>
            <Loading visible={this.state.loading}/>

            <Text style={this.styles.subheader}> Total Caloriess : {aggregatedData.totalCalories} Calories </Text>
            <View style={{display:"flex", flexDirection:"row", height:130}}>
            <View style={{flex:1}}>
            <ChartMaker data={aggregatedData}></ChartMaker>
            </View>
            <View style={{flex:1, justifyContent:"space-evenly"}}>
                    <View style={{display:"flex", flexDirection:"row", justifyContent:"flex-start", alignItems:'center'}}>
                        <View style={{width:10, height:10, backgroundColor:'#1A85FF', borderRadius:5}}/>
                        <Text style={this.styles.description}> Carbo. : {aggregatedData.carbohydrates.value} g </Text>
                    </View>

                    <View style={{display:"flex", flexDirection:"row", justifyContent:"flex-start", alignItems:'center'}}>
                        <View style={{width:10, height:10, backgroundColor:'#D41159',borderRadius:5}}/>
                        <Text style={this.styles.description}> Protein : {aggregatedData.protein.value} g </Text>
                    </View>

                    <View style={{display:"flex", flexDirection:"row", justifyContent:"flex-start", alignItems:'center'}}>
                        <View style={{width:10, height:10, backgroundColor:'#4B0092', borderRadius:5}}/>
                        <Text style={this.styles.description}> Fat : {aggregatedData.fat.value} g </Text>
                    </View>

                </View>
            </View>

            <Divider style={this.styles.divider}></Divider>

            <ScrollView>
            {this.getCards()}
            </ScrollView>
            <Divider style={{backgroundColor:"#A9A9A9"}}></Divider>
            <Button mode="contained" icon="plus-box-outline" style={this.styles.bottomButton} onPress={()=> 
                this._requset({type:"add"})} > ADD FOODS </Button>
            </View>
          
        )
    }
}

export default MealsDetail;

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
  
  
  