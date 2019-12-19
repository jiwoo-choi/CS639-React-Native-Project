class MealData {

    constructor(data={id : 0, name: '', date : '', food :''}) {
        this.id = data.id
        this.name = data.name 
        this.date = data.date 
        this.food = data.food
    }

    mapper(){
        return { 
            name:this.name,
            date:this.date
        };
    }

    /*
 
    makeDummydata(){

        let today = new Date();
        return [{name : "Breakfast",
                date : today.toISOString(),
                id : 1,
                },
                {name : "Launch",
                date : today.toISOString(),
                id : 2,
                },
                {name : "Dinner",
                date :today.toISOString(),
                id : 3,
                },
                {name : "Snack",
                date : today.toISOString(),
                id : 4,
                }]
    }*/

    //foods?

}

export default MealData;

