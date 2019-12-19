import BadgerQuery from "./BadgerQuery"
import UserData from "./UserData";

class LoginManager {

  constructor(){
    this.badgerQuery = new BadgerQuery();
    this.userData = new UserData();
  }

  async signIn(id, pwd){
    const exec = this.badgerQuery.query(["SELECT",["login"],{}]);
    const response = await exec(id,pwd);
    const responseMessage = await response.json();

    if (response.ok) {
      this.userData.id = id;
      this.userData.pwd = pwd;
      this.userData.token = responseMessage.token;
      let self = this;
      return new Promise(function(resolve) {
        resolve(self);
      })
    } else {
      return new Promise(function(resolve,reject) {
        reject(responseMessage.message);
      })
    }

  }

  async signUp(id, pwd){
    const exec = this.badgerQuery.query(["INSERT",["users"],{username:id,password:pwd}]);
    const response = await exec(id,pwd); 
    const responseMessage = await response.json();

    if (response.ok) {

      this.userData.id = id;
      this.userData.pwd = pwd;
      this.userData.token = responseMessage.token;
      let self = this;
      return new Promise(function(resolve) {
        resolve(self);
      })
    } else {
      return new Promise(function(resolve,reject) {
        reject(responseMessage.message);
      })
    }

  }

  async verifyKey(token, username){

    const exec = this.badgerQuery.query(["SELECT",["users", username],{}]);

    console.log(username);
    console.log(token);

    const response = await exec(token); 
    const rm = await response.json();

    console.log(rm);

      return new Promise(function(resolve) {
        if (response.ok) {
          resolve(true);
        } else {
          resolve(false);
      }})
  }
  

  getUserData(){
    return this.userData;
  }

  updateUserData(session){
    this.userData.updateSession(session);
  }

}

export default LoginManager;
/*
import base64 from 'base-64';
class LoginManager {

    constructor(session){

      if (session === undefined) {
        this.session = {};
      } else {
        this.session = session;
      }

      this.status = (this.session.status === undefined) ? 0 : this.session.status;
      this.error = (this.session.error === undefined) ? 0 : this.session.error;
      this.token = (this.session.token === undefined) ? 0 : this.session.token;
      this.id = (this.session.id === undefined) ? 0 : this.session.id;
      this.pwd = (this.session.pwd === undefined) ? 0 : this.session.pwd; 

      this.firstName = (this.session.firstName === undefined) ? 0 : this.session.firstName;
      this.lastName = (this.session.lastName === undefined) ? 0 : this.session.lastName;
      this.dailycal = (this.session.dailycal === undefined) ? 0 : this.session.dailycal; 
      this.dailycarbo = (this.session.dailycarbo === undefined) ? 0 : this.session.dailycarbo; 
      this.dailyprotein = (this.session.dailyprotein === undefined) ? 0 : this.session.dailyprotein; 
      this.dailyfat = (this.session.dailyfat === undefined) ? 0 : this.session.dailyfat; 
      this.dailyactivity = (this.session.dailyactivity === undefined) ? 0 : this.session.dailyactivity; 

      this.getCurrentSession = this.getCurrentSession.bind(this);
    }

    getCurrentSession(){
      
      this.session.status = this.status;
      this.session.error = this.error;
      this.session.token = this.token;
      this.session.id = this.id;
      this.session.pwd = this.pwd;


      this.session.firstName = this.firstName;
      this.session.lastName = this.lastName;
      this.session.dailycal = this.dailycal;
      this.session.dailycarbo = this.dailycarbo;
      this.session.dailyprotein =this.dailyprotein;
      this.session.dailyfat = this.dailyfat;
      this.session.dailyactivity = this.dailyactivity;

      return this.session;
    }

    async signUp(username, password) {

      this.id = username;
      this.pwd = password;

      const response = await fetch(SIGNUP, {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({username:this.id, password:this.pwd})
        })

      if (response.ok) {
        this.status = 1;
        let currentSession = this.getCurrentSession();
        return new Promise(function(resolve) {
          resolve(new LoginManager(currentSession))
        })
      } else {
        const errorMessage = await response.json();
        return new Promise(function(resolve,reject) {
          reject(errorMessage.message);
        })
      }
    }

    async signIn(username, password) {

      if (username === undefined) {
        username = this.id;
      } else {
        this.id = username;
      }
      if (password === undefined) {
        password = this.pwd;
      } else {
        this.pwd = password
      }

      const response = await fetch(SIGNIN, {
            headers: new Headers({
              "Authorization": `Basic ${base64.encode(`${username}:${password}`)}`
            }),
          })
        
      const responseMessage = await response.json();

      if (response.ok) {
        this.token = responseMessage["token"];
        this.status = 1;
        let currentSession = this.getCurrentSession();

        return new Promise(function(resolve) {
          resolve(new LoginManager(currentSession))
        })
      } else {

        return new Promise(function(resolve,reject) {
          reject(responseMessage.message);
        })
      }
    }

    async verifyToken(token, id){

      const response = await fetch(SIGNUP + "/" + id , {
            headers: new Headers({
              "x-access-token": token
            }),
          })
        
      if (response.ok) {
        return new Promise(function(resolve) {
          resolve(true);
        });
      } else {
        return new Promise(function(resolve) {
          resolve(false);
        })
      }

    }

    async editUserData(token, id, values){

      const response = await fetch(SIGNUP + "/" + id , {
  
            method: 'put',
            headers: {
              'Content-Type': 'application/json',
              "x-access-token": token
            },
            body: JSON.stringify(values)
        })
        
      if (response.ok) {
        return new Promise(function(resolve) {
          resolve(true);
        });
      } else {
        return new Promise(function(resolve) {
          resolve(false);
        })
      }

    }

    async getUserData(token, id){


      const response = await fetch(SIGNUP + "/" + id , {
  
            method: 'get',
            headers: {
              "x-access-token": token
            },
        })


      const json = await response.json();
  
      if (response.ok) {
        
        this.status = 1;
        this.firstName = json.firstName;
        this.lastName = json.lastName;
        this.dailycal = json.goalDailyCalories;
        this.dailycarbo = json.goalDailyCarbohydrates;
        this.dailyprotein = json.goalDailyProtein;
        this.dailyfat = json.goalDailyFat;
        this.dailyactivity = json.goalDailyActivity;
        let currentSession = this.getCurrentSession();

        return new Promise(function(resolve) {
          resolve(new LoginManager(currentSession))
        })
      } else {
        return new Promise(function(resolve,reject) {
          reject("Internet Error");
        })
      }

    }

    
}




export default LoginManager;

const SERVER = "https://mysqlcs639.cs.wisc.edu/"
const SIGNIN = SERVER + "login"
const SIGNUP = SERVER + "users"
*/