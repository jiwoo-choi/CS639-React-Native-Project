const color_darknavy = "#171F33";
const color_navy = "#142B70";
const color_lightnavy = "#4652A0";
const color_edit =  "#4CAF50";
const color_delete = "#d11a2a";
const color_warning = "#d11a2a";
const color_add = color_lightnavy;
const color_confirm = color_lightnavy;

import {StyleSheet} from 'react-native'

class Theme {

    constructor(option) {

        this.option = option; //acc option


        //text size & button size option.
        this.accWeight = !option ? "normal" : "bold";
        this.accHeaderSize = !option ? 29 : 35; 
        this.accSubHeaderSize = !option ? 23 : 27;
        this.accRegularSize = !option ? 15 : 20;
        this.accSmallSize = !option ? 14 : 17 ;
        this.accPadding = !option ? 6 : 12;
        this.accDivider = !option? 0.5 : 3;

    }

    getStyleSheet(){
        return {home : this.home(), meals: this.meals(), activities : this.activities(), profile:this.profile()}
    }

    home(){
        return StyleSheet.create({
            //Page # 1
        
            container:{
              marginLeft:15,
              marginRight:15,
              marginTop:10,
            },
        
            //clip
            chipText : {
              color:"#fff",
              fontWeight:this.accWeight,
              fontSize:this.accRegularSize,
            },
        
            chipBackground: {
              backgroundColor:color_lightnavy,
              marginBottom: 10, 
              marginRight:10
            },
            
            header:{
              fontWeight:'bold',
              fontSize:this.accHeaderSize,
              marginTop:10,
            },
        
            subheader:{
              fontWeight:'bold',
              fontSize:this.accSubHeaderSize,
              marginTop:10,
              marginBottom:10,
              marginLeft:15,
            },
        
            description: {
              fontSize:this.accSmallSize,
              color:'#A9A9A9',
            },
            
            //table
            tableHeader:{
              fontSize:this.accRegularSize,
              fontWeight:this.accWeight,
            },
        
            tableDescription:{
              fontSize:this.accSmallSize,
              fontWeight:this.accWeight,
            },
        
            //progress text
        
            progressText:{
              textAlign: 'center', 
              fontWeight:"bold",
              fontSize:this.accSmallSize,
              marginTop:10,
           },
        
           progressBigText:{
            textAlign: 'center', 
            fontWeight:'200',
            fontSize:this.accSubHeaderSize
          },
        
          
            //landing page card
            cardContainer:{
              borderWidth: 1,
              marginTop:10,
              marginBottom:10
            },
        
            cardHeader:{
              fontSize: this.accSubHeaderSize,
              fontWeight:this.accWeight,
              
            }, 
        
            cardSubtitle:{
              fontSize:this.accSmallSize,
              fontWeight:this.accWeight,
            },
        
            emptyCard:{
              marginTop:30,
              marginBottom:30,
              alignItems:'center'
            },
        
            bottomButton:{
              margin:15, 
              padding:this.accPadding,
              backgroundColor:color_navy
            },
        
            buttonColor:{
              color:color_navy
            },
        
            divider:{
              marginBottom:10,
              marginTop:10,
              backgroundColor:"#A9A9A9",
              height:this.accDivider
            },
        
          });
        
    }

    meals(){

        return StyleSheet.create({
            header:{
                fontWeight:'bold',
                fontSize:this.accHeaderSize,
                marginTop:10,
            },
        
            subheader:{
                fontWeight:'bold',
                fontSize:this.accSubHeaderSize,
                marginTop:10,
                marginBottom:10,
                marginLeft:15,
            },
        
            subheader_smaller:{
                fontWeight:'bold',
                fontSize:this.accSubHeaderSize,
            },
        
            description: {
                fontSize:this.accSmallSize,
                color:'#000',
                marginLeft:10,
            },
            
            cardContainer:{
                display: "flex",
                backgroundColor: '#fff',
                padding: 10,
                borderWidth: 1,
                borderRadius:5,
                margin:10,
            },
        
            cardContainer_detail:{
                display: "flex",
                backgroundColor: '#fff',
                padding: 10,
                borderWidth: 1,
                marginTop:10,
                marginBottom:10,
                borderRadius:0,
                borderRightWidth:0,
                borderLeftWidth:0,
            },
        
            cardHeader:{
                fontSize: this.accSubHeaderSize,
                fontWeight:'bold',
                marginBottom:5,
            }, 
        
            cardSubtitle:{
                fontSize:this.accSmallSize,
                fontWeight:this.accWeight,
            },
        
            chipText : {
                color:"#fff",
                fontWeight:this.accWeight,
                fontSize:this.accRegularSize,
            },
        
            chipBackground: {
                backgroundColor:color_lightnavy,
                marginBottom: 10, 
                marginRight:10
            },
        
            bottomButton:{
                margin:15, 
                padding:this.accPadding,
                backgroundColor:color_navy
            },
        
            buttonColor:{
                color:color_navy
            },
        
        
            divider:{
                marginBottom:10,
                marginTop:10,
                backgroundColor:"#A9A9A9",
                height:this.accDivider
            },
        
            errorMessage:{
                height:20,
                marginBottom:10,
            },
            errorMessageStyle:{
            fontSize:this.accRegularSize,
                fontWeight:'bold',
                color:'red',
        }                
        });
    }

