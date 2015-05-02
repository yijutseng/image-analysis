/**
 * Copyright 2014 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var fs = require("fs"),
	extend = require("util")._extend,
	watson = require("watson-developer-cloud"),
	bluemix = require("../config/bluemix");

module.exports = function() {
	
	var visualRecognition = watson.visual_recognition(extend({
		version: "v1",
		username: "<<service_username>>",
		password: "<<service_password>>"
	}, bluemix.getServiceCreds("visual_recognition")));
	
	return {
		recognize: function(req, res) {

			var stream = fs.createReadStream(req.files.imgFile.path);
			var params = {
				image_file: stream
			};

			visualRecognition.recognize(params, function(error, result) {
				if (error) {
					return res.status(error.error ? error.error.code || 500 : 500).json({ error: error });
				} else {
					return res.json(result);
				}
			});
		}
	}
}();