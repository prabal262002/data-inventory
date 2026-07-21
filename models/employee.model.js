const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: String,
    position: String,
    id: {
        type: String,
        unique: true,
    },
    dob: Date,
    mail: String,
    telephone: String,
    address: String,
    photoUrl: String,
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;