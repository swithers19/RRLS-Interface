const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const CircuitSchema = new Schema ({
    board: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    peripherals:{
        type: Array,
        default:[]
    }
    
});

module.exports = Item = mongoose.model('circuit', CircuitSchema);