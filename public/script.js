const resumeInput =
    document.getElementById("resumeInput");

const jobDescription =
    document.getElementById("jobDescription");

const analyzeBtn =
    document.getElementById("analyzeBtn");

const analyzeAgainBtn =
    document.getElementById("analyzeAgainBtn");

const uploadArea =
    document.getElementById("uploadArea");

const fileName =
    document.getElementById("fileName");

const status =
    document.getElementById("status");

const results =
    document.getElementById("results");

const charCount =
    document.getElementById("charCount");

const buttonText =
    document.getElementById("buttonText");


// ----------------------------------
// JOB DESCRIPTION CHARACTER COUNT
// ----------------------------------

jobDescription.addEventListener("input", () => {

    const length = jobDescription.value.length;

    charCount.textContent =
        `${length} characters`;

});


// ----------------------------------
// FILE SELECTION
// ----------------------------------

resumeInput.addEventListener("change", () => {

    const file = resumeInput.files[0];

    if (!file) {
        return;
    }

    fileName.textContent =
        `✓ ${file.name}`;

    fileName.classList.remove("hidden");

});


// ----------------------------------
// DRAG AND DROP
// ----------------------------------

uploadArea.addEventListener("dragover", (event) => {

    event.preventDefault();

    uploadArea.classList.add("dragover");

});


uploadArea.addEventListener("dragleave", () => {

    uploadArea.classList.remove("dragover");

});


uploadArea.addEventListener("drop", (event) => {

    event.preventDefault();

    uploadArea.classList.remove("dragover");

    const files = event.dataTransfer.files;

    if (files.length === 0) {
        return;
    }

    const file = files[0];


    if (file.type !== "application/pdf") {

        showError("Please upload a PDF file.");

        return;
    }


    resumeInput.files = files;

    fileName.textContent =
        `✓ ${file.name}`;

    fileName.classList.remove("hidden");

});


// ----------------------------------
// DISPLAY BADGES
// ----------------------------------

function displayBadges(
    elementId,
    items,
    className
) {

    const container =
        document.getElementById(elementId);

    container.innerHTML = "";


    if (!items || items.length === 0) {

        const empty =
            document.createElement("span");

        empty.className = "skill-badge keyword-badge";

        empty.textContent = "None found";

        container.appendChild(empty);

        return;
    }


    items.forEach((item) => {

        const badge =
            document.createElement("span");

        badge.className =
            `skill-badge ${className}`;

        badge.textContent = item;

        container.appendChild(badge);

    });

}


// ----------------------------------
// DISPLAY SUGGESTIONS
// ----------------------------------

function displaySuggestions(items) {

    const container =
        document.getElementById("suggestions");

    container.innerHTML = "";


    if (!items || items.length === 0) {

        const message =
            document.createElement("div");

        message.className = "suggestion";

        message.textContent =
            "Your resume looks good. No major suggestions.";

        container.appendChild(message);

        return;
    }


    items.forEach((suggestion) => {

        const item =
            document.createElement("div");

        item.className = "suggestion";


        const icon =
            document.createElement("span");

        icon.className = "suggestion-icon";

        icon.textContent = "💡";


        const text =
            document.createElement("span");

        text.textContent = suggestion;


        item.appendChild(icon);

        item.appendChild(text);

        container.appendChild(item);

    });

}


// ----------------------------------
// FORMAT SCORE
// ----------------------------------

function formatScore(score) {

    if (score === undefined || score === null) {
        return "0%";
    }

    return `${score}%`;

}


// ----------------------------------
// SHOW ERROR
// ----------------------------------

function showError(message) {

    status.textContent = message;

    status.classList.remove("success");

    status.classList.add("error");

}


// ----------------------------------
// SHOW SUCCESS
// ----------------------------------

function showSuccess(message) {

    status.textContent = message;

    status.classList.remove("error");

    status.classList.add("success");

}


// ----------------------------------
// ANALYZE RESUME
// ----------------------------------

analyzeBtn.addEventListener(
    "click",
    async () => {

        const file =
            resumeInput.files[0];

        const jobText =
            jobDescription.value;


        // Check resume

        if (!file) {

            showError(
                "Please upload your resume."
            );

            return;
        }


        // Check PDF

        if (
            file.type !== "application/pdf" &&
            !file.name.toLowerCase().endsWith(".pdf")
        ) {

            showError(
                "Please upload a PDF resume."
            );

            return;
        }


        // Check job description

        if (!jobText.trim()) {

            showError(
                "Please enter a job description."
            );

            return;
        }


        // Create FormData

        const formData =
            new FormData();


        formData.append(
            "resume",
            file
        );


        formData.append(
            "jobDescription",
            jobText
        );


        // Loading state

        analyzeBtn.disabled = true;

        buttonText.textContent =
            "Analyzing Resume...";

        status.classList.remove(
            "error",
            "success"
        );

        status.textContent =
            "Please wait while we analyze your resume.";


        try {

            const response =
                await fetch(
                    "/api/analyze",
                    {
                        method: "POST",

                        body: formData
                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Something went wrong."
                );

            }


            // --------------------------
            // ATS SCORE
            // --------------------------

            document.getElementById(
                "atsScore"
            ).textContent =
                data.atsScore;


            // --------------------------
            // SCORE CARDS
            // --------------------------

            document.getElementById(
                "skillScore"
            ).textContent =
                formatScore(
                    data.skills.score
                );


            document.getElementById(
                "sectionScore"
            ).textContent =
                formatScore(
                    data.sections.score
                );


            document.getElementById(
                "keywordScore"
            ).textContent =
                formatScore(
                    data.keywords.score
                );


            document.getElementById(
                "experienceScore"
            ).textContent =
                formatScore(
                    data.experience.score
                );


            document.getElementById(
                "educationScore"
            ).textContent =
                formatScore(
                    data.education.score
                );


            document.getElementById(
                "actionVerbScore"
            ).textContent =
                formatScore(
                    data.actionVerbs.score
                );


            // --------------------------
            // SKILLS
            // --------------------------

            displayBadges(
                "matchedSkills",
                data.skills.matched,
                "matched-badge"
            );


            displayBadges(
                "missingSkills",
                data.skills.missing,
                "missing-badge"
            );


            // --------------------------
            // KEYWORDS
            // --------------------------

            displayBadges(
                "matchedKeywords",
                data.keywords.matched,
                "matched-badge"
            );


            displayBadges(
                "requiredKeywords",
                data.keywords.required,
                "keyword-badge"
            );


            // --------------------------
            // SUGGESTIONS
            // --------------------------

            displaySuggestions(
                data.suggestions
            );


            // --------------------------
            // SHOW RESULTS
            // --------------------------

            results.classList.remove(
                "hidden"
            );


            showSuccess(
                "Analysis complete!"
            );


            // Scroll to results

            results.scrollIntoView({
                behavior: "smooth"
            });

        }


        catch (error) {

            console.error(error);

            showError(
                error.message ||
                "Unable to analyze resume."
            );

        }


        finally {

            analyzeBtn.disabled = false;

            buttonText.textContent =
                "Analyze My Resume";

        }

    }
);


// ----------------------------------
// ANALYZE ANOTHER RESUME
// ----------------------------------

analyzeAgainBtn.addEventListener(
    "click",
    () => {

        results.classList.add(
            "hidden"
        );


        resumeInput.value = "";

        jobDescription.value = "";

        fileName.textContent = "";

        fileName.classList.add(
            "hidden"
        );


        charCount.textContent =
            "0 characters";


        status.textContent = "";

        status.classList.remove(
            "error",
            "success"
        );


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);