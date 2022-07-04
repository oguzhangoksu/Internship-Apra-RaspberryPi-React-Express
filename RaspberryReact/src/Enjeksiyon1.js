import { useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { Header } from 'semantic-ui-react';
const Enjeksiyon1 = (props) => {

    const [data,setData]=useState([]);
    const [currentData,setCurentData]=useState([]);

    useEffect(()=> {
        divideCurrent();
        divide();
    }, [props])

    function divide() {
        var _data = []
        props.degerler.map((deger) => {
            if (deger.makineAdi === "Enjeksiyon1") {
                var obje = {
                    date: deger.lastUpdated,
                    cpu: deger.cpuSicaklik,
                    ramUsed: deger.ramMiktari.memUsed /1000000,
                    ramTotal: deger.ramMiktari.memTotal /1000000,
                    diskSize: deger.diskKapasite.diskSize,
                    diskSizeAvaliable: deger.diskKapasite.diskSizeAvaliable,
                }
                _data.push(obje)
            }
        })
        setData(_data)
        {console.log("_data",_data)}
    }

    function divideCurrent(){
        var _dataCurrent=[]
        props.devices.map((device)=>{
            if(device.makineAdi==="Enjeksiyon1"){
                _dataCurrent.push(device);
            }
        })
    
        setCurentData(_dataCurrent)
        console.log("_datacurrent",_dataCurrent)
    }



    return (
        
        <div>
            <Header style ={{ margin: 10, fontSize:30}}> Enjeksiyon 1</Header>
            <div style={{fontSize:15}}>
                Cpu Sıcaklık
                <LineChart width={1000} height={300} data={data} margin={{ top: 10, right: 20, bottom: 5, left: 30 }}>
                    <Line type="monotone" dataKey="cpu" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                </LineChart>
            </div>
            <div  style={{fontSize:15}}>
                Kullanılan Ram('MB')
                
                <LineChart width={1000} height={300} data={data} margin={{ top: 10, right: 20, bottom: 5, left: 30 }}>
                    <Line type="monotone" dataKey="ramUsed" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="date" />
                    <YAxis  domain={[0,448.696320]}/>
                    <Tooltip />
                </LineChart>

            </div>
            <div style={{marginLeft: 40}}>
                <p>Cpu Sıcaklık:
                {currentData[0]?.cpuSicaklik}
                </p>
                <p>Disk Kapasite(GB):
                {currentData[0]?.diskKapasite?.diskSize/1000000000}
                </p>
                <p>
                Kullanılabilir alan(GB):
                {currentData[0]?.diskKapasite?.diskSizeAvaliable/1000000000}
                </p>
                <p>
                Ram Miktarı(MB):
                {currentData[0]?.ramMiktari?.memTotal/1000000}
                </p>
                <p>
                Kullanılan Ram miktarı(MB):
                {currentData[0]?.ramMiktari?.memUsed/1000000}
                </p>
                <p>
                Wifi Mevcut Bağlatı:
                {currentData[0]?.wifiData?.mevcutBaglanti[0].ssid}
                </p>
            </div>
            


        </div>
    )


}
export default Enjeksiyon1
