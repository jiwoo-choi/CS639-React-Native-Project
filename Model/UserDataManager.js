import UserData from "./UserData";
import BadgerQuery from "./BadgerQuery"
import ActivityData from "../Activities/ActivityData"
import LoginManager from './LoginManager'
import MealData from '../Meals/MealData'
import FoodData from '../Meals/Foods/FoodData'
import moment from 'moment'
import Aggregation from '../Util/Aggregation'
import MyDate from '../Util/MyDate'

class UserDataManager{

    constructor(userData){
        
        this.userData = userData; // save in-memory.
        this.loginManager = new LoginManager();
        this.badgerQuery = new BadgerQuery();
        this.retryCount = 0;
    }
   
    async updateToken(){

        try {
            const response = await this.loginManager.signIn(this.userData.id, this.userData.pwd);
            this.userData.token = response.userData.token;
            
            return new Promise((resolve, reject) => {
                resolve(this.userData.token);
            })
        } catch (error) {
            return new Promise((resolve, reject) => {
                reject(error);
            })
        }
    }


    async request(query) {

        let exec = this.badgerQuery.query(query);
        let response = await exec(this.userData.token);
        const responseMessage = await response.json();

        if (response.ok) {
            return new Promise((resolve, reject) => {
                resolve(responseMessage);
            })
        } else if (response.status === 401) {
            await this.updateToken();
            const response = await this.request(query);
            return new Promise((resolve, reject) => {
                resolve(response);
            })
        } else {
            return new Promise((resolve, reject) => {
                reject(responseMessage.message);
            })
        }
    }

    async getUserData() {

        try {
            const result = await this.request(["SELECT", ["users",this.userData.id], {}]);

            this.userData.firstName = result.firstName;
            this.userData.lastName = result.lastName;
            this.userData.dailycal = result.goalDailyCalories;
            this.userData.dailycarbo = result.goalDailyCarbohydrates;
            this.userData.dailyprotein = result.goalDailyProtein;
            this.userData.dailyfat = result.goalDailyFat;
            this.userData.dailyactivity = result.goalDailyActivity;

            return new Promise((resolve, reject) => {
                resolve(this.userData);
            })
        } catch (error) {
            return new Promise((resolve, reject) => {
                reject(error);
            })
        }

    }

    async updateUserData(values){

        try {
            await this.request(["UPDATE", ["users",this.userData.id], values]);
            return new Promise((resolve, reject) => {
                resolve(this.userData);
            })
        } catch (error) {
            return new Promise((resolve, reject) => {
                reject(error);
            })
        }
    }


    async deleteUser(){

        try {
            await this.request(["DELETE", ["users",this.userData.id], {}]);
            return new Promise((resolve, reject) => {
                resolve(this.userData);
            })
        } catch (error) {
            return new Promise((resolve, reject) => {
                reject(error);
            })
        }
    }




    async addActivities(activities){
        //activities receive type.

        try {
            await this.request(["INSERT", ["activities"], activities.mapper()]);
            return new Promise((resolve, reject) => {
                resolve(this.userData);
            })
        } catch (error) {
            return new Promise((resolve, reject) => {
                reject(error);
            })
        }
    }


    async getActivities(){

        try {
            const responseMessage = await this.request(["SELECT", ["activities"], {}]);

            let activities = responseMessage.activities;
            const activitieslist = activities.map((value)=>{
                console.log(value);
                return new ActivityData(value.id, value.name, value.duration, value.date, value.calories);
            })

            return new Promise((resolve, reject) => {
                resolve(activitieslist);
            })

        } catch (error) {
            return new Promise((resolve, reject) => {
                reject(error);
            })
        }
    } 


    async deleteActivities(id){

        try {
            await this.request(["DELETE", ["activities",id], {}]);

            return new Promise((resolve, reject) => {
                resolve(this.userData);
            })

        } catch (error) {
            return new Promise((resolve, reject) => {
                reject(error);
            })
        }
    }

