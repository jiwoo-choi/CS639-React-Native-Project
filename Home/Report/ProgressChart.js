import React from 'react'
import { ProgressCircle, Labels, Text } from 'react-native-svg-charts'

class ProgressChart extends React.PureComponent {

    
    render() {


        // const Labels = ({ x, y, bandwidth, data }) => (

        //     data.map((value, index) => (
        //         <Text
        //             key={ index }
        //             x={ x(index) + (bandwidth / 2) }
        //             y={ value < CUT_OFF ? y(value) - 10 : y(value) + 15 }
        //             fontSize={ 14 }
        //             fill={ value >= CUT_OFF ? 'white' : 'black' }
        //             alignmentBaseline={ 'middle' }
        //             textAnchor={ 'middle' }
        //         >
        //             {value}
        //         </Text>
        //     ))
        // )


        return (

            <ProgressCircle
                style={ { flex:1} }
                progress={this.props.progress}
                progressColor={this.props.color}
                startAngle={0}
                // startAngle={ -Math.PI * 0.8 }
                // endAngle={ Math.PI * 0.8 }
                strokeWidth={25}
            >


            </ProgressCircle>
        )
    }

}

export default ProgressChart
