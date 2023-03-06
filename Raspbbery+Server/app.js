var express = require('express');
var app = express();
const si = require('systeminformation')

const axios = require('axios');
const io = require('socket.io-client');
var Wifi = require('rpi-wifi-connection');
var wifi = new Wifi();
const moment = require('moment');

var makineAdi = 'Enjeksiyon1';
var Jsonbilgi;




async function bilgiler() {
    //CPU SICAKLIK
    var cpuSicaklik = await new Promise((resolve) => {
        si.cpuTemperature().then(data => {
            resolve(data.main);
        })
    })

    //RAM MİKTARI
    var ramMiktari = await new Promise((resolve) => {
        si.mem().then(data => {
            memTotal = data.total;
            memUsed = data.used;

            resolve({
                memTotal,
                memUsed
            })
        })
    })

    //WIFI KALİTESİ
    var wifiData = await new Promise((resolve) => {
        si.wifiNetworks().then(baglantilar => {
            si.wifiConnections().then(mevcutBaglanti => {
                resolve({
                    baglantilar,
                    mevcutBaglanti
                });
            })
        })
    })

    //DISK
    var diskKapasite = await new Promise((resolve) => {
        si.fsSize().then(data => {
            diskSize = data[0].size
            diskSizeAvaliable = data[0].available
            resolve({
                diskSize,
                diskSizeAvaliable
            })

        })

    })

    return ({
        cpuSicaklik,
        ramMiktari,
        wifiData,
        diskKapasite
    })


}

donecek();



function donecek() {
    app.use(express.json());
    app.post('/', function (request, response) {
        if (request.body.password === "abc") {
            wifi.getStatus().then((status) => {response.send(status.ip_address)})
            //socket bağlatısı
            const socket = io.connect(request.body.ipadress);
            socket.on('connect', (data, error) => {
                if (error) throw error
                console.log('bağlandım')

            })
            //disconnect olduğunda donecek fonksiyonunu tekrarla
            socket.on('disconnect', (response) => {
                socket.disconnect()
                clearInterval(myInterval)
                donecek()
            })
            var myInterval = setInterval(() => {
                wifi.getStatus().then((status) => {
                    bilgiler().then((result) => {
                        socket.emit('data', {
                            cihaz_adi: makineAdi,
                            cihaz_ip: status.ip_address,
                            status: "online",
                            bilgiler: result,
                            kimlik: socket.id,
                            tarih: `${moment().format('MMMM Do YYYY, h:mm:ss a')}`
                        })
                        console.log({
                            cihaz_adi: makineAdi,
                            cihaz_ip: status.ip_address,
                            status: "online",
                            bilgiler: result,
                            kimlik: socket.id,
                            tarih: `${moment().format('MMMM Do YYYY, h:mm:ss a')}`
                        })
                    })
                })

            }, 3000)
        }


        else {
            response.send("It is NOT your device!")
        }
    });


}
app.listen(3005);
