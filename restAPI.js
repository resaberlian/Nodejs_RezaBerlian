//import modules 
const express = require('express');
const app = express();

//import driver mongodb
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID; //import objectID
const DBurl = "mongodb://127.0.0.1:27017"; //url DB -> port mongo : 27017
const DBname = "Sekolah" ;
const bodyParser = require('body-parser'); //import body-parser
app.use(bodyParser.urlencoded({extended: false})) //harus berada di atas semua endpoint

//object koneksi database
let dbo = null ;
//koneksi database
MongoClient.connect(DBurl,(error,db)=> {
    if(error) throw error ; 
    dbo = db.db(DBname);
});

//endpoint get : mengambil data dari database yang telah dibuat sebelumnya
app.get('/siswa', (request,response)=>{
    dbo.collection("siswa").find().toArray((err, res)=>{ //mengambil data dari collection dalam bentuk array
        if(err) throw err;
        response.json(res); //menampilkan data
    })
})

//endpoint get dengan menggunakan parameter
// app.get('/siswa/:nama', (request, response)=>{ // :nama merupakan parameter
//     let namaSiswa = request.params.name; // deklarasi variabel namaSiswa
//     response.end("menampilkan nama siswa " + namaSiswa);
// });

//endpoint post, dengan menggunkan body-parser untuk mengirimkan data
// app.post('/siswa', (request, response)=>{
//     let namaSiswa = request.body.name;
//     let alamat = request.body.address;
//     response.end('menampilkan siswa baru ' + namaSiswa +  ', yang beralamat di ' + alamat);

// });

//endpoint delete, data yang diakses secara spesifik dengan menggunakan parameter
// app.delete('/siswa/:id',(request,response)=>{
//     let id = request.params.id;
//     let namaSiswa = request.body.name;
//     response.end('id'+ id + 'telah dihapus, dengan nama: ' +namaSiswa);
// });

//endpoint update 
// app.put('/siswa/:id',(request, response)=>{
//     let id = request.params.id;
//     let namaSiswa = request.body.name;
//     let alamat = request.body.address;
//     response.end('siswa dengan id: ' + id + 'telah update')
// });

//endpoint insert data ke database
app.post('/siswa', (request, response)=>{
    let namaSiswa = request.body.name;
    let alamatSiswa = request.body.address;
    dbo.collection("siswa").insert({
        name : namaSiswa,
        address : alamatSiswa
    }, (err,res)=>{
        if(!err){
            response.json(res);
            response.end("data berhasil masuk");
        }else{
            throw err; // apabila error akan dilempar ke nodejs
        }
    })
})

//endpoint delete data dari database
app.delete('/siswa/:id', (request, response)=>{
    let id = request.params.id;
    let id_object = new ObjectID(id);
    dbo.collection("siswa").deleteOne({ //perintah hapus mongodb
        _id : id_object // mengambil id data untuk di hapus 
    }, (err,res)=>{
        if(err) throw err ; 
        response.end("data berhasil dihapus");
    })
})

//endpoint update data dari database 
app.put('/RPL/:id',(request, response)=>{
    let id = request.params.id;
    let id_object = new ObjectID(id);
    let namaSiswa = request.body.name;
    let kelasSiswa = request.body.kelas ; 
    let jurusanSiswa = request.body.jurusan ;
    dbo.collection("RPL").updateOne({
        _id : id_object 
    }, {$set:{
        name : namaSiswa,
        kelas : kelasSiswa,
        jurusan : jurusanSiswa 
    }},
    (err,res)=>{
        if(err) throw err ; 
        response.end("data berhasil diupdate");
    })
})



//method get
app.get('/test',(req, res)=>{
    res.end("ini get XIRPL 6")
});

//method post
app.post('/test',(req, res)=>{
    res.end("ini post XIRPL 6")
});

//method get
app.get('/rpl',(req, res)=>{
    res.end("ini get XIRPL 6")
});

//method post
app.post('/rpl',(req, res)=>{
    res.end("ini post XIRPL 6")
});

//inisialisasi port
app.listen('1234', (e)=>{
    console.log(e); //untuk menampilkan pesan error
});