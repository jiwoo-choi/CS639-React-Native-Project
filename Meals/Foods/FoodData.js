class FoodData {

    constructor(data = {id : 0, name:'', calories:'', protein:'', carbohydrates:'',fat:''}){
        this.id = data.id;
        this.name = data.name
        this.calories = data.calories;
        this.protein = data.protein;
        this.carbohydrates = data.carbohydrates;
        this.fat = data.fat;
    }

    mapper(){
        return { 
            name : this.name,
            calories : this.calories,
            protein : this.protein,
            carbohydrates : this.carbohydrates,
            fat : this.fat,
        };
    }

    



}

export default FoodData;