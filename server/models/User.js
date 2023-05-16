var mongoose = require('mongoose');

var employeeSchema = mongoose.Schema({
    firstName: {
        type: String,
        unique: false,
        required: true
    },
    lastName: {
        type: String, 
        unique: false,
        required: true
    },
    email: {
        type: String, 
        unique: false
    },
    password: {
        type:String,
        unique: false
    },
    faceId: {
        type: String,
        unique: false
    }
});

var Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;