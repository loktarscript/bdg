var mysql      = require('mysql');
var {database} = require('./config');
 
let connection = mysql.createConnection(database);

connection.connect((error) =>{
  if(!!error){
    console.log(error);
  }else{
    console.log('Conectado a la BD!')
  }
})

module.exports = connection;