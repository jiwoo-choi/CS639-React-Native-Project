import { 
    View,
    StyleSheet, 
    ActivityIndicator,
    StatusBar,
} from 'react-native';

import React from 'react'

import { Dimensions } from "react-native";


class Loading extends React.Component {


    //visible?

    render () {

        const screenWidth = Math.round(Dimensions.get('window').width);  
        const screenHeight = Math.round(Dimensions.get('window').height);  

        if (this.props.visible) {
            return (
                <View style={{
                    height:screenHeight,
                    width:screenWidth,
                    display:"flex",
                    justifyContent: 'center',
                    alignContent:'center',
                }}>
                        <ActivityIndicator />
                        <StatusBar barStyle="default" />
                    </View>
              )
        } else {
            return null;
        }
    }
}

export default Loading;
