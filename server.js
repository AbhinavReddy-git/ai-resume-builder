import express from "express";

import { readResume } from "./readResume.js";

const app = express();
const port = 3000;

app.get("/api/test",(req,res)=>{
    res.json({
        message:"api ats is working "
    });
});

app.get("/api/analyze", async (req, res) => {
    const analysis =  await readResume("./resumes/resume.pdf");
    res.json(analysis);
});

app.listen(port,()=>{
    console.log(`server running on http://localhost:${port}`);
})