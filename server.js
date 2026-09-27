import express from "express";
import multer from "multer";
import { readResume } from "./readResume.js";

const app = express();
const port = 3000;

app.use(express.static("public"));

const upload = multer({ dest: "uploads/" });

app.get("/", (req, res) => {
    res.sendFile(index);
});

app.get("/api/test",(req,res)=>{
    res.json({
        message:"api ats is working "
    });
});

app.get("/api/analyze", async (req, res) => {
    const analysis =  await readResume("./resumes/resume.pdf");
    res.json(analysis);
});


app.post("/api/analyze", upload.single("resume"), async (req, res) => {

    if(!req.file) {
        return res.status(400).json({
            message: "Please upload a resume"
        });
    }

    const jobText = req.body.jobDescription;

    if(!jobText || !jobText.trim()) {
        return res.status(400).json({
            message: "Please enter a job description"
        });
    }

    try{

        const analysis = await readResume(
            req.file.path,
            jobText
        );

        res.json(analysis);

    }catch(error){

        console.log(error);

        return res.status(500).json({
            message:"error reading resume "
        }); 
    }
});

app.listen(port,()=>{
    console.log(`server running on http://localhost:${port}`);
})