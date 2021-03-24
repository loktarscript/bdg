/*/********************************
    Controller: Authorization
    Autor: Sebastián Cortés
/*//******************************/

//Imports
var store = require('./store');
var bcrypt = require('bcrypt');
var auth = require('../../helpers/auth');
var nodemailer = require('nodemailer');
var response = require('../../helpers/response');

const login = (username, password) => {
    return new Promise((resolve, reject) => {
        let data = {};
        store.checkUser(username)
            .then(bonding => {
                data = bonding[0];
                return bcrypt.compare(password, data[0].password)
                    .then(comparador => {
                        if (comparador) {
                            //generar token
                            resolve({
                                data: data,
                                token: auth.sign(data)
                            });
                        } else {
                            reject('Info erronea!')
                        }
                    })
                    .catch(err => reject(err))
            });
    })
};

const forgotPassword = (req, res, email) => {
    return new Promise((resolve, reject) => {
        // console.log(email);
        store.findByEmail(email)
            .then(bonding => {
                data = bonding[0][0];
                let password = generadorPassword(10);
                if (bonding[0].length > 0) {
                    store.updatePassBDG(data.email, password)
                    .then(resp => {
                        if (resp.check) {
                            sendMail(data.email, password);
                            resolve(resp.message);
                        }
                    })
                    .catch(err => {
                        reject(err);
                    })
                }else{
                    response.success(req, res, 'Email no encontrado en nuestros registros!', 400)
                }
                
            })
            .catch(err => reject({ status: false, message: 'Email inexistente en nuestros registros', error: err }));
    })
}

const generadorPassword = (length) => {
    var resultado = '';
    var caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var caracteresLength = caracteres.length;
    for (var i = 0; i < length; i++) {
        resultado += caracteres.charAt(Math.floor(Math.random() * caracteresLength));
    }
    return resultado;
}

const sendMail = (email, pass) => {
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'sebastiancortes.2202@gmail.com',
            pass: 'icwkllmwbebmhxer'
        }
    });
    // Definimos el email
    var mailOptions = {
        from: 'passwordreset@demo.com',
        to: email,
        subject: 'Su contraseña ha sido modificada',
        text: 'Hola,\n\n' +
        'Este es un mensaje de confirmación a su dirección de correo electrónico:  ' + email + ' , en donde le confirmamos que su contraseña ha sido modificada.\n' +
        'Nueva password: ' + pass,
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error){
            console.log(error);
            res.send(500, err.message);
        } else {
            console.log("Email sent");
            res.status(200).json(req.body);
        }
    });
};



module.exports = {
    login,
    forgotPassword
}