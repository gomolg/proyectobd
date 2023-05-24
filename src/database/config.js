const {connect} = require('http2')
const mongoose = require('mongoose')

const dbConnection = async() =>{
    try {
        mongoose.connect(process.env.MONGODB_URI, {
            autoIndex: true
        })
        
        console.log('Conected to mongoDB');

    }catch(error) {
        console.log(error);
        throw new Error('Error al conectar en BD')
    }
}

module.exports = {dbConnection}