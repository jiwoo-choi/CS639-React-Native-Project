import React from 'react'
import { PieChart } from 'react-native-svg-charts'
import { Text } from 'react-native-svg'


class ChartMaker extends React.Component {

    render() {  
        
         

        const data = [
            {
                key: "carbohydrates",
                value: this.props.data.carbohydrates.percentage,
                svg: { fill: '#1A85FF' },
            },
            {
                key: "protein",
                value: this.props.data.protein.percentage,
                svg: { fill: '#D41159' }
            },
            {
                key: "fat",
                value: this.props.data.fat.percentage,
                svg: { fill: '#4B0092' }
            }
        ]


        return (
            <PieChart
                style={{ flex:1 }}
                outerRadius={'80%'}
                innerRadius={'40%'}
                data={data}
            />
        )
    }


}
export default ChartMaker;