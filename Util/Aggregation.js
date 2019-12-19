class Aggregation {


    static do(type, values, goalData) {

        switch( type ) {

            case "activity" :

                    const goal = (goalData.dailyactivity === "0") ? 0 : parseFloat(goalData.dailyactivity);

                    let aggregatedActivities = values.reduce((prev, curr, index, array) => {
                        prev.activities.value = prev.activities.value + curr.duration
        
                        if (index === array.length-1) {
                            if (goal !== 0) {
                                prev.activities.percentage = prev.activities.value / goal
                            } else {
                                prev.activities.percentage = 0;
                            }
                        }
                        return prev;
                    }, {activities:{value:0, goal : goal, percentage:0}})

                    return aggregatedActivities;

            case "meals" :


                    const calGoal = (goalData.dailycal === "0") ? 0 : parseFloat(goalData.dailycal);
                    const carboGoal = (goalData.dailycarbo === "0") ? 0 : parseFloat(goalData.dailycarbo);
                    const proGoal = (goalData.dailyprotein === "0") ? 0 : parseFloat(goalData.dailyprotein);
                    const fatGoal = (goalData.dailyfat === "0") ? 0 : parseFloat(goalData.dailyfat);


                    let aggregatedMeals = values.reduce((prev, curr, index, array) => {
        


                        prev = curr.food.reduce((nestedPrev, nestedCurr) => {
        
                            nestedPrev.carbohydrates.value = nestedPrev.carbohydrates.value + nestedCurr.carbohydrates
                            nestedPrev.protein.value = nestedPrev.protein.value + nestedCurr.protein
                            nestedPrev.fat.value = nestedPrev.fat.value + nestedCurr.fat
                            nestedPrev.calories.value = nestedPrev.calories.value + nestedCurr.calories
        
                            return nestedPrev;
                        }, prev)
        
                        if (index === array.length-1) {
        
        
                            prev.carbohydrates.percentage = prev.carbohydrates.goal === 0 ? 0 : prev.carbohydrates.value / prev.carbohydrates.goal;
                            prev.protein.percentage = prev.protein.goal === 0 ? 0 : prev.protein.value / prev.protein.goal;
                            prev.fat.percentage = prev.fat.goal === 0 ? 0 : prev.fat.value / prev.fat.goal;
                            prev.calories.percentage = prev.calories.goal === 0 ? 0 : prev.calories.value / prev.calories.goal;

                
                        }
                        return prev;
        
                    }, {
                        carbohydrates : {value: 0, goal: carboGoal, percentage:0}, 
                        protein: {value :0, goal: proGoal, percentage:0}, 
                        fat : {value :0, goal : fatGoal, percentage:0}, 
                        calories:{value :0, goal: calGoal, percentage:0}})

                    return aggregatedMeals;
            break;

            default:
            break;
        }
    }
}

export default Aggregation;

