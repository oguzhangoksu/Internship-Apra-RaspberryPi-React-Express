const axios = require('axios');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const cors = require('cors');
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});
const mysql = require('mysql');
app.use(cors({
    origin: 'http://localhost:3000',
    methods: "GET, POST"
}));

//SQL bağlantısı
let db_con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "deneme"
})
db_con.connect((err) => {
    if (err) {
        console.log("Connection Failed")
        return;
    }
    console.log("We are connected")
})


var allDevices = [];//tüm cihazlar buraya gelicek
const json1 = {
    password: "abc",
    ipadress: "http://192.168.1.36:3004" //server ip adresi
};

var cihazip_socketid = [] // Örnek [{cihaz_ip:50,socketip:socket.ip}]

app.use(express.json());
var stop = false;

//Frontend bağlantı ve ip adresslerini tarama 
app.post('/tarama', (req, res) => {

    console.log(req.body)
    var y = req.body.ip
    var x = 0;
    while (x <= y) {
        console.log(x)
        console.log(stop)
        if (cihazip_socketid.find((e) => { return e.ip === x })) {
            x++;
            continue;
        }
        axios.post(`http://192.168.1.${x}:3005/`, json1, { timeout: 2000 })
            .then(response => {
                x++;
            }).catch(error => {

                x++;
            })
        x++;
    }
    stop = false

})
//React kısmında stop tuşu basılırsa true olur
app.post('/stop', (req, res) => {
    console.log(req.body)
    stop = req.body.stop
    res.send("oldu")
})


http.listen(3004);

//MYSQL'e yazım 

    //data basede veri varmı, varsa bunları allDevices'a atar

    var sql5 = `SELECT * FROM cihazlar2;`
    db_con.query(sql5, (err, result) => {
        result.map((e) => { allDevices.push(e) })

    })

   //Socket.io connection oluşurur
    io.on('connection', (socket => {

        console.log(socket.id, "bağlandı")
        socket.on('data', (bilgi) => {
            console.log("stop", stop)
            if(stop){
                socket.disconnect()
            }
            else{
            if(!cihazip_socketid.find((e)=>{return e.socketid===socket.id})){
            cihazip_socketid.push({ip:Number((bilgi.cihaz_ip).slice(-2)),socketid:socket.id})}


            var machine = {
                cpuSicaklik: bilgi.bilgiler.cpuSicaklik,
                ramMiktari: bilgi.bilgiler.ramMiktari,
                baglantilar: bilgi.bilgiler.wifiData.baglantilar,
                mevcutBaglanti: bilgi.bilgiler.wifiData.mevcutBaglanti,
                diskSize: bilgi.bilgiler.diskKapasite.diskSize,
                diskSizeAvaliable: bilgi.bilgiler.diskKapasite.diskSizeAvaliable
            }
            var sql = `SELECT * FROM cihazlar2 WHERE cihaz_adi='${bilgi.cihaz_adi}' `

            db_con.query(sql, (err1, result1) => {
                if (Object.keys(result1).length !== 0) {

                    var sql2 = `UPDATE cihazlar2 SET cihaz_ip='${bilgi.cihaz_ip}', status='${bilgi.status}',bilgiler='${JSON.stringify(machine)}',kimlik='${bilgi.kimlik}', tarih='${bilgi.tarih}' WHERE cihaz_adi='${bilgi.cihaz_adi}'`
                    db_con.query(sql2, (err2, result2) => {
                        if (!allDevices.find((e) => { return e.cihaz_adi === result1[0].cihaz_adi })) {
                            //yeni gelen objeyi array'e pushlama, bu array bütün var olan cihazlarımızı içerir
                            allDevices.push(result1[0])

                        }

                        if (result2) {
                            console.log("🎆🎈🎈🎆🎆🎈",socket.id)
                            console.log("👍update edildi----------------------------------")
                            
                        }
                        else {
                            console.log("err", err2)
                        }
                    })
                }
                else {
                    var sql2 = `INSERT INTO cihazlar2(cihaz_adi,cihaz_ip,status,bilgiler,kimlik,tarih) VALUES('${bilgi.cihaz_adi}','${bilgi.cihaz_ip}','${bilgi.status}','${JSON.stringify(machine)}' ,'${bilgi.kimlik}','${bilgi.tarih}')`

                    db_con.query(sql2, (err, result2) => {
                        //yeni gelen objeyi array'e pushlama bu array bütün var olan cihazlarımızı içerir
                        console.log("🎈", result1)
                        if (result1[0]?.cihaz_adi) {
                            allDevices.push(result1[0])
                        }

                        if (result2) {
                            console.log("🎶insert edildi-------------------")
                        }
                        else {
                            console.log("err", err)
                        }
                    })
                }

            })
            io.emit("canlibilgi", bilgi)//bilgiyi react'a gönderiyoruz, istersek buraya allDevices ekleyebilir var olan bütün cihazları array şeklinde verebiliriz.
        }
        })

        //Kopan cihazları statüsünü koptu yapma
        socket.on('disconnect', (reason) => {
            console.log("disconnect", socket.id)

            io.emit("koptu", socket.id)
            var sql4 = `UPDATE cihazlar2 SET status='offline' WHERE kimlik='${socket.id}'`
            db_con.query(sql4, (err, result4) => {
                if (result4) {
                    console.log("çıkış ",cihazip_socketid)
                    if(cihazip_socketid.find((e)=>{return e.socketid===socket.id})){
                        var index=cihazip_socketid.findIndex((e)=>{return e.socketid===socket.id})
                        cihazip_socketid[index]={}
                    }
                    console.log("👌durum offline oldu")
                }

                else {
                    console.log("err", err)
                }
            })

        })



    }))

