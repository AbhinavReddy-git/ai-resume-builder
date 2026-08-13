const resumeText=`Abhinav is a software develooper with experience in javascript , react , node.js and mongo db`;

const requiredSkills=["JavaScript","Python","AWS","React","Node.js","Mongo DB"];

const text=resumeText.toLowerCase();

const matchedSkills=requiredSkills.filter(skills => text.includes(skills.toLowerCase()));

const missingSkills=requiredSkills.filter(skills => !text.includes(skills.toLowerCase()));

const matchPercentage=((matchedSkills.length/requiredSkills.length)*100).toFixed(2);

console.log("===AI RESUME ANALYZER");

console.log("Matched : ",matchedSkills);
console.log("Missing : ",missingSkills);
console.log("Match : ",matchPercentage+"%");