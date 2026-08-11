const requiredSkills=["JavaScript","Python","AWS","React"];
const resumeSkills=["JavaScript","Node.js","React"];

const matchedSkills=requiredSkills.filter(skills => resumeSkills.includes(skills));

const missingSkills=requiredSkills.filter(skills => !resumeSkills.includes(skills));

const matchPercentage=(matchedSkills.length/requiredSkills.length)*100;

console.log("Matched : ",matchedSkills);
console.log("Missing : ",missingSkills);
console.log("Match : ",matchPercentage+"%");