    activities(){

        return StyleSheet.create({

            cardContainer:{
                display: "flex",
                backgroundColor: '#fff',
                padding: 10,
                borderWidth: 1,
                borderRadius:5,
                margin:10,
            },
        
            cardContainer_detail:{
                display: "flex",
                backgroundColor: '#fff',
                padding: 10,
                borderWidth: 1,
                marginTop:10,
                marginBottom:10,
                borderRadius:0,
                borderRightWidth:0,
                borderLeftWidth:0,
            },
        
            cardHeader:{
                fontSize: this.accSubHeaderSize,
                fontWeight:'bold',
                marginBottom:5,
            }, 
        
            cardSubtitle:{
                fontSize:this.accSmallSize,
                fontWeight:this.accWeight,
            },

            description: {
                fontSize:this.accSmallSize,
                color:'#000',
                marginLeft:10,
            },
        
            divider:{
                marginBottom:10,
                marginTop:10,
                backgroundColor:"#A9A9A9",
                height:this.accDivider
            },
        });

    }

    profile(){

        return StyleSheet.create({


            cardContainer:{
                
                display: "flex",
                backgroundColor: '#fff',
                padding: 10,
                borderWidth: 1,
                borderRadius:5,
                margin:10,
            },
        
            cardContainer_detail:{
                display: "flex",
                backgroundColor: '#fff',
                padding: 10,
                borderWidth: 1,
                marginTop:10,
                marginBottom:10,
                borderRadius:0,
                borderRightWidth:0,
                borderLeftWidth:0,
            },
        
            cardHeader:{
                fontSize: this.accSubHeaderSize,
                fontWeight:'bold',
                marginBottom:5,
            }, 
        
            cardSubtitle:{
                fontSize:this.accSmallSize,
                fontWeight:this.accWeight,
            },

            header:{
                fontWeight:'bold',
                fontSize:this.accHeaderSize,
                marginTop:10,
            },
        
            subheader:{
                fontWeight:'bold',
                fontSize:this.accSubHeaderSize,
                marginTop:10,
                marginBottom:10,
                marginLeft:15,
            },
        
            subheader_smaller:{
                fontWeight:'bold',
                fontSize:this.accSubHeaderSize,
            },
        
            description: {
                fontSize:this.accSmallSize,
                color:'#000',
                marginLeft:10,
            },
            //table
            tableHeader:{
            fontSize:this.accRegularSize,
            fontWeight:this.accWeight,
            },
        
            tableDescription:{
            fontSize:this.accSmallSize,
            fontWeight:this.accWeight,
            },        
            bottomButton:{
                padding:this.accPadding,
            },

        });

    }

    

}

export default Theme;



