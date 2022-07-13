import './index.css'
import { Card, Header } from 'semantic-ui-react'
import Cihazlar from './Cihazlar'
const CardLink = (props) => {

  function multiCard() {
    console.log("multicard", props)
    var donecek = []

    for (var i = 0; i < props.sayi; i++) {
      donecek.push(

        <Card className='ui.card'
          as='a'
          href={props.isimler[i]}
          header={props.isimler[i]}

          description=
          {<>
          <p style={{color:'black'}}>Cpu sıcaklık: {props?.cpu[i]?.toFixed(2)}°C</p>
          <p style={{color:'black'}}>Toplam ram:  {(props?.ram[i]?.memTotal / 1000000)?.toFixed(2)} MB</p>
          <p style={{color:'black'}}>Kullanılan Ram: {(props?.ram[i]?.memUsed / 1000000)?.toFixed(2)} MB</p>
          <p style={{color:'black'}}>Bağlantı: {props?.wifi[i]?.mevcutBaglanti[0]?.ssid}</p>
          </>}
          color="green"
        />
      )
    }
    return donecek;
  }
  return (
    <div className='root'>
      <Cihazlar devices={props.devices}/>
      <div style={{"textAlign":"left",
                      "margin":"20px",
                      "fontSize":"25px"}}> Bağlı Cihazlar </div>
      <div className='containerDiv'>
        {multiCard()}
      </div>
    </div>
  )

}

export default CardLink;
