
import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Cardlar from './Cardlar';
import React from 'react';

const io=require('socket.io-client');
const socket = io.connect("http://192.168.1.36:3004")

function App() {

const[liveData,setLiveData]=useState([]);
const[kopanCihaz,setKopanCihaz]=useState()

socket.on('connect',(error,result)=>{
  if(error) throw error;
  console.log("bağlandım")
})
socket.on('canlibilgi',(bilgi)=>{
  setLiveData(bilgi)
  

})
socket.on('koptu',(kopan)=>{
  console.log(kopan)
  setKopanCihaz(kopan)
})


  return (
    <BrowserRouter>
    <div>
      <Routes>
        <Route exact path='/' element={<Cardlar liveData={liveData} kopanCihaz={kopanCihaz}/>}/>
      </Routes>
    </div>
   </BrowserRouter>
  );
}

export default App;
