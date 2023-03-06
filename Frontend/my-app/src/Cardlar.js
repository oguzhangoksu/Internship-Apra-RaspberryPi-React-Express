
import GaugeChart from 'react-gauge-chart'
import './card.css'
import './App.css'
import './input.css'
import { useEffect, useState } from 'react';
const io = require('socket.io-client');
const axios = require('axios');


const allDevices = [{cihaz_adi:'Enjeksiyon1',status:"offline"},{cihaz_adi:'Enjeksiyon2',status:"offline"},{cihaz_adi:'Enjeksiyon3',status:"offline"}]
const Cardlar = (props) => {
   
console.log("kopancihaz",props.kopanCihaz)

    const[ip,setIp]=useState();
  
    function multicard() {
        var donecek = []
        for (var i = 0; i < allDevices.length; i++) {

            donecek.push(
                <div style={{
                    border: '0.1px solid black',
                    borderRadius: '10px',
                    margin: '10px'
                }}>
                    <GaugeChart
                        nrOfLevels={20}
                        percent={allDevices[i]?.bilgiler?.cpuSicaklik ? allDevices[i].bilgiler.cpuSicaklik / 100 : 0}
                        animate={false}
                        textColor={'#5BE12C'}
                    />

                    <a class="ui card" style={{
                        textDecoration: 'none',
                        margin: '20px'
                    }}>
                        <div class="content">
                            <div class="header">{allDevices[i]?.cihaz_adi}</div>
                            <div class="meta">
                                <span class="category">Fabrika1</span>
                            </div>
                            <div class="description">
                                <p>Status:{allDevices[i]?.status}</p>
                                <p>Cpu sıcaklık:{allDevices[i]?.bilgiler?.cpuSicaklik}</p>
                                <p>Toplam ram:{ (allDevices[i]?.bilgiler?.ramMiktari?.memTotal/1000000)?.toFixed(2)+" MB"}</p>
                                <p>Kullanılan ram:{(allDevices[i]?.bilgiler?.ramMiktari?.memUsed/1000000)?.toFixed(2)  + " MB"}</p>
                                <p>Toplam Disk boyutu:{(allDevices[i]?.bilgiler?.diskKapasite?.diskSize/1000000000)?.toFixed(2) + " GB"}</p>
                                <p>Kullanılabilir Disk Boyutu:{(allDevices[i]?.bilgiler?.diskKapasite?.diskSizeAvaliable/1000000000)?.toFixed(2) + " GB"}</p>
                            </div>
                        </div>
                        <div class="extra content">
                            <div class="right floated author">

                            </div>
                        </div>
                    </a>
                </div>

            )
        

        }
        if(props.kopanCihaz){
            console.log("girdi")
            var index=allDevices.findIndex((e)=>{return e.kimlik===props.kopanCihaz})
            console.log(index)
            if(allDevices[index]){ allDevices[index].status="offline"}
        }

        if(props.liveData.cihaz_adi && !allDevices.find((e)=>{return e.cihaz_adi===props.liveData.cihaz_adi})){
            //yeni gelen objeyi array'e pushlama
            allDevices.push(props.liveData)
        }
        else{
            //var olan arraydeki objeyi değiştirme
            var index=allDevices.findIndex((e)=>{return e.cihaz_adi===props.liveData.cihaz_adi})
            allDevices[index]=props.liveData
        }

        return donecek;
    }
    function endPoint(x){
        console.log("girdi")
        axios.post('http://192.168.1.36:3004/tarama',{ip:x}).then(response=>{console.log(response)}).catch(error=>{console.log(error)})
        
    }
    function stop(x){
        console.log("girdi")
        axios.post('http://192.168.1.36:3004/stop',{stop:true}).then(response=>{console.log(response)}).catch(error=>{console.log(error)})
        
    }

    return (
        <>
            <div>
                <div class="ui input" style={{ marginTop: "100px", marginLeft: "350px" }}value={ip} onChange={(e)=>{setIp(e.target.value)}}>
                    <input type="text" placeholder="IP..." />
                </div>
                <button class="ui button" onClick={(e)=>{endPoint(ip)}}>
                    Tarama
                </button>
                <button class="ui button" onClick={(e)=>{stop(ip)}}>
                    STOP
                </button>
            </div>
            <div class='divContainer'>

                {multicard()}
            </div>
        </>
    )

//{multicard()}
}

export default Cardlar