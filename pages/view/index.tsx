import Head from 'next/head';
import { useState,useEffect } from "react";
import Image from 'next/image';
import Menu1 from '@/gambar/2.png';
import Menu2 from '@/gambar/2.png';
import axios from "axios";
import { stat } from "fs";

const koneksiPakaian = axios.create({ 
  baseURL: "http://127.0.0.1:5000/api/pakaian" 
});

export default function Home() {
  const [pakaian, setPakaian] =  useState(null);

  useEffect(() => {
    async function getPakaian() {
      const response = await koneksiPakaian.get("/").then(function (axiosResponse) {
        setPakaian(axiosResponse.data.data);
      })
        
      .catch(function (error) {   
        alert('error from pakaian in api pakaian: '+error);
      });
    }
    
    getPakaian();
  }, []);

  if(pakaian==null){
    return(
      <div>
        waiting...
      </div>
    )
  }else{

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className="container-home">
        <div className="header-home">
          <center>
            <h1>Ema Clothing Management</h1>
          </center>
        </div>
        <div className="isi-home">
          <div className="left-home">
            <Image style={{marginTop: "40%", borderRadius: "10px", cursor: "pointer"}} src={Menu1} width={80} height={80} />
            <h1 style={{color: "yellow"}}>Home</h1>
            <br />
            <br />
            <Image style={{marginTop: "40%", borderRadius: "10px", cursor: "pointer"}} src={Menu2} width={80} height={80} />
            <h1>Inventory</h1>
          </div>
          <div className="right-home">
            <div className="menusearch-home">
              <ul className='ul-search-home'>
                <li><input type="text" placeholder='Masukkan code' /></li>
                <li style={{padding: "3%", cursor: "pointer"}}>Search</li>
              </ul>
            </div>
            <div className="data-home" style={{paddingTop: "5%"}}>
              <div className="data">
                {pakaian.map((data) => 
                  <ul>
                    <li><img src={data.gambar} width="80"/></li><br />
                    <li>{data.kode_baju}</li><br />
                    <li>{data.nama}</li><br />
                    <li>{data.stok}</li><br />
                    <li>{data.modal}</li><br />
                    <li>{data.harga_jual}</li><br />
                  </ul>
                )}
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
}