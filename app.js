var express = require('express');
var app = express();
var bodyParser = require('body-parser');
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('./'));

var locationArray = [/*[-34.397, 150.644]*/];
var initLocation = false;

// GET, POST 방식 둘 다 /testcfc 사용 가능
app.get('/testcfc', function (req, res) {
    console.log("call app.get from $");
    if (!initLocation && locationArray.length > 0) {
        // res.send(locationArray);
        console.log("call app.get success");
        res.send(locationArray);
    }
    else if (initLocation) {
        console.log("init all Location");
        initLocation = false;
        res.send("initLocation");
    }
    else {
        console.log("call app.get fail");
        res.send("fail");
    }
});

app.get('/initLocation', function (req, res) {
    initLocation = true;
    locationArray = [];
    res.send();
});

app.post('/testcfc', function (req, res) {

    // Latitude 값 받아옴
    console.log(req.body.Latitude);

    // Longitude 값 받아옴
    console.log(req.body.Longitude);

    // Lat, Lng를 locationArray array에 추가하자.
    locationArray.push([Number(req.body.Latitude), Number(req.body.Longitude)]);

    console.log(locationArray);

    /* post로 받는 console.log 결과 
    37.27927927927928
    127.08063325297499

    이 값을 index.html의 var marker = new google.maps.Marker 의 position 값에 어떻게 전달할까요..
    */

    // console.log(res.send('oh'));
    res.send("success");
});

var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('server start');
});