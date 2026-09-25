const possibleKeywords = [
    "problem solving","communication","teamwork","leadership","time management","project management","analytical thinking","critical thinking"
];
const keywordVariations = {
    "problem solving": [
        "problem solving",
        "solved problems",
        "solving problems"
    ],

    "communication": [
        "communication",
        "communicated",
        "communicating"
    ],

    "teamwork": [
        "teamwork",
        "team work",
        "worked with a team"
    ],

    "leadership": [
        "leadership",
        "led",
        "leading"
    ],

    "time management": [
        "time management",
        "managed time",
        "managing time"
    ],

    "project management": [
        "project management",
        "managed projects",
        "managing projects"
    ],

    "analytical thinking": [
        "analytical thinking",
        "analyzed",
        "analysis"
    ],

    "critical thinking": [
        "critical thinking",
        "critical thinker",
        "critically analyzed"
    ]
};
function checkKeywords(resumeText){

    const normalizedText = resumeText.toLowerCase();

    const matchedkeywords = possibleKeywords.filter((keyword) => {

        const variations = keywordVariations[keyword];

        return variations.some(
            (variation) => normalizedText.includes(variation.toLowerCase())
        );

    });

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

const experienceKeywords = [
    "internship",
    "intern",
    "developer",
    "engineer",
    "worked",
    "experience"
];
function checkExperience(resumeText){
    
    const normalizedText = resumeText.toLowerCase();
    
    const matchedExperience = experienceKeywords.filter(
        (keyword) => normalizedText.includes(keyword)
    );
    
    const experienceScore = experienceKeywords.length === 0
    ? 0
    : Number(
        ((matchedExperience.length / experienceKeywords.length) * 100).toFixed(2)
    );
    
    return {
        matchedExperience,
        experienceScore
    };
}

const educationKeywords = {
    "bachelor of technology": [
        "b.tech",
        "btech",
        "bachelor of technology"
    ],

    "bachelor of engineering": [
        "b.e",
        "b.e.",
        "be",
        "bachelor of engineering"
    ],

    "master of technology": [
        "m.tech",
        "mtech",
        "master of technology"
    ],

    "master of science": [
        "m.s",
        "m.s.",
        "ms",
        "master of science"
    ],

    "bachelor's": [
        "bachelor's"
    ],

    "master's": [
        "master's"
    ],

    "degree": [
        "degree"
    ],

    "university": [
        "university"
    ],

    "college": [
        "college"
    ]
};
function checkEducation(resumeText){
    const normalizedText = resumeText.toLowerCase();
    const matchedEducation = Object.keys(educationKeywords).filter(
        (education) => {
            const variations = educationKeywords[education];
            return variations.some(
                (variation) => normalizedText.includes(variation)
            );
        }
    );
    const educationScore = Object.keys(educationKeywords).length === 0? 0: Number(((matchedEducation.length / Object.keys(educationKeywords).length) * 100).toFixed(2));
    return {
        matchedEducation,
        educationScore
    };
}


const actionVerbs = [
    "developed",
    "built",
    "implemented",
    "designed",
    "created",
    "optimized",
    "analyzed",
    "managed",
    "led",
    "improved"
];

function checkActionVerbs(resumeText){

    const normalizedText = resumeText.toLowerCase();

    const matchedActionVerbs = actionVerbs.filter(
        (verb) => normalizedText.includes(verb)
    );

    const actionVerbScore = actionVerbs.length === 0
        ? 0
        : Number(
            ((matchedActionVerbs.length / actionVerbs.length) * 100).toFixed(2)
          );

    return {
        matchedActionVerbs,
        actionVerbScore
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

function generateSuggestions(missingSkills,keywordScore,actionVerbScore,sectionScore,experienceScore,educationScore) {

    const suggestions = [];

    if (missingSkills.length > 0) {
        suggestions.push(
            `Consider adding relevant missing skills: ${missingSkills.join(", ")}`
        );
    }

    if (keywordScore < 50) {
        suggestions.push(
            "Consider including more relevant keywords from the job description."
        );
    }

    if (actionVerbScore < 50) {
        suggestions.push(
            "Use more strong action verbs such as developed, implemented, designed, or optimized."
        );
    }

    if (sectionScore < 75) {
        suggestions.push(
            "Improve your resume sections by adding missing sections such as projects, experience, skills, or education."
        );
    }

    if (experienceScore < 50) {
        suggestions.push(
            "Strengthen your experience section with more relevant experience, internships, or project work."
        );
    }

    if (educationScore < 50) {
        suggestions.push(
            "Make your education details clearer by including your degree, college, and university."
        );
    }
    return suggestions;
}

export{
    normalizeSkill,extractSkills,compareSkills,checkResumeSections,checkKeywords,checkExperience,checkEducation,checkActionVerbs,generateSuggestions
};
