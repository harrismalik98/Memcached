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


app.get("/statuses", (req, res)=> {

    try{
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

                    // console.log(responseData);
                    res.status(200).json(responseData);
                    
                }
                });
            }
            });
    }
    catch(error)
    {
        console.log(error);
    }
});



app.listen(5000, ()=>{
    console.log("Servert started at port 5000");
});






// memcached.set("name", "Muhammad Harris" , 3600 ,(error) => {
//     if(error)
//     {
//         console.log("Error - Saving");
//     }
//     else
//     {
//         console.log("Saved Successfully");
//     }
// });

// memcached.get("name", (error, data) => {
//     if(error || !data)
//     {
//         console.log("Error - Reading");
//     }
//     else
//     {
//         console.log(`Name: ${data}`);
//     }
// });
