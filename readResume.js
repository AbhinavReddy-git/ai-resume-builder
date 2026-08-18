import fs from "fs";
import {PDFParse} from "pdf-parse";

const pdfBuffer=fs.readFileSync("./resumes/resume.pdf");


const jobDescription =  fs.readFileSync("./jobs/job.txt","utf-8");

const jobText=jobDescription.toLowerCase();

const possibleSkills = ["JavaScript","Python","AWS","React","Node.js","Mongo DB"];

const requiredSkills = possibleSkills.filter(skills => jobText.includes(skills.toLowerCase()))


async function readResume() {
  const parser = new PDFParse({data:pdfBuffer});
  const result = await parser.getText();

  const resumeText = result.text.toLowerCase();

  const matchedSkills = requiredSkills.filter(skills=> resumeText.includes(skills.toLowerCase()));
  const missingSkills = requiredSkills.filter(skills => !resumeText.includes(skills.toLowerCase()));
  const matchPercentage = (matchedSkills.length/requiredSkills.length)*100;

  console.log("===AI RESUME ANALYZER");
  console.log("Matched : ",matchedSkills);
  console.log("Missing : ",missingSkills);
  console.log("Match : ",matchPercentage+"%");

  await parser.destroy();
}

readResume()