    async editActivities(id, activities){

        try {
            await this.request(["UPDATE", ["activities",id], activities.mapper()]);

            return new Promise((resolve, reject) => {
                resolve(this.userData);
            })

        } catch (error) {
            return new Promise((resolve, reject) => {
                reject(error);
            })
        }
    }


    /*-----------------------------
    MEALS & FOODS
    ------------------------------*/

    async getMeals(){

        try {
            const mealResponse = await this.request(["SELECT", ["meals"], {}]);

            let mealsList = [];

            for (const meal of mealResponse.meals) {
                const foodslist = await this.getFoodsFromMeal(meal.id);
                meal.food = foodslist;
                mealsList.push(new MealData(meal))
            }

            
            return new Promise((resolve, reject) => {
                resolve(mealsList);
            })
        } catch (error) {
            return new Promise((resolve, reject) => {
                reject(error);
            })
        }
    }

    async addMeals(meals){

        try {
            await this.request(["INSERT", ["meals"], meals.mapper()]);
            return new Promise((resolve, reject) => {
                resolve(this.userData);
            })

        } catch (error) {
            return new Promise((resolve, reject) => {
                reject(error);
            })
        }
    }

    async editMeals(id, meals){

        try {
            await this.request(["UPDATE", ["meals",id], meals.mapper()]);
            return new Promise((resolve, reject) => {
                resolve(this.userData);
            })
        } catch (error) {
            return new Promise((resolve, reject) => {
                reject(error);
            })
        }
    }

    async deleteMeals(id){
        try {
            await this.request(["DELETE", ["meals",id], {}]);

            return new Promise((resolve, reject) => {
                resolve(this.userData);
            })

        } catch (error) {
            return new Promise((resolve, reject) => {
                reject(error);
            })
        }
    }

    async addFoodsToMeal(mealid,food){
        try {
            await this.request(["INSERT", ["meals",mealid,"foods"], food.mapper()]);

            return new Promise((resolve, reject) => {
                resolve(this.userData);
            })

        } catch (error) {
            return new Promise((resolve, reject) => {
                reject(error);
            })
        }
    }

    async getFoodsFromMeal(mealid){
        try {
            const foodResponse = await this.request(["SELECT", ["meals", mealid, "foods"], {}]);
            const foodslist = foodResponse.foods.map((food) => {
                    return new FoodData(food);
            })
            return new Promise((resolve, reject) => {
                resolve(foodslist);
            })

        } catch (error) {
            return new Promise((resolve, reject) => {
                reject(error);
            })
        }
    }

    async editFoodsFromMeal(mealid, foodid, food){
        try {
            await this.request(["UPDATE", ["meals",mealid,"foods", foodid], food.mapper()]);

            return new Promise((resolve, reject) => {
                resolve(this.userData);
            })

        } catch (error) {
            return new Promise((resolve, reject) => {
                reject(error);
            })
        }
    }

    async deleteFoodsFromMeal(mealid,foodid){
        try {
            await this.request(["DELETE", ["meals",mealid,"foods",foodid], {}]);

            return new Promise((resolve, reject) => {
                resolve(this.userData);
            })

        } catch (error) {
            return new Promise((resolve, reject) => {
                reject(error);
            })
        }

    }

    async getFoodsList(){

        try {

            const foodList = await this.request(["SELECT", ["foods"], {}]);
            let foods = foodList.foods.map((value, index) => {
                return new FoodData(value);
            })

            return new Promise((resolve, reject) => {
                resolve(foods);
            })

        } catch (error) {
            return new Promise((resolve, reject) => {
                reject(error);
            })
        }
    } 


    /*-----------------------
    ON-DEMAND FUNCTION
    -------------------------*/

    // RETURN TODAY ACTIVITY LIST [Actitivty(), Activity(), Activity()...]
    // ONLY USED : HOME.JS
    async getTodayActivity(){

        try { 

            const activities = await this.getActivities();
            let todayActivities = MyDate.getToday(activities);

            return new Promise((resolve, reject) => {
                resolve(todayActivities);
            })
        } catch (error) {
            return new Promise((resolve, reject) => {
                reject(error);
            })
    }

        /*
        const isToday = (someDate) => {

            const today = new Date().toLocaleString("en-US", {timeZone: "America/Chicago"})

            let converter = today.split('/');
            let day = converter[0];
            let month = converter[1];
            let year = converter[2].split(',')[0];
           
            let converter1 = someDate.split('/');
            let day1 = converter1[0];
            let month1 = converter1[1];
            let year1 = converter1[2].split(',')[0];

            return day == day1 &&
            month == month1 &&
            year == year1
        }

        let test = activities.filter((value)=> {
            let myDate = new Date(value.date).toLocaleString("en-US", {timeZone: "America/Chicago"});
            return isToday(myDate);
        })

        return new Promise((resolve, reject) => {
                resolve(test);
        })*/
    }

    //RETURN TODAY MEALS LIST [MEALS(), MEALS(), ....]
    // ONLY USED : HOME.JS
    async getTodayMeals(){

        try { 

            const meals = await this.getMeals();
            let todayMeals = MyDate.getToday(meals);

            return new Promise((resolve, reject) => {
                resolve(todayMeals);
            })
        } catch (error) {
            return new Promise((resolve, reject) => {
                reject(error);
            })
        }
        /*
        const isToday = (someDate) => {
            const today = new Date().toLocaleString("en-US", {timeZone: "America/Chicago"})
            let converter = today.split('/');
            let day = converter[0];
            let month = converter[1];
            let year = converter[2].split(',')[0];
           
            let converter1 = someDate.split('/');
            let day1 = converter1[0];
            let month1 = converter1[1];
            let year1 = converter1[2].split(',')[0];

            return day == day1 &&
            month == month1 &&
            year == year1
        }

        let test = meals.filter((value)=> {
            let myDate = new Date(value.date).toLocaleString("en-US", {timeZone: "America/Chicago"});
            return isToday(myDate);
        })

        return new Promise((resolve, reject) => {
                resolve(test);
        })*/
    }


    // RETURN PAST 7 DAYS. [ meals : [{ key : , data : }] , activities : [{key :, data : [] }]
    // => NOT RETURN PAST 7 DAYS LIST [ [MEAL(), ACTIVITIES()], [] ... ] 
    // ONLY USED : DAILYREPORT.js

    async getTodayReportData() {

        try {

            const meals = await this.getMeals();
            const activities = await this.getActivities();
            const goal = await this.getUserData();

            let pastMeals = MyDate.getToday(meals);
            let pastActivities = MyDate.getToday(activities);

            let mealsData = Aggregation.do("meals",pastMeals, goal)
            let activitiesData = Aggregation.do("activity",pastActivities, goal);

            return new Promise((resolve, reject) => {
                resolve({activities : activitiesData, meals : mealsData});
            })

        } catch (error) {
            return new Promise((resolve, reject) => {
                reject(error);
            })
        }
    }


    // RETURN PAST 7 DAYS. [ meals : [{ key : , data : }] , activities : [{key :, data : [] }]
    // => NOT RETURN PAST 7 DAYS LIST [ [MEAL(), ACTIVITIES()], [] ... ] 
    // ONLY USED : WeeklyReport.js
    async get7daysReportData(){

        try {

            const meals = await this.getMeals();
            const activities = await this.getActivities();
            const goal = await this.getUserData();

            let pastMeals = MyDate.getPast7Days(meals);
            let pastActivities = MyDate.getPast7Days(activities);



            let mealsData = pastMeals.map((value) => {
                return {key:value.key, data: Aggregation.do("meals",value.data, goal)};
            })

            let activitiesData = pastActivities.map((value) => {
                return {key:value.key, data: Aggregation.do("activity",value.data, goal)};
            })

            return new Promise((resolve, reject) => {
                resolve({activities : activitiesData, meals : mealsData});
            })

        } catch (error) {
            return new Promise((resolve, reject) => {
                reject(error);
            })
        }
    }
}

export default UserDataManager;







