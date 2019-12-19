import {View, Alert, AsyncStorage, ScrollView} from 'react-native'
// import {Card, Button, Title, Paragraph, Switch} from 'react-native-paper'

import React, { Component } from 'react';
import { Container, Header, Content, Button, ListItem, Text, Icon, Left, Body, Right, Switch } from 'native-base';

import UserDataManager from '../Model/UserDataManager'
class AccountSetting extends React.Component {

    static navigationOptions = {
        title: 'Setting',
        headerTintColor : "#fff",
        headerStyle: {backgroundColor : "#171F33"}
      };

    constructor(props){
        super(props)

        this.state ={
            switchOn : false,
        }
        this.userDataManager = new UserDataManager();
        this.userDataManager.userData = this.props.screenProps.userData;
        this.styles = this.props.screenProps.styles.profile;
        
    }

    render(){
        return(
            
            <Container>
            <Content>
              <ListItem icon>
                <Left>
                  <Button style={{ backgroundColor: "#007AFF" }}>
                    <Icon active type="FontAwesome" name="universal-access" />
                  </Button>
                </Left>
                <Body>
                  <Text>Big Text Size Mode</Text>
                </Body>
                <Right>
                  <Switch value={this.props.screenProps.textMode} onValueChange={()=>
                    this.props.screenProps.textModeUpdate()}></Switch>
                </Right>
              </ListItem>
              <View style={{height:20}}></View>
              <ListItem>
              </ListItem>
              <ListItem onPress={async()=>{
                    await AsyncStorage.clear();
                    this.props.screenProps.logout();
              }}>
                <Body>
                  <Text style={{textAlign:'center', color:"red"}}>Sign Out</Text>
                </Body>
              </ListItem>
              <View style={{height:20}}></View>
              <ListItem>
              </ListItem>
              <ListItem onPress={async()=>{

                    Alert.alert(
                        'Delete',
                        'Are you sure you want to delete your account?',
                        [
                        {
                            text: 'Yes',
                            onPress: async() => {
                                await this.userDataManager.deleteUser();
                                this.props.screenProps.logout();
                            },
                            style: 'destructive',
                        },                       
                        {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                        },
                        ],
                        {cancelable: true},
                    );

                    }}>
                <Body>
                  <Text style={{textAlign:'center', color:"red"}}>Deactivate Your Account</Text>
                </Body>
              </ListItem>
            </Content>

                    </Container>
            // <View style={{flex:1}}>
            //     <ScrollView>
            //     <Card style ={this.styles.cardContainer}>
            //         <Card.Content>
            //         <Title style={this.styles.cardHeader}>Sign out</Title>
            //         <Paragraph style={this.styles.cardSubtitle}>Sign out this app.</Paragraph>
            //         </Card.Content>
            //         <Card.Actions>
            //         <Button style={[this.styles.bottomButton,{backgroundColor:"#171F33"}]} icon="logout" mode ="contained" onPress={ async()=>{
            //                 await AsyncStorage.clear();
            //                 this.props.screenProps.logout();
            //             }
            //         }> Sign Out </Button>
            //         </Card.Actions>
            //     </Card>

            //     <Card style ={this.styles.cardContainer}>
            //         <Card.Content>
            //             <Title style={this.styles.cardHeader}>Deactivate your account</Title>
            //             <Paragraph style={this.styles.cardSubtitle}>This will delete your account from our server.</Paragraph>
            //         </Card.Content>
            //         <Card.Actions>
            //         <Button style={[this.styles.bottomButton,{backgroundColor:"#d11a2a"}]} mode ="contained" icon ="delete-forever" onPress={ ()=>{

                        // Alert.alert(
                        //     'Delete',
                        //     'Are you sure you want to delete your account?',
                        //     [
                        //     {
                        //         text: 'Yes',
                        //         onPress: async() => {
                        //             await this.userDataManager.deleteUser();
                        //             this.props.screenProps.logout();
                        //         },
                        //         style: 'destructive',
                        //     },                       
                        //     {
                        //         text: 'Cancel',
                        //         onPress: () => console.log('Cancel Pressed'),
                        //         style: 'cancel',
                        //     },
                        //     ],
                        //     {cancelable: true},
                        // );
  
            //             }
            //         }> Delete Your Account </Button>
            //         </Card.Actions>
            //     </Card>

            //     <Card style ={this.styles.cardContainer}>
            //         <Card.Content>
            //         <Title style={this.styles.cardHeader}>Text Size</Title>
            //         <Paragraph style={this.styles.cardSubtitle}>Text style will be changed. </Paragraph>
            //         </Card.Content>
            //         <Card.Actions>
            //         <Switch
            //         value={true}
            //         color="#142B70"
            //         onValueChange={() =>
            //         { this.setState({ isSwitchOn: !this.state.isSwitchOn }) }}
            //         />    
            //         </Card.Actions>
            //     </Card>




            //     </ScrollView>
            // </View>
        )
    }
}

export default AccountSetting;