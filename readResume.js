import fs from "fs";
import { parse } from "path";
import {PDFParse} from "pdf-parse";
const pdfBuffer=fs.readFileSync("./resumes/resume.pdf");

const requiredSkills=["JavaScript","Python","AWS","React","Node.js","Mongo DB"];

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
