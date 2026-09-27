const resumeInput = document.getElementById("resumeInput");
const jobDescription = document.getElementById("jobDescription");
const analyzeBtn = document.getElementById("analyzeBtn");
const status = document.getElementById("status");
const results = document.getElementById("results");


function displayList(elementId, items) {

    const list = document.getElementById(elementId);

    list.innerHTML = "";

    items.forEach((item) => {

        const li = document.createElement("li");

        li.textContent = item;

        list.appendChild(li);

    });
}


analyzeBtn.addEventListener("click", async () => {

    const file = resumeInput.files[0];
    const jobText = jobDescription.value;

    if (!file) {

        status.textContent = "Please select a resume";

        return;
    }
    
    if (!jobText.trim()) {
        status.textContent = "Please enter a job description";
        return;
    }

    const formData = new FormData();

    formData.append("resume", file);
    formData.append("jobDescription", jobText);

    status.textContent = "Analyzing resume...";

    analyzeBtn.disabled = true;


    try {

        const response = await fetch("/api/analyze", {

            method: "POST",

            body: formData

        });


        const data = await response.json();


        if (!response.ok) {

            throw new Error(data.message || "Something went wrong");

        }


        document.getElementById("atsScore").textContent =
            data.atsScore;


        document.getElementById("skillScore").textContent =
            data.skills.score;


        document.getElementById("sectionScore").textContent =
            data.sections.score;


        document.getElementById("keywordScore").textContent =
            data.keywords.score;


        document.getElementById("experienceScore").textContent =
            data.experience.score;


        document.getElementById("educationScore").textContent =
            data.education.score;


        document.getElementById("actionVerbScore").textContent =
            data.actionVerbs.score;


        displayList(
            "matchedSkills",
            data.skills.matched
        );


        displayList(
            "missingSkills",
            data.skills.missing
        );


        displayList(
            "suggestions",
            data.suggestions
        );


        results.classList.remove("hidden");


        status.textContent = "Analysis complete!";

    } catch (error) {

        status.textContent = error.message;

    } finally {

        analyzeBtn.disabled = false;

    }

});