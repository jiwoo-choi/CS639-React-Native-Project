

class Normalize {

    static calculate(array, goal){


        //goal should b 
        Array.prototype.min = function(comparer) {

            if (this.length === 0) return null;
            if (this.length === 1) return this[0];
        
            comparer = (comparer || Math.min);
        
            var v = this[0];
            for (var i = 1; i < this.length; i++) {
                v = comparer(this[i], v);    
            }
        
            return v;
        }
        
        Array.prototype.max = function(comparer) {
        
            if (this.length === 0) return null;
            if (this.length === 1) return this[0];
        
            comparer = (comparer || Math.max);
        
            var v = this[0];
            for (var i = 1; i < this.length; i++) {
                v = comparer(this[i], v);    
            }
        
            return v;
        }

        let maxValue = goal >= array.max() ? ((goal + 10 )) : array.max();
        let minValue = goal <= array.min() ? ((goal-10 < 0) ? 0 : goal-10) : array.min();


        const normalize = (value, scale) => {
            return ((value - minValue) / (maxValue - minValue)) * scale 
        }

        let newArray = array.map((value) => normalize(value,100))
        let newGoal = normalize(goal,100);

        return { data : newArray, goal : newGoal}
    }

}

export default Normalize;