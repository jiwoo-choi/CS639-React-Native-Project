# CS639 React Native

### Creating Meals

* Users should be able to add new meals to their current day.
* As a shortcut, users should be able to click something like "Use current time"

![alt text](https://github.com/wisc-hci-curriculum/cs639-react-native-3-jiwoo-choi/blob/master/screenshot/meals.png)
![alt text](https://github.com/wisc-hci-curriculum/cs639-react-native-3-jiwoo-choi/blob/master/screenshot/addmeals.png)


### Review Meals
* Users should be able to review all their meals for the current day.
* make modifications to meals. and delete them. 

![alt text](https://github.com/wisc-hci-curriculum/cs639-react-native-3-jiwoo-choi/blob/master/screenshot/mealsreview.png)

* Each meal should also show the aggregated values for Calories, Fat, Protein, and Carbohydrates based on all foods for that meal.
![alt text](https://github.com/wisc-hci-curriculum/cs639-react-native-3-jiwoo-choi/blob/master/screenshot/mealsreview2.png)


### Creating Foods
* Users should be able to add new foods to a given meal.
![alt text](https://github.com/wisc-hci-curriculum/cs639-react-native-3-jiwoo-choi/blob/master/screenshot/mealsaddfoods.png)


### Review Foods

* Users should be able to review all the foods for a given meal
* make modifications to foods, and delete them.

![alt text](https://github.com/wisc-hci-curriculum/cs639-react-native-3-jiwoo-choi/blob/master/screenshot/mealsreview2.png)


### Stats

* All stats (Calories, Protein, Carbohydrates, Fat, and Activity) are aggregated in the main view.
* This should be done in a way that allows the user to compare them to their goals without flipping back and forth between that view and their profile.

![alt text](https://github.com/wisc-hci-curriculum/cs639-react-native-3-jiwoo-choi/blob/master/screenshot/mealsreview2.png)



#### Daily report

![alt text](https://github.com/wisc-hci-curriculum/cs639-react-native-3-jiwoo-choi/blob/master/screenshot/dailyreport.png)

![alt text](https://github.com/wisc-hci-curriculum/cs639-react-native-3-jiwoo-choi/blob/master/screenshot/dailyreport2.png)


#### Weekely report

* All stats (Calories, Protein, Carbohydrates, Fat, and Activity) can be viewed from the past 7 days. This can be in the form of a graph, but graphs are not required.

![alt text](https://github.com/wisc-hci-curriculum/cs639-react-native-3-jiwoo-choi/blob/master/screenshot/weeklyreport.png)


#### Accessibiltiy

* Implement one of the designs/concepts you had for improving accessibility from the design homework.

#### bigger size text.


* profile -> setting -> Big Text Size Mode
![alt text](https://github.com/wisc-hci-curriculum/cs639-react-native-3-jiwoo-choi/blob/master/screenshot/profile.png)

![alt text](https://github.com/wisc-hci-curriculum/cs639-react-native-3-jiwoo-choi/blob/master/screenshot/profilesetting.png)


#### Big size text mode vs regular mode.

* big size.
![alt text](https://github.com/wisc-hci-curriculum/cs639-react-native-3-jiwoo-choi/blob/master/screenshot/bighome.png)


* regular size.
![alt text](https://github.com/wisc-hci-curriculum/cs639-react-native-3-jiwoo-choi/blob/master/screenshot/home.png)


### Util & Model Functions

#### BadgerQuery

FETCH REQUEST WRAPPER.

```javascript

await new badgerQuery().query([type, endpoint, body]); // promise type

* RETURN : PROMISE 
* TYPE
1. SELECT // get request
2. INSERT // post request
3. UPDATE // put request
4. DELETE // delete request

//example2
const response = await this.request(["SELECT", ["foods"], {}])
```

#### UserDataManager
REQUEST WRAPPERS THIS ASSIGNMENT (e.g. get Activities, update Foods...)

* Request function example.


```javascript

    /*
    1. function request(query) => fetch => return json file.
    2. do proper action for each methods.
    */

    //1. request method.
    async request(query) {

        let exec = this.badgerQuery.query(query); 
        let response = await exec(this.userData.token);
        //request

        if (response.ok) {
            return resolve_promise;
        } else if (response.status === 401) {
            updateToken(); //updatetoken
           return resolve_promise;
        } else {
            return reject_promise;
        }
    }

    //2. do proper actions for each situation.

    async getActivities(){

        try {
            const activities = await this.request(["SELECT", ["activities"], {}]); // 1
            const activitieslist = activities.map((value)=>{
                return new ActivityData(value.id, value.name, value.duration, value.date, value.calories);
            })
            return promise+activitieslist // return ActivityData Object.
            })

        } catch (error) { //error case...
            return promise_reject+error
        }
    } 


```

#### MyDate
```javascript

//expected input : Object containing "data" & its value is ISO format String Data key.
static getToday(value); 
// do simple filter using moment.js and filter() function.

//expected input : Object containing "data" & its value is ISO format String Data key.
static getPast7Days(value);
// check every dates using moment.js and reduece() function
// expected output : Array of Object ({key : 'Tue' , data: filtered data}O

```
#### Normalize
```javascript
calculate(array, goal);
// map given value to noramzlied value.
// normalized value = (x - min) / (max - min);
```

