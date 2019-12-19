import React, { Component } from 'react';
import { Container, Header, Tab, Tabs, ScrollableTab, Left, Right, Body, Button , Icon, Title,Text, TabHeading} from 'native-base';
import DailyReport from './DailyReport';
import WeekelyReport from './WeeklyReport';


export default class TabsScrollableExample extends Component {

    static navigationOptions = {
        header: null 
    };
      
      
    render() {
    
    return (
      <Container>
        <Header style={{backgroundColor : "#171F33"}}>
          <Left>
          <Button transparent onPress={()=> this.props.navigation.goBack()}>
            <Icon name='arrow-back' style={{color:"#fff"}}/>
            <Text style={{color:"#fff"}}>Back</Text>
          </Button>
          </Left>
          <Body>
            <Title style={{color:"#fff"}}>Report</Title>
          </Body>
          <Right />
        </Header>

        <Tabs renderTabBar={()=> <ScrollableTab />}>
          <Tab heading="Daily">
            <DailyReport styles={this.props.screenProps.styles.home} userData={this.props.screenProps.userData}/>
          </Tab>
          <Tab heading="Weekely">
            <WeekelyReport styles={this.props.screenProps.styles.home} userData={this.props.screenProps.userData}/>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}