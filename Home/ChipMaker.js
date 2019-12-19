import React from 'react';
import { Chip, Text } from 'react-native-paper';
import { View } from 'react-native';


class ChipMaker extends React.Component{

    getChips(){

        return this.props.data.map((value,index) => {
            return (
                <Chip 
                key={index+"CHIP"}
                style={this.props.styles.chipBackground}
                >
                    <Text style={this.props.styles.chipText}>{value}</Text>
                </Chip>
            );
        });
    }


    render(){
        const data = this.props.data.length;
        console.log(this.props)
        if (data){
            return(
                <View style={[{display: 'flex', flexWrap : 'wrap',flexDirection:'row',  justifyContent: 'flex-start'}, this.props.style]}>
                    {this.getChips()}
                </View>
            ) 
        } else {
            return null;
        }
      

    }
}

export default ChipMaker;
