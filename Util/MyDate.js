import moment from 'moment'

class Mydate {

    //get Today list.

    static getToday(value){
        var date = new Date();
        var today = moment(date)
        return value.filter((value) => today.isSame(moment.utc(value.date).local(), 'dates'));
    }
    
    //return [{key : tue , data : []}, {key: wed, data : []}, ... ]
    static getPast7Days(value){

        const range = (start, end) => {
            const length = end - start;
            return Array.from({ length }, (_, i) => start + i);
        }

        let result = [];
        
        for ( const i of range(-7, 1)) {
            // console.log(moment(new Date()));

            // var date = new Date();
            var dateLocal = moment(new Date()).local().add(i, 'days')
        
            let filtered = value.filter ((value) => dateLocal.isSame(moment.utc(value.date).local(), 'dates'))
            result.push({key : dateLocal.format('ddd'), data: filtered})
        }
        return result;
    }

}

export default Mydate;
