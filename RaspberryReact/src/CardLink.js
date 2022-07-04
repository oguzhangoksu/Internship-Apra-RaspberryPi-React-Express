

import { Card } from 'semantic-ui-react'
const CardLink = (props) => {

  function multiCard() {
    console.log("multicard",props)
    var donecek = []
    for (var i = 0; i < props.sayi; i++) {
      donecek.push(
        <Card
          as='a'//tıklanabilir özellik katıyo bir bak
          href={props.isimler[i]}
          header={props.isimler[i]}
          description={"Cpu sıcaklık:" + props?.cpu[i] + ", " +
            "Toplam ram:" + props?.ram[i]?.memTotal + "," +
            "Kullanılan Ram:" + props?.ram[i]?.memUsed + "," +
            "Bağlantı:" +props?.wifi[i]?.mevcutBaglanti[0]?.ssid}
        />


      )
    }
    return donecek;
  }

  return (

    <div className='containerDiv'>
      {multiCard()}
    </div>

  )

}



export default CardLink;
