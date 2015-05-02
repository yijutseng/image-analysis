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

var express = require("express"),
	vr = require("./routes/vr"),
	tts = require("./routes/tts");

// Bootstrap application settings
var app = express();
require("./config/express")(app);

app.post("/recognize", vr.recognize);
app.get("/voices", tts.voices);
app.post("/speak", tts.speak);

var port = process.env.VCAP_APP_PORT || 3000;
app.listen(port, function() {
	console.log("listening at:", port);
});