import fs from "fs";
import { PDFParse } from "pdf-parse";

import {
    normalizeSkill,
    extractSkills,
    compareSkills,
    checkResumeSections,
    checkKeywords,
    checkExperience,
    checkEducation,
    checkActionVerbs,
    generateSuggestions
} from "./skillAnalyzer.js";


const possibleSkills = [
    "JavaScript",
    "Python",
    "C++",
    "Java",
    "React",
    "Node.js",
    "Express.js",
    "Mongo DB",
    "PostgreSQL",
    "SQL",
    "AWS",
    "Docker",
    "Kubernetes",
    "Git",
    "HTML",
    "CSS",
    "Django",
    "REST API",
    "TypeScript"
];


async function readResume(resumePath, jobText) {

    // Get required keywords from the user's job description
    const requiredKeywords = checkKeywords(jobText);

    // Get required skills from the user's job description
    const requiredSkills = extractSkills(
        jobText,
        possibleSkills
    );


    const pdfBuffer = fs.readFileSync(resumePath);

    const parser = new PDFParse({
        data: pdfBuffer
    });

    const result = await parser.getText();

    const resumeText = result.text.toLowerCase();


    // -------------------------
    // KEYWORD ANALYSIS
    // -------------------------

    const resumeKeywords = checkKeywords(resumeText);

    const matchedKeywords = requiredKeywords.filter(
        (keyword) => resumeKeywords.includes(keyword)
    );

    const keywordScore =
        requiredKeywords.length === 0
            ? 0
            : Number(
                (
                    (matchedKeywords.length / requiredKeywords.length) *
                    100
                ).toFixed(2)
            );


    // -------------------------
    // SKILL ANALYSIS
    // -------------------------

    const resumeSkills = extractSkills(
        resumeText,
        possibleSkills
    );

    const skillAnalysis = compareSkills(
        requiredSkills,
        resumeSkills
    );


    // -------------------------
    // SECTION ANALYSIS
    // -------------------------

    const sectionAnalysis = checkResumeSections(
        resumeText
    );


    // -------------------------
    // EXPERIENCE ANALYSIS
    // -------------------------

    const experienceAnalysis = checkExperience(
        resumeText
    );


    // -------------------------
    // EDUCATION ANALYSIS
    // -------------------------

    const educationAnalysis = checkEducation(
        resumeText
    );


    // -------------------------
    // ACTION VERB ANALYSIS
    // -------------------------

    const actionVerbAnalysis = checkActionVerbs(
        resumeText
    );


    // -------------------------
    // SUGGESTIONS
    // -------------------------

    const suggestions = generateSuggestions(
        skillAnalysis.missingSkills,
        keywordScore,
        actionVerbAnalysis.actionVerbScore,
        sectionAnalysis.sectionScore,
        experienceAnalysis.experienceScore,
        educationAnalysis.educationScore
    );


    // -------------------------
    // FINAL ATS SCORE
    // -------------------------

    const atsScore = Number(
        (
            (skillAnalysis.matchPercentage * 0.45) +
            (sectionAnalysis.sectionScore * 0.15) +
            (keywordScore * 0.10) +
            (experienceAnalysis.experienceScore * 0.15) +
            (educationAnalysis.educationScore * 0.05) +
            (actionVerbAnalysis.actionVerbScore * 0.10)
        ).toFixed(2)
    );


    // -------------------------
    // CONSOLE OUTPUT
    // -------------------------

    console.log("=== AI RESUME ANALYZER ===");

    console.log(
        "Required Skills : ",
        requiredSkills
    );

    console.log(
        "Resume Skills : ",
        resumeSkills
    );

    console.log(
        "Matched : ",
        skillAnalysis.matchedSkills
    );

    console.log(
        "Missing : ",
        skillAnalysis.missingSkills
    );

    console.log(
        "Match : ",
        skillAnalysis.matchPercentage + "%"
    );


    console.log(
        "Sections : ",
        sectionAnalysis.foundSections
    );

    console.log(
        "Section Score : ",
        sectionAnalysis.sectionScore
    );


    console.log(
        "Matched Keywords : ",
        matchedKeywords
    );

    console.log(
        "Required Keywords : ",
        requiredKeywords
    );

    console.log(
        "Resume Keywords : ",
        resumeKeywords
    );

    console.log(
        "Keyword Score : ",
        keywordScore
    );


    console.log(
        "Experience : ",
        experienceAnalysis.matchedExperience
    );

    console.log(
        "Experience Score : ",
        experienceAnalysis.experienceScore
    );


    console.log(
        "Education : ",
        educationAnalysis.matchedEducation
    );

    console.log(
        "Education Score : ",
        educationAnalysis.educationScore
    );


    console.log(
        "Action Verbs : ",
        actionVerbAnalysis.matchedActionVerbs
    );

    console.log(
        "Action Verb Score : ",
        actionVerbAnalysis.actionVerbScore
    );


    console.log(
        "Final ATS Score : ",
        atsScore
    );


    console.log(
        "Suggestions : ",
        suggestions
    );


    await parser.destroy();


    // -------------------------
    // API RESPONSE
    // -------------------------

    return {

        atsScore,

        weights: {
            skills: 45,
            sections: 15,
            keywords: 10,
            experience: 15,
            education: 5,
            actionVerbs: 10
        },


        skills: {

            matched: skillAnalysis.matchedSkills,

            missing: skillAnalysis.missingSkills,

            score: skillAnalysis.matchPercentage

        },


        sections: {

            found: sectionAnalysis.foundSections,

            score: sectionAnalysis.sectionScore

        },


        keywords: {

            matched: matchedKeywords,

            required: requiredKeywords,

            resume: resumeKeywords,

            score: keywordScore

        },


        experience: {

            matched: experienceAnalysis.matchedExperience,

            score: experienceAnalysis.experienceScore

        },


        education: {

            matched: educationAnalysis.matchedEducation,

            score: educationAnalysis.educationScore

        },


        actionVerbs: {

            matched: actionVerbAnalysis.matchedActionVerbs,

            score: actionVerbAnalysis.actionVerbScore

        },


        suggestions

    };

}


export { readResume };