/*
    //Accessbility Option.
    const accWeight = !on ? "normal" : "bold";
    const accHeaderSize = !on ? 29 : 35; 
    const accSubHeaderSize = !on ? 23 : 27;
    const accRegularSize = !on ? 15 : 20;
    const accSmallSize = !on ? 14 : 17 ;
    const accPadding = !on ? 6 : 12;

    const accDivider = !on? 0.5 : 3;

    //Universal Color
    const color_darknavy = "#171F33";
    const color_navy = "#142B70";
    const color_lightnavy = "#4652A0";

    const color_edit =  "#4CAF50";
    const color_delete = "#d11a2a";
    const color_warning = "#d11a2a";

    const color_add = color_lightnavy;
    const color_confirm = color_lightnavy;


    const HomeStyle = StyleSheet.create({

      //Page # 1

      container:{
        marginLeft:15,
        marginRight:15,
        marginTop:10,
      },

      //clip
      chipText : {
        color:"#fff",
        fontWeight:accWeight,
        fontSize:accRegularSize,
      },

      chipBackground: {
        backgroundColor:color_lightnavy,
        marginBottom: 10, 
        marginRight:10
      },
      
      header:{
        fontWeight:'bold',
        fontSize:accHeaderSize,
        marginTop:10,
      },

      subheader:{
        fontWeight:'bold',
        fontSize:accSubHeaderSize,
        marginTop:10,
        marginBottom:10,
      },

      description: {
        fontSize:accSmallSize,
        color:'#A9A9A9',
      },
      
      //table
      tableHeader:{
        fontSize:accRegularSize,
        fontWeight:accWeight,
      },

      tableDescription:{
        fontSize:accSmallSize,
        fontWeight:accWeight,
      },

      //progress text

      progressText:{
        textAlign: 'center', 
        fontWeight:"bold",
        fontSize:accSmallSize,
        marginTop:10,
     },

     progressBigText:{
      textAlign: 'center', 
      fontWeight:'200',
      fontSize:accSubHeaderSize
    },

    
      //landing page card
      cardContainer:{
        borderWidth: 1,
        marginTop:10,
        marginBottom:10
      },

      cardHeader:{
        fontSize: accSubHeaderSize,
        fontWeight:accWeight,
        
      }, 

      cardSubtitle:{
        fontSize:accSmallSize,
        fontWeight:accWeight,
      },

      emptyCard:{
        marginTop:30,
        marginBottom:30,
        alignItems:'center'
      },

      bottomButton:{
        margin:15, 
        padding:accPadding,
        backgroundColor:color_navy
      },

      buttonColor:{
        color:color_navy
      },

      divider:{
        marginBottom:10,
        marginTop:10,
        backgroundColor:"#A9A9A9",
        height:accDivider
      },

    });


    const MealStyle = StyleSheet.create({

      header:{
        fontWeight:'bold',
        fontSize:accHeaderSize,
        marginTop:10,
      },

      subheader:{
        fontWeight:'bold',
        fontSize:accSubHeaderSize,
        marginTop:10,
        marginBottom:10,
      },

      subheader_smaller:{
        fontWeight:'bold',
        fontSize:accSubHeaderSize,
      },

      description: {
        fontSize:accSmallSize,
        color:'#000',
        marginLeft:10,
      },
      
    
    
      cardContainer:{
        display: "flex",
        backgroundColor: '#fff',
        padding: 10,
        borderWidth: 1,
        borderRadius:5,
        margin:10,
      },


      cardContainer_detail:{
        display: "flex",
        backgroundColor: '#fff',
        padding: 10,
        borderWidth: 1,
        marginTop:10,
        marginBottom:10,
        borderRadius:0,
        borderRightWidth:0,
        borderLeftWidth:0,
      },

      cardHeader:{
        fontSize: accSubHeaderSize,
        fontWeight:'bold',
        marginBottom:5,
      }, 

      cardSubtitle:{
        fontSize:accSmallSize,
        fontWeight:accWeight,
      },

      chipText : {
        color:"#fff",
        fontWeight:accWeight,
        fontSize:accRegularSize,
      },

      chipBackground: {
        backgroundColor:color_lightnavy,
        marginBottom: 10, 
        marginRight:10
      },

      bottomButton:{
        margin:15, 
        padding:accPadding,
        backgroundColor:color_navy
      },

      buttonColor:{
        color:color_navy
      },


      divider:{
        marginBottom:10,
        marginTop:10,
        backgroundColor:"#A9A9A9",
        height:accDivider
      },

      errorMessage:{
        height:20,
        marginBottom:10,
    },
    errorMessageStyle:{
      fontSize: accRegularSize,
        fontWeight:'bold',
        color:'red',
  }
    });

    Theme.ActivityStyle;

    const ActivityStyle = StyleSheet.create({});


    const ProfileStyle = StyleSheet.create({});

    //basic theme....
    // on = accessibility on.
    // Big text and big button.

*/