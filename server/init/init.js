/**
 * Created by karthick on 01/09/16.
 */

var User = require("../models/User");
var moment= require('moment');
var crypto = require("crypto");
var key = "supersecretkey";


exports.saveSuperAdmin = function(req,res){               //Save Super Admin

    User.findOne({email:new RegExp('^'+"admin@library.com"+'$','i')}, function(err, user) {
        if (err) {
            console.log(err);
            return;
        }
        if (user != null) {
            console.log("Super Admin is already created..");
            return;
        }
        var newUser = new User;
        newUser.userName = 'Super';
        newUser.name = "Admin";
        newUser.email = "admin@library.com";
        newUser.mobileNumber = 1234567891;
        newUser.role = "SUPERADMIN";
        newUser.createdOn = moment();
        newUser.updatedOn = moment();
        newUser.password = encrypt(key, "welcome123");
        newUser.save(function (saveErr, saveUser) {
            if (saveErr) {
                console.log(saveErr);
                return;
            }
            console.log("Super Admin is created..")

        })
    })
};
function encrypt(key, data) {
    var cipher = crypto.createCipher('aes-256-cbc', key);
    var crypted = cipher.update(data, 'utf-8', 'hex');
    crypted += cipher.final('hex');

    return crypted;
}
