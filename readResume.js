import fs from "fs";
import {PDFParse} from "pdf-parse";

import {
    normalizeSkill,
    extractSkills,
    compareSkills,
    checkResumeSections,
    checkKeywords
} from "./skillAnalyzer.js";

const jobDescription =  fs.readFileSync("./jobs/job.txt","utf-8");

const jobText=jobDescription.toLowerCase();

const requiredKeywords = checkKeywords(jobText);

console.log("Required Keywords : ", requiredKeywords);

const possibleSkills = ["JavaScript", "Python", "C++", "Java", "React", "Node.js", "Express.js", "Mongo DB", "PostgreSQL", "SQL", "AWS", "Docker", "Kubernetes", "Git", "HTML", "CSS", "Django", "REST API", "TypeScript"];

const requiredSkills = extractSkills(jobText,possibleSkills);


async function readResume(resumePath) {
  const pdfBuffer=fs.readFileSync(resumePath);

  const parser = new PDFParse({data:pdfBuffer});
  const result = await parser.getText();

  const resumeText = result.text.toLowerCase();

  const resumeKeywords = checkKeywords(resumeText);
  
  const matchedKeywords = requiredKeywords.filter(
      (keyword) => resumeKeywords.includes(keyword)
  );

  const resumeSkills = extractSkills(resumeText,possibleSkills);

  const sectionAnalysis = checkResumeSections(resumeText);

  const skillAnalysis = compareSkills(requiredSkills,resumeSkills);

  const keywordScore = requiredKeywords.length === 0? 0: Number(((matchedKeywords.length / requiredKeywords.length) * 100).toFixed(2));
  
  const atsScore = Number(((skillAnalysis.matchPercentage * 0.7) + (sectionAnalysis.sectionScore * 0.2)+(keywordScore * 0.1)).toFixed(2));


  console.log("===AI RESUME ANALYZER");

  console.log("Matched : ", skillAnalysis.matchedSkills);
  console.log("Missing : ", skillAnalysis.missingSkills);
  console.log("Match : ", skillAnalysis.matchPercentage + "%");

  console.log("Sections : ", sectionAnalysis.foundSections);
  console.log("Section Score : ", sectionAnalysis.sectionScore);

  console.log("Matched Keywords : ", matchedKeywords);

  console.log("Required Keywords : ", requiredKeywords);
  console.log("Resume Keywords : ", resumeKeywords);
  console.log("Final ATS Score : ", atsScore);

  console.log("Keyword Score : ", keywordScore);
  
  await parser.destroy();

  return {
    atsScore,
    matchedSkills: skillAnalysis.matchedSkills,
    missingSkills: skillAnalysis.missingSkills,
    matchPercentage: skillAnalysis.matchPercentage
};

}

export { readResume };