const express = require("express");
const app = express();

const Memcached = require("memcached");
const memcached = new Memcached("localhost:11211");

const cors = require("cors");
app.use(cors());

// Populate Database OR Seed
memcached.set("MuhammadHarris", 1, 3600, (error)=> {
    if(error)
    {
        console.log("Error - Seeding");
    }
    else
    {
        console.log("Muhammad Harris Status Saved");
    }
});

memcached.set("MuhammadAli", 0, 3600, (error)=> {
    if(error)
    {
        console.log("Error - Seeding");
    }
    else
    {
        console.log("Muhammad Ali Status Saved");
    }
});

// memcached.flush(()=>{
//     console.log("successfully flushed");
// })



app.get("/statuses", (req, res)=> {

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // SET UP AN INTERVAL TO SEND DATA EVERY 3 SECONDS
    setInterval(() => {

    memcached.get("MuhammadHarris", (err, status1) => {
        if (err) {
            console.log("Error retrieving Muhammad Harris status:", err);
        } else {
            memcached.get("MuhammadAli", (err, status2) => {
            if (err) {
                console.log("Error retrieving Muhammad Ali status:", err);
            } else {

                //  console.log(status1, status2);
                const responseData = [
                    {
                        name: "Muhammad Harris",
                        active: status1,
                    },
                    {
                        name: "Muhammad Ali",
                       active: status2,
                    }    
                ];

                console.log(responseData);

                const jsonResponse = JSON.stringify(responseData);
                // console.log(jsonResponse);
                res.write(`data: ${jsonResponse}\n\n`);
            }
            });
        }
        });
    
  }, 3000);

});



app.listen(5000, ()=>{
    console.log("Servert started at port 5000");
});



// YOUTUBE TUTORIAL: https://www.youtube.com/watch?v=HB99EUkDC2A


// FOLLOW BELOW INSTRUCTIONS TO SEE CHANGES IN FRONT-END

// Open PUTTY: first creata a session: "localhost:11211" & connection type: telnet
// set MuhammadHarris 0(flag) 0(time => remain when server is running) 1(No. of characters key contains)
// 0
// set MuhammadAli 0(flag) 0(time) 1(No. of characters key contains)
// 1
// flush_all (To flush all data from memory)
