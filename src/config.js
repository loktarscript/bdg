module.exports = {
    database: {
        URI: 'mongodb+srv://recetario_web:recetario@clustergcp.wcc0t.mongodb.net/recetario?retryWrites=true&w=majority'
        },
    port: 5001,
    jwt:{
        secret: process.env.JWT_SECRET || 'secretkey12345645!'
    },
    database : {
        host     : 'localhost',
        user     : 'bangapi',
        password : 'bang123',
        database : 'bang_lover',
        multipleStatements: true
      },
    roles: {
        admin:{
            name: "ADMIN",
            method : [{
                type: 'GETT',
            },
            {
                type: 'POST'
            },
            {
                type: 'PATCH'
            },
            {
                type: 'DELETE'
            }
        ]
        },
        user_normal:{
            name: "U_NOR",
            method : [{
                type: 'GETT',
            },
            {
                type: 'POST'
            },
            {
                type: 'PATCH'
            }
        ]
        }
    }
}