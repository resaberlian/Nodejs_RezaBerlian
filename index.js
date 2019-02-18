// Create Server

const express = require('express'); // import module express
const app = express(); // eksekusi module express

//eksekusi express dengan memanggil variabel app
app.get('/test', (request,respone)=>{ // simbol "/" yang berarti "root" atau halaman utama, function req(request) dan re(respone)
    respone.send("ini GET"); // mengirimkan respone dari http dan dikembalikan
})

app.post('/test' ,(request,respone)=>{
    respone.send("ini POST");
})


app.listen('8080') ; //definisi halaman port