import React from 'react'
// import { View } from 'react-native'
// import { Line } from 'react-native-svg'
// import { BarChart, StackedBarChart,XAxis,Grid} from 'react-native-svg-charts'
// import * as scale from 'd3-scale'
import moment from 'moment'
import Normalize from '../../Util/Normalize'



import { BarChart,  XAxis,YAxis, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { Line  } from 'react-native-svg'
import { View } from 'react-native'
import * as scale from 'd3-scale'

class MyBarChart extends React.PureComponent {



    //1 of one days
    //
    render() {



        const key = this.props.data.map ((value) => value.key);
        const data = this.props.data.map ((value) => value.data.value);
        const goal = this.props.data[0].data.goal;
        const noramlized = Normalize.calculate(data, goal);
        
        const HorizontalLine = (({ y }) => (
            <Line
                key={ 'zero-axis' }
                x1={ '0%' }
                x2={ '100%' }
                y1={ y(noramlized.goal) }
                y2={ y(noramlized.goal) }
                stroke={ 'red' }
                strokeDasharray={ [ 8, 12 ] }
                strokeWidth={ 4 }
            />
        ))

        //color picker...
        return (
            <View style={{display:"flex",height: 200, padding: 20 }}>

            <BarChart
                style={{flex:1}}
                data={ noramlized.data }
                gridMax={0}
                gridMin={100}
                svg={{ fill: 'rgb(134, 65, 244)' }}
            >
                <HorizontalLine/>
                <Grid/>
            </BarChart>  
            <XAxis

                style={{ marginTop: 10 }}
                data={ noramlized.data }
                formatLabel={ (value,index) => {
                   if (index === 7) {
                    return "Today"
                   } else {
                    return key[index]
                   }}}
                scale={scale.scaleBand}
                svg={{ fontSize: 12, fill: 'black' }}

                    // style={{ height:20, marginHorizontal: -10}}
                    // data={ noramlized.data }
                    // contentInset={{ left: 15, right: 15 }}
                    // svg={{ fontSize: 10, fill: 'black' }}
            ></XAxis>
            </View>

     
        )
    }
}

export default MyBarChart;