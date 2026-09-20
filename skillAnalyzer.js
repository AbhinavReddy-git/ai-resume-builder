const possibleKeywords = [
    "problem solving","communication","teamwork","leadership","time management","project management","analytical thinking","critical thinking"
];

function checkKeywords(resumeText){
  const normalizedText = resumeText.toLowerCase();

  const matchedkeywords= possibleKeywords.filter((keyword) => normalizedText.includes(keyword.toLowerCase()));
  return matchedkeywords;
}
const sections = ["projects","experience","skills","education"];

function checkResumeSections(resumeText){
  const normalizedText = resumeText.toLowerCase();

  const findSections = sections.filter((section) =>normalizedText.includes(section.toLowerCase()));
  const sectionScore = findSections.length===0 ? 0 : Number(((findSections.length/sections.length)*100).toFixed(2));

  return {
    foundSections: findSections,
    sectionScore
  };
}

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

  const matchPercentage = requiredSkills.length === 0 ? 0 : Number(((matchedSkills.length / requiredSkills.length) * 100).toFixed(2));
  return {matchedSkills,missingSkills,matchPercentage};
}

export{
    normalizeSkill,extractSkills,compareSkills,checkResumeSections,checkKeywords
};
