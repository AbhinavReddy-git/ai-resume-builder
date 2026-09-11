import express from "express";

const app = express();
const port = 3000;

app.get("/api/test",(req,res)=>{
    res.json({
        message:"api ats is working "
    });
});

app.listen(port,()=>{
    console.log(`server running on http://localhost:${port}`);
})