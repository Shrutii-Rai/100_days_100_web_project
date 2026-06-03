// ==========================
// Resume Studio
// ==========================

document.addEventListener("DOMContentLoaded", () => {

    // FORM INPUTS
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const educationInput = document.getElementById("education");
    const summaryInput = document.getElementById("summary");
    const projectsInput = document.getElementById("projects");
    const skillsInput = document.getElementById("skills");
    const experienceInput = document.getElementById("experience");

    // BUTTONS
    const previewBtn = document.getElementById("previewBtn");
    const downloadBtn = document.getElementById("downloadBtn");
    const modernBtn = document.getElementById("modernBtn");
    const classicBtn = document.getElementById("classicBtn");
    const minimalBtn = document.getElementById("minimalBtn");
    const themeBtn = document.getElementById("themeSwitcher");

    // PREVIEW
    const resumePreview = document.getElementById("resumePreview");

    // ATS SCORE
    const atsScore = document.getElementById("atsScore");

    // CURRENT TEMPLATE
    let currentTemplate = "modern";

    // ==========================
    // HELPER — Create element with textContent (XSS safe)
    // ==========================

    function createEl(tag, text, className) {
        const el = document.createElement(tag);
        el.textContent = text;
        if (className) el.className = className;
        return el;
    }

    function createSection(title, content) {
        const section = document.createElement("div");
        section.className = "resume-section";

        const h3 = document.createElement("h3");
        h3.textContent = title;

        const p = document.createElement("p");
        p.textContent = content;

        section.appendChild(h3);
        section.appendChild(p);
        return section;
    }

    // ==========================
    // ATS SCORE
    // ==========================

    function updateATS() {
        let score = 0;

        if (nameInput.value.trim()) score += 10;
        if (emailInput.value.trim()) score += 10;
        if (phoneInput.value.trim()) score += 10;
        if (educationInput.value.trim()) score += 15;
        if (summaryInput.value.trim().length > 50) score += 15;
        if (projectsInput.value.trim().length > 30) score += 15;
        if (experienceInput.value.trim().length > 30) score += 15;

        const skills = skillsInput.value
            .split(",")
            .filter(skill => skill.trim() !== "");

        if (skills.length >= 5) score += 10;

        score = Math.min(score, 100);
        atsScore.textContent = score + "%";
    }

    // ==========================
    // UPDATE PREVIEW — No innerHTML, fully DOM-based (XSS safe)
    // ==========================

    function updatePreview() {

        // Set template class
        let templateClass = "modern-template";
        if (currentTemplate === "classic") {
            templateClass = "classic-template";
        } else if (currentTemplate === "minimal") {
            templateClass = "minimal-template";
        }
        resumePreview.className = `resume-sheet ${templateClass}`;

        // Clear old content safely
        while (resumePreview.firstChild) {
            resumePreview.removeChild(resumePreview.firstChild);
        }

        // Resume Header
        const header = document.createElement("div");
        header.className = "resume-header";

        const nameEl = document.createElement("h1");
        nameEl.textContent = nameInput.value || "John Doe";

        const contactEl = document.createElement("p");
        contactEl.textContent =
            (emailInput.value || "john@example.com") +
            " | " +
            (phoneInput.value || "+91 9876543210");

        header.appendChild(nameEl);
        header.appendChild(contactEl);
        resumePreview.appendChild(header);

        // Resume Sections
        resumePreview.appendChild(createSection(
            "Summary",
            summaryInput.value || "Professional summary will appear here."
        ));

        resumePreview.appendChild(createSection(
            "Projects",
            projectsInput.value || "Your projects will appear here."
        ));

        resumePreview.appendChild(createSection(
            "Skills",
            skillsInput.value || "Your skills will appear here."
        ));

        resumePreview.appendChild(createSection(
            "Experience",
            experienceInput.value || "Your experience will appear here."
        ));

        resumePreview.appendChild(createSection(
            "Education",
            educationInput.value || "Your education will appear here."
        ));

        updateATS();
    }

    // ==========================
    // INPUT LISTENERS
    // ==========================

    const inputs = [
        nameInput,
        emailInput,
        phoneInput,
        educationInput,
        summaryInput,
        projectsInput,
        skillsInput,
        experienceInput
    ];

    inputs.forEach(input => {
        input.addEventListener("input", updatePreview);
    });

    // ==========================
    // TEMPLATE BUTTONS
    // ==========================

    modernBtn.addEventListener("click", () => {
        currentTemplate = "modern";
        modernBtn.classList.add("active");
        classicBtn.classList.remove("active");
        minimalBtn.classList.remove("active");
        updatePreview();
    });

    classicBtn.addEventListener("click", () => {
        currentTemplate = "classic";
        classicBtn.classList.add("active");
        modernBtn.classList.remove("active");
        minimalBtn.classList.remove("active");
        updatePreview();
    });

    minimalBtn.addEventListener("click", () => {
        currentTemplate = "minimal";
        minimalBtn.classList.add("active");
        modernBtn.classList.remove("active");
        classicBtn.classList.remove("active");
        updatePreview();
    });

    // ==========================
    // PREVIEW BUTTON
    // ==========================

    previewBtn.addEventListener("click", () => {
        updatePreview();
        resumePreview.scrollIntoView({ behavior: "smooth" });
    });

    // ==========================
    // THEME TOGGLE
    // ==========================

    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
        if (document.body.classList.contains("light-mode")) {
            themeBtn.textContent = "☀️ Light Mode";
        } else {
            themeBtn.textContent = "🌙 Dark Mode";
        }
    });

    // ==========================
    // PDF DOWNLOAD
    // ==========================

    downloadBtn.addEventListener("click", async () => {
        try {
            const canvas = await html2canvas(resumePreview, { scale: 2 });
            const imgData = canvas.toDataURL("image/png");
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF("p", "mm", "a4");
            const pageWidth = pdf.internal.pageSize.getWidth();
            const imgWidth = pageWidth;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
            const filename = (nameInput.value || "resume")
                .toLowerCase()
                .replace(/\s+/g, "_");
            pdf.save(`${filename}.pdf`);
        } catch (error) {
            console.error(error);
            alert("Failed to generate PDF.");
        }
    });

    // Initial render
    updatePreview();

});