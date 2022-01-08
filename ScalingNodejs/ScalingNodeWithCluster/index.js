const cluster = require('cluster');
const {cpus} = require('os');



function wasteTime(duration){
    const start = Date.now();
    while (Date.now() - start < duration) {}
}

if(cluster.isMaster){
    const numberCPUs = cpus().length;
    for(let i = 0 ; i < numberCPUs ; i++){
        cluster.fork();
    }
}else{
    const {pid} = process;
    const express = require('express');
    const app = express();
    console.log(`Handling request from ${pid}`)
    
    app.get('/', (req, res) => {
        wasteTime(5000);
        res.send('Slow request');
        
    });

    app.get('/fast', (req, res) => {
        res.send('Fast request');
    })


    app.listen(3000);

}