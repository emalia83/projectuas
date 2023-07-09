import { useState,useEffect } from "react";
import axios from "axios";
import Image from 'next/image';
import Menu1 from '@/gambar/home.png';
import Menu2 from '@/gambar/inventory.png';
import { stat } from "fs";

 
 const koneksiPakaian = axios.create({
  
  baseURL: "http://127.0.0.1:5000/api/pakaian" 
});

export default function FormPakaian() {
  const [statekode_baju, setKode_baju] = useState("");
  const [statenama, setNama] = useState("");
  const [statestok, setStok] = useState("");
  const [statemodal, setModal] = useState("");
  const [stategambar, setGambar] = useState("");
  const [stateharga_jual, setHarga_jual] = useState("");
  const [pakaian, setPakaian] = useState(null);

  const handleSubmitAdd = (event) => {
    
    event.preventDefault();
    const formData = new FormData(event.target);
    koneksiPakaian
      .post("/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
     
 }

const handleSubmitEdit =  (event) => {    
  event.preventDefault();
  const address = "/"+event.target.kode_baju.value;
  const formData = {
    kode_baju: event.target.kode_baju.value,
    nama: event.target.nama.value,
    stok: event.target.stok.value,
    modal: event.target.modal.value,
    harga_jual: event.target.harga_jual.value
}
  koneksiPakaian
    .put( address,formData)
    .then((res) => {
      console.log(res);
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
   
}

 const handleEdit = (event) => {
  event.preventDefault();
  var kode_baju = event.target.value;

  document.getElementById("formedit").style.display = "inline";
  document.getElementById("formadd").style.display = "none";
  
     const mhsEdit = pakaian.filter((pakaian) => {
           return pakaian.kode_baju == kode_baju;
        });
        if(mhsEdit!=null){

          setNama(mhsEdit[0].nama);
          setKode_baju(mhsEdit[0].kode_baju);
          setStok(mhsEdit[0].stok);
          setModal(mhsEdit[0].modal);
          setHarga_jual(mhsEdit[0].harga_jual);
          setGambar(mhsEdit[0].gambar);
        }
}

 const handleDelete = (event) => {
  event.preventDefault();
  var kode_baju = event.target.value;
  koneksiPakaian.delete(`/${kode_baju}`)
    .then(response => {
      console.log('Data berhasil dihapus:', response.data);
      window.location.reload();
      setPakaian(
        pakaian.filter((pakaian) => {
           return pakaian.kode_baju !== kode_baju;
        }))
   
      // Lakukan langkah-langkah lain setelah penghapusan data
    })
    .catch(error => {
      console.error('Gagal menghapus data:', error);
    })
}

  
  useEffect(() => {
      async function getPakaian() {
        const response = await koneksiPakaian.get("/").then(function (axiosResponse) {
            setPakaian(axiosResponse.data.data); 
     
         })
         .catch(function (error) {   
          alert('error from pakaian in api kpakaian: '+error);
         });;
          }
      getPakaian();
    }, []);

    const backHome = (event) => {
      window.location.href = "/";
    }
  
   
if(pakaian==null){
return(
  <div>
    waiting...
  </div>
)
}else{

  return (
   <center><div>
    <div className="header-home gradasi-linear ">
      <center>
        <h1 className="title">Ema Clothing Management</h1>
      </center>
    </div>
    <div className="left-home gradasi-background">
      <Image onClick={backHome} style={{marginTop: "40%", borderRadius: "10px", cursor: "pointer"}} src={Menu1} width={80} height={80} />
      <h1 onClick={backHome}>Home</h1>
      <br />
      <br />
      <Image style={{marginTop: "40%", borderRadius: "10px", cursor: "pointer"}} src={Menu2} width={80} height={80} />
      <h1 style={{color: "yellow"}}>Inventory</h1>
    </div>
    <div className="isi-kiri" id="isi-kiri">
      <table border={5}>
        <thead>
          <tr style={{textAlign:"center"}}>
            <td>Kode Baju</td> 
            <td>Nama</td>
            <td>Stok</td>
            <td>Modal</td>
            <td>Harga Jual</td>
            <td>Gambar</td>
            <td colSpan={2}><center>Action</center></td>
          </tr>
        </thead>
        <tbody>
          {pakaian.map((kk) => 
            <tr style={{textAlign:"center"}}>
              <td>{kk.kode_baju}</td>
              <td>{kk.nama}</td>
              <td>{kk.stok}</td>
              <td>{kk.modal}</td>
              <td>{kk.harga_jual}</td>
              <td><img src={kk.gambar} width="80"/></td>
              <td><button className="ngedit" onClick={handleEdit} value={kk.kode_baju}>Edit</button></td>
              <td><button className="ngehapus" onClick={handleDelete} value={kk.kode_baju}>Delete</button></td>
            </tr>
          )}     
        </tbody>
      </table>
    </div>
    <div className="isi-kanan">
      <form id="formadd" style={{marginLeft: "5%", marginTop: "15%"}} className="form-inventory"  onSubmit={handleSubmitAdd} >
       <h3>TAMBAH DATA </h3><br/>
        <table border={0}>
          <tbody>
            <tr>
              <td><label> Kode Baju</label></td>
              <td><input type="text" id="kode_baju" name="kode_baju"/></td>
            </tr>
          
            <tr>
              <td><label> Nama</label></td>
              <td><input type="text" id="nama" name="nama" /></td>
            </tr>
            
            <tr>
              <td><label> Stok</label></td>
              <td><input type="text" id="stok" name="stok"/></td>
            </tr>
            <tr>
              <td><label> Modal</label></td>
              <td><input type="text" id="modal" name="modal"/></td>
            </tr>
            <tr>
              <td><label> Harga Jual</label></td>
              <td><input type="text" id="harga_jual" name="harga_jual"/></td>
            </tr>
            <tr>
              <td><label> Gambar</label></td>
              <td><input type="file" name="gambar"/></td>
            </tr>
          </tbody>
        </table>
        <br/>
        <input type="submit" value="kirim" />
      </form>
      <div className="contoh">
      <form style={{display: "none", marginLeft: "5%", marginTop: "15%"}} className="form-inventory" id="formedit" onSubmit={handleSubmitEdit}>
        <h3>EDIT DATA PAKAIAN</h3>
          <table border={0}>
            <tbody>
              <tr>
                <td><label> Kode Baju:</label></td>
                <td><input type="text" id="kode_baju" value={statekode_baju} name="kode_baju"/></td>
              </tr>
              <tr>
                <td><label> Nama:</label></td>
                <td><input type="text" id="nama" value={statenama} name="nama" onChange={(e) => setNama(e.target.value)} /></td>
              </tr>
              <tr>
                <td><label> Stok:</label></td>
                <td><input type="text" id="stok" style={{resize: "none"}} value={statestok} name="stok"  onChange={(e) => setStok(e.target.value)} /></td>
              </tr>
              <tr>
                <td><label> Modal:</label></td>
                <td><input type="text" id="modal" value={statemodal} name="modal" onChange={(e) => setModal(e.target.value)} /></td>
              </tr>
              <tr>
                <td><label> Harga_jual:</label></td>
                <td><input type="text" id="harga_jual" value={stateharga_jual} name="harga_jual" onChange={(e) => setHarga_jual(e.target.value)} /></td>
              </tr>
              <tr>
                <td><label> Gambar:</label></td>
                <td><img src={stategambar} width="100"/></td>
              </tr>
            </tbody>
          </table>
          
          <input type="submit" />
      </form>
      </div>
    </div>
  </div>
  </center>
)
}  
}