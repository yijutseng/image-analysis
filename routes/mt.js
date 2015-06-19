"use strict";

var fs = require("fs"),
    extend = require("util")._extend,
    watson = require("watson-developer-cloud"),
    bluemix = require("../config/bluemix");

module.exports = function() {

     var machineTranslation = watson.machine_translation(extend({
        version: "v1",
        username: "<<service_username>>",
        password: "<<service_password>>",
     }, bluemix.getServiceCreds("machine_translation")));

     return {
        translate: function(req, res) {
             var params = {
                  text: req.body.text,
                  to: req.body.to || "eses",
                  from: "enus"
             };
             machineTranslation.translate(params, function(error, result) {
                 if (error) {
                     return res.status(error.error ? error.error.code || 500 : 500).json({ error: error });
                 } else {
                     return res.json(result);
                 }
             });
         } 
     }
}();