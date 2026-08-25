import fs from "fs";
import {PDFParse} from "pdf-parse";

const pdfBuffer=fs.readFileSync("./resumes/resume.pdf");

function normalizeSkill(skill){
  return skill.toLowerCase().replace(/[ .]/g, "");
}

function extractSkills(text,possibleSkills){
  const normalizeText= normalizeSkill(text);
  return possibleSkills.filter(skill => normalizeText.includes(normalizeSkill(skill)));
}

function compareSkills(requiredSkills,resumeSkills){
  const matchedSkills = requiredSkills.filter(skill => resumeSkills.includes(skill));
  const missingSkills = requiredSkills.filter(skill => !resumeSkills.includes(skill));

  const matchPercentage = requiredSkills.length===0 ? 0 : (matchedSkills.length/requiredSkills.length)*100;
  return {matchedSkills,missingSkills,matchPercentage};
}

const jobDescription =  fs.readFileSync("./jobs/job.txt","utf-8");

const jobText=jobDescription.toLowerCase();

const possibleSkills = ["JavaScript", "Python", "C++", "Java", "React", "Node.js", "Express.js", "Mongo DB", "PostgreSQL", "SQL", "AWS", "Docker", "Kubernetes", "Git", "HTML", "CSS", "Django", "REST API", "TypeScript"];

const requiredSkills = extractSkills(jobText,possibleSkills);


async function readResume() {
  const parser = new PDFParse({data:pdfBuffer});
  const result = await parser.getText();

  const resumeText = result.text.toLowerCase();

  const resumeSkills = extractSkills(resumeText,possibleSkills);

  const skillAnalysis = compareSkills(requiredSkills,resumeSkills);

  console.log("===AI RESUME ANALYZER");
  console.log("Matched : ",skillAnalysis.matchedSkills);
  console.log("Missing : ",skillAnalysis.missingSkills);
  console.log("Match : ",skillAnalysis.matchPercentage.toFixed(2)+"%");

  await parser.destroy();
}

readResume()
