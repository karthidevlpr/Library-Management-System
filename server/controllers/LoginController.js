/**
 * Created by karthick on 01/09/16.
 */

var HttpStatus = require('http-status');
var User = require("../models/User");
var Validation = require("./Validation");
var moment= require('moment');
var crypto = require("crypto");
var key = "supersecretkey";

exports.authenticate = function (req, res) {       // Authenticate User.

    User.findOne({email:new RegExp('^'+req.body.email+'$','i'),password:encrypt(key, req.body.password),active:true},function (err, user) {
        if (err) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error: 'unexpected error accessing data'});
            return;
        }
        if (user == null) {
            res.status(HttpStatus.BAD_REQUEST).json({error:'User Name & Password doesn\'t Match'});
            return;
        }
        req.session.loggedInUser = user;
        res.status(HttpStatus.OK).json(user);
    });
};

exports.logout = function (req, res) {       // LogOut User.

    if(req.session.loggedInUser){
        req.session.loggedInUser = null;
        res.status(HttpStatus.OK).json({success:"logout successfully"}); 
    }
    
};

function encrypt(key, data) {
    var cipher = crypto.createCipher('aes-256-cbc', key);
    var crypted = cipher.update(data, 'utf-8', 'hex');
    crypted += cipher.final('hex');

    return crypted;
}
