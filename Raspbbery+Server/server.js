import axios from 'axios';
import express from 'express';
var app = express();
import cors from 'cors';
import mysql from 'mysql';

var deviceList = {
    makineList: []
}

const json1 = { password: "abc" };
var x = 43
var deviceIp = []
var numberdevice = 0;


var con = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'machineinfo'
});

con.connect(function (err) {
    if (err) throw err
    else { console.log('Mysql connection is succesfull') }
})

while (x !== 50) {
    try {
        //console.log("x:" + x)
        var url = `http://192.168.1.${x}:3005/`
        const res = await axios.post(url, json1, { timeout: 2000 });
        deviceList.makineList[numberdevice] = res.data;
        if (res) {
            console.log("x:" + x)
            console.log("deviceip:" + deviceIp)
            console.log("number device: " + numberdevice)
            deviceIp.push(x)
        }
        x++
        numberdevice++;
    }
    catch (err) {
        x++;
        continue;

    }
}

async function degerDondur() {
    try {
    for (var i = 0; i < deviceIp.length; i++) {
        var url = `http://192.168.1.${deviceIp[i]}:3005/`
        const res = await axios.post(url, json1, { timeout: 1000 });
        deviceList.makineList[i] = res.data;
        x++;
    }
} catch (err) {
     alert("Error has occured.");
  }
}

// function for inserting the data
async function insert() {
    try {
    for (var i = 0; i < deviceIp.length; i++) {
        var url = `http://192.168.1.${deviceIp[i]}:3005/`
        const res = await axios.post(url, json1, { timeout: 1000 });
        deviceList.makineList[i] = res.data;

        if (res.data !== undefined) {

            //INSERT DATA
            let machine = {
                makineAdi: res.data.makineAdi,
                cpuSicaklik: res.data.cpuSicaklik,
                memTotal: res.data.ramMiktari.memTotal,
                memUsed: res.data.ramMiktari.memUsed,
                baglantilar: JSON.stringify(res.data.wifiData.baglantilar),
                mevcutBaglanti: JSON.stringify(res.data.wifiData.mevcutBaglanti),
                diskSize: res.data.diskKapasite.diskSize,
                diskSizeAvaliable: res.data.diskKapasite.diskSizeAvaliable
            };
            let sql = 'INSERT INTO machines SET ?';
            con.query(sql, machine, (err, result) => {
                console.log('çalıştı')
                if (err) throw err;
                console.log(result);

            });
        } else {
            console.log('It is undefined')
        }
        x++;
    }
} catch (err) {
    alert("Error has occured.");
  }
}




// SEND DATA TO DATABASE EVERY 25 MINUTES - 1500000
let display = setInterval(insert, 1500000);

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

app.post('/', function (request, response) {
    degerDondur().then(
        response.json(deviceList),
        console.log("response"),
        console.log(deviceIp),
        console.log(numberdevice),
        console.log(deviceList))
});

app.post('/degerler', function (request, response) {
    //SELECT DATA TO SEND FOR GRAPH
    con.query("SELECT * FROM machines", function (err, result) {
        if (err) throw err;
        console.log(result);
        response.json(result)
    });
});


app.listen(3005);