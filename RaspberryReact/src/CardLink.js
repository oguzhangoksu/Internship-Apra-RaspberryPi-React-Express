
import './index.css'
import { Card, Header } from 'semantic-ui-react'
const CardLink = (props) => {

  function multiCard() {
    console.log("multicard", props)
    var donecek = []



    for (var i = 0; i < props.sayi; i++) {
      donecek.push(

        <Card className='ui.card'
          as='a'//tıklanabilir özellik katıyo bir bak
          href={props.isimler[i]}
          header={props.isimler[i]}

          description={"Cpu sıcaklık:" + props?.cpu[i] + "," +
            "Toplam ram:(MB)" + props?.ram[i]?.memTotal / 1000000 + "," +
            "Kullanılan Ram:(MB)" + props?.ram[i]?.memUsed / 1000000 + "," +
            "Bağlantı:" + props?.wifi[i]?.mevcutBaglanti[0]?.ssid}

        />


      )
    }
    return donecek;
  }

  return (
    <div>
      <Header className='.ui.header'> Cihazlar </Header>
      <div className='containerCard'>

        {multiCard()}
      </div>
    </div>
  )

}



export default CardLink;
