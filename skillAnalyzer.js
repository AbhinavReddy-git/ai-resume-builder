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
    normalizeSkill,extractSkills,compareSkills
};
