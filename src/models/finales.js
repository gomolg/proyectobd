const mongoose = require("mongoose")

const finalesSchema = mongoose.Schema({
    _id: {
        type: Object
    },
    Year: {
        type: Number
    },
    CountryA: {
        type: String
    },
    Winner: {
        type: String
    },
    RunnerUp: {
        type: String
    },
    CountryB: {
        type: String
    },
    Venue: {
        type: String
    },
    Attendance: {
        type: Number
    },
    WinnerScore: {
        type: Number
    },

    ViceScore: {
        type: Number
    }
})

module.exports = mongoose.model('finales', finalesSchema)