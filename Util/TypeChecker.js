class TypeChecker {

    static isFloat(value) {

        if (typeof(value) === "string") {
            return !isNaN(value);
        } else if (typeof(value) === "number") {
            return true;
        } else {
            return false;
        }
    }
    
}

export default TypeChecker;
