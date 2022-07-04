var express = require('express');
var app = express();
const si = require('systeminformation')
makineAdi='Enjeksiyon2';





async function degerDondur(){
    //CPU SICAKLIK
    var cpuSicaklik =await new Promise((resolve)=>{
        si.cpuTemperature().then(data => {
            resolve(data.main);
        })
    })

    //RAM MİKTARI
    var ramMiktari = await new Promise((resolve)=>{
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
    var wifiData= await new Promise((resolve)=>{
        si.wifiNetworks().then(baglantilar => {
            si.wifiConnections().then(mevcutBaglanti =>{
                resolve({
                    baglantilar,
                    mevcutBaglanti
                });
            })
        })
    })
    
    //DISK
    var diskKapasite= await new Promise((resolve)=>{
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
        makineAdi: makineAdi,
        cpuSicaklik,
        ramMiktari,
        wifiData,
        diskKapasite
    })

  



}

app.use(express.json());

app.post('/',function (request, response) {
    if (request.body.password === "abc") { 
        degerDondur().then((res)=>{
            console.log(res)
            response.json(res);
        })
    }

    
    else {
       response.send("It is NOT your device!")
    }
});



app.listen(3005);