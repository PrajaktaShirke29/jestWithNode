const mongoose = require('mongoose');
const url = "mongodb://localhost/jestDb";

const connect = async () => {
    await mongoose.connect(url ,
{ useNewUrlParser :true}

);


var dbconnect=mongoose.connection;

if(!dbconnect){
    console.log("Sorry cannot establish the connection");
    return;
}
else{
    console.log("Connection established");
    }
}




module.exports = {connect};
