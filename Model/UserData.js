class UserData {


    constructor(session){

        if (session === undefined) {
            this.session = {};
        } else {
            this.session = session;
        }

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
    }

    updateSession(newSession){
        
        this.token = (this.newSession.token === undefined) ? this.session.token: newSession.token;
        this.id = (this.newSession.id === undefined) ? this.session.id: newSession.id;
        this.pwd = (this.newSession.pwd === undefined) ? this.session.pwd : newSession.id;
        this.firstName = (this.newSession.firstName === undefined) ? this.session.firstName : newSession.firstName;
        this.lastName = (this.newSession.lastName === undefined) ? this.session.lastName : newSession.lastName;
        this.dailycal = (this.newSession.dailycal === undefined) ? this.session.dailycal : newSession.dailycal; 
        this.dailycarbo = (this.newSession.dailycarbo === undefined) ? this.session.dailycarbo : newSession.dailycarbo; 
        this.dailyprotein = (this.newSession.dailyprotein === undefined) ? this.session.dailyprotein : newSession.dailyprotein; 
        this.dailyfat = (this.newSession.dailyfat === undefined) ? this.session.dailyfat : newSession.dailyfat; 
        this.dailyactivity = (this.newSession.dailyactivity === undefined) ? this.session.dailyactivity: newSession.dailyactivity; 

        return this;
      }


}
export default UserData;