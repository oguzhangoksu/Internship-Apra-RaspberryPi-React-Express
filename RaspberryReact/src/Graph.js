import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Card } from 'semantic-ui-react'

const Graph = (props) => {

    const { name } = useParams();
    const [data, setData] = useState([]);
    const [currentData, setCurentData] = useState([]);


    const description = <>
        <p style={{ color: 'black' }}>Cpu Sıcaklık:{(currentData[0]?.cpuSicaklik)?.toFixed(2)}°C </p>
        <p style={{ color: 'black' }}>Disk Kapasite:{(currentData[0]?.diskKapasite?.diskSize / 1000000000)?.toFixed(2)} GB</p>
        <p style={{ color: 'black' }}>Kullanılabilir alan:{(currentData[0]?.diskKapasite?.diskSizeAvaliable / 1000000000)?.toFixed(2)} GB</p>
        <p style={{ color: 'black' }}>Ram Miktarı:{(currentData[0]?.ramMiktari?.memTotal / 1000000)?.toFixed(2)} MB</p>
        <p style={{ color: 'black' }} >Kullanılan Ram miktarı:{(currentData[0]?.ramMiktari?.memUsed / 1000000)?.toFixed(2)} MB</p>
        <p style={{ color: 'black' }}>Wifi Mevcut Bağlatı:{currentData[0]?.wifiData?.mevcutBaglanti[0]?.ssid}</p>
    </>


    useEffect(() => {
        divide()
        divideCurrent();
    }, [props])

    function divide() {
        const _data = [];
        props.degerler.map((deger) => {
            if (deger.makineAdi === name) {
                _data.push({
                    date: deger.lastUpdated,
                    cpu: deger.cpuSicaklik,
                    ramUsed: deger.ramMiktari.memUsed / 1000000,
                    ramTotal: deger.ramMiktari.memTotal / 1000000,
                    diskSize: deger.diskKapasite.diskSize,
                    diskSizeAvaliable: deger.diskKapasite.diskSizeAvaliable,



                })

            }
        })

        setData(_data);

    }

    function divideCurrent() {
        var _dataCurrent = []
        props.devices.map((device) => {
            if (device.makineAdi === name) {
                _dataCurrent.push(device);

            }

        })

        setCurentData(_dataCurrent)
        console.log("_datacurrent", _dataCurrent)
    }

    return (

        <div className='containerGraph'>
            <div style={{
                flexDirection: "column",
                fontSize: 15
            }}>

                Cpu Sıcaklık
                <LineChart width={1000} height={300} data={data} margin={{ top: 10, right: 20, bottom: 5, left: 30 }}>
                    <Line type="monotone" dataKey="cpu" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                </LineChart>


                Kullanılan Ram('MB')

                <LineChart width={1000} height={300} data={data} margin={{ top: 10, right: 20, bottom: 5, left: 30 }}>
                    <Line type="monotone" dataKey="ramUsed" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 1000]
                    } type="number" />
                    <Tooltip />
                </LineChart>


            </div >
            <div style={{ display: "grid" }}>
                <Card >
                    <Card.Content header={name} />
                    <Card.Content className='.ui.card.content.description'
                        description={description}
                    />
                    <Card.Content extra>
                    </Card.Content>
                </Card>
                <a href="http://localhost:3000/">
                    <button class="ui button">
                        geri
                    </button>
                </a>
            </div>


        </div>
    )
}
export default Graph;

