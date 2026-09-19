import fs from "fs";
import {PDFParse} from "pdf-parse";

import {normalizeSkill,extractSkills,compareSkills,checkResumeSections} from "./skillAnalyzer.js";

const jobDescription =  fs.readFileSync("./jobs/job.txt","utf-8");

const jobText=jobDescription.toLowerCase();

const possibleSkills = ["JavaScript", "Python", "C++", "Java", "React", "Node.js", "Express.js", "Mongo DB", "PostgreSQL", "SQL", "AWS", "Docker", "Kubernetes", "Git", "HTML", "CSS", "Django", "REST API", "TypeScript"];

const requiredSkills = extractSkills(jobText,possibleSkills);


async function readResume(resumePath) {
  const pdfBuffer=fs.readFileSync(resumePath);

  const parser = new PDFParse({data:pdfBuffer});
  const result = await parser.getText();

  const resumeText = result.text.toLowerCase();

  const resumeSkills = extractSkills(resumeText,possibleSkills);

  const sectionAnalysis = checkResumeSections(resumeText);

  const skillAnalysis = compareSkills(requiredSkills,resumeSkills);

  const atsScore = Number(((skillAnalysis.matchPercentage * 0.8) + (sectionAnalysis.sectionScore * 0.2)).toFixed(2));

  console.log("===AI RESUME ANALYZER");

  console.log("Matched : ", skillAnalysis.matchedSkills);
  console.log("Missing : ", skillAnalysis.missingSkills);
  console.log("Match : ", skillAnalysis.matchPercentage + "%");

  console.log("Sections : ", sectionAnalysis.foundSections);
  console.log("Section Score : ", sectionAnalysis.sectionScore);
  console.log("Final ATS Score : ", atsScore);
  
  await parser.destroy();

  return {
    atsScore,
    matchedSkills: skillAnalysis.matchedSkills,
    missingSkills: skillAnalysis.missingSkills,
    matchPercentage: skillAnalysis.matchPercentage
};

}

export { readResume };