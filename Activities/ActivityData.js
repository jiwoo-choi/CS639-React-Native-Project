class ActivityData{

    constructor(id, name, duration,date,calories){
        this.id = id;
        this.name = name;
        this.duration = duration;
        this.date = date;
        this.calories = calories;
    }


    mapper(){
        return { 
            name:this.name,
            duration:this.duration,
            date:this.date,
            calories:this.calories
        };
    }

}

export default ActivityData;