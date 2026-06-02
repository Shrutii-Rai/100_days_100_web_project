// ==========================
// Resume Studio
// ==========================
document.addEventListener("DOMContentLoaded", () => {

  // FORM INPUTS
  const nameInput       = document.getElementById("name");
  const emailInput      = document.getElementById("email");
  const phoneInput      = document.getElementById("phone");
  const summaryInput    = document.getElementById("summary");
  const projectsInput   = document.getElementById("projects");
  const skillsInput     = document.getElementById("skills");
  const experienceInput = document.getElementById("experience");
  const educationInput  = document.getElementById("education");

  // PREVIEW CONTAINER
  const resumePreview = document.getElementById("resume-preview");

  // TEMPLATE BUTTONS
  const templateButtons = document.querySelectorAll(".template-btn");

  // DOWNLOAD BUTTON
  const downloadBtn = document.getElementById("download-btn");

  // Active template state
  let activeTemplate = "modern";

  // ==========================
  // Helper: safe setText
  // Sets textContent (never innerHTML) for a node
  // ==========================
  function setText(el, value, fallback) {
    el.textContent = (value && value.trim()) ? value.trim() : fallback;
  }

  // ==========================
  // Helper: createSection
  // Builds a section div with a heading and paragraph — no innerHTML
  // ==========================
  function createSection(headingText, bodyText, fallbackText) {
    const section = document.createElement("div");
    section.className = "resume-section";

    const h3 = document.createElement("h3");
    h3.textContent = headingText;

    const p = document.createElement("p");
    p.textContent = (bodyText && bodyText.trim()) ? bodyText.trim() : fallbackText;

    section.appendChild(h3);
    section.appendChild(p);
    return section;
  }

  // ==========================
  // updatePreview
  // Rebuilds the preview entirely using DOM methods — zero innerHTML with user data
  // ==========================
  function updatePreview() {
    // Clear existing preview content safely
    while (resumePreview.firstChild) {
      resumePreview.removeChild(resumePreview.firstChild);
    }

    // Apply template class
    resumePreview.className = "resume-preview " + activeTemplate;

    // --- HEADER ---
    const header = document.createElement("div");
    header.className = "resume-header";

    const h1 = document.createElement("h1");
    setText(h1, nameInput.value, "John Doe");

    const contactP = document.createElement("p");
    const emailSpan = document.createElement("span");
    setText(emailSpan, emailInput.value, "john@example.com");

    const separator = document.createTextNode(" | ");

    const phoneSpan = document.createElement("span");
    setText(phoneSpan, phoneInput.value, "+91 9876543210");

    contactP.appendChild(emailSpan);
    contactP.appendChild(separator);
    contactP.appendChild(phoneSpan);

    header.appendChild(h1);
    header.appendChild(contactP);

    // --- SECTIONS ---
    const summarySection    = createSection("Summary",    summaryInput.value,    "Professional summary will appear here.");
    const projectsSection   = createSection("Projects",   projectsInput.value,   "Your projects will appear here.");
    const skillsSection     = createSection("Skills",     skillsInput.value,     "Your skills will appear here.");
    const experienceSection = createSection("Experience", experienceInput.value, "Your experience will appear here.");
    const educationSection  = createSection("Education",  educationInput.value,  "Your education will appear here.");

    // Append all to preview
    resumePreview.appendChild(header);
    resumePreview.appendChild(summarySection);
    resumePreview.appendChild(projectsSection);
    resumePreview.appendChild(skillsSection);
    resumePreview.appendChild(experienceSection);
    resumePreview.appendChild(educationSection);
  }

  // ==========================
  // Live input listeners
  // ==========================
  const inputs = [
    nameInput, emailInput, phoneInput, summaryInput,
    projectsInput, skillsInput, experienceInput, educationInput
  ];

  inputs.forEach((input) => {
    if (input) {
      input.addEventListener("input", updatePreview);
    }
  });

  // ==========================
  // Template selection
  // ==========================
  templateButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      templateButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // Update active template
      activeTemplate = btn.dataset.template || "modern";
      updatePreview();
    });
  });

  // ==========================
  // Download (print to PDF)
  // ==========================
  if (downloadBtn) {
    downloadBtn.addEventListener("click", () => {
      window.print();
    });
  }

  // ==========================
  // Initial render
  // ==========================
  updatePreview();
});