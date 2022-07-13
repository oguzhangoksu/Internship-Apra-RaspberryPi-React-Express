import React from 'react'

const allDevices = [{ isim: "Enjeksiyon1", durum: false }, { isim: "Enjeksiyon2", durum: false }, { isim: "Enjeksiyon3", durum: false },
{ isim: "Enjeksiyon4", durum: false }, { isim: "Enjeksiyon5", durum: false }, { isim: "Enjeksiyon6", durum: false }, { isim: "Enjeksiyon7", durum: false },
{ isim: "Enjeksiyon8", durum: false },];
const Cihazlar = (props) => {

  return (
    <>
      <div style={{
        "textAlign": "left",
        "fontSize": "200%",
        "margin": "20px",
        "fontSize":"25px"
      }}> Bütün cihazlar </div>
      <div className='items'>
        {allDevices.map((device) => {
          props.devices.find((Element) => { if (Element.makineAdi === device.isim) { device.durum = true } })
          return (
            <div className={device.durum ? 'itemOnline' : 'itemOffline'} name={device.isim}>{device.isim}</div>
          )

        })}
      </div>
    </>
  )
}

export default Cihazlar
