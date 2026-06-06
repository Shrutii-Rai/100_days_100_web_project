// ================================
// main.html logic — fills dropdown
// ================================
const select = document.getElementById("difficulty");
const startBtn = document.getElementById("start");

if (select) {
  // Load recipes from text.json and populate dropdown
  fetch("text.json")
    .then((res) => res.json())
    .then((data) => {
      // Clear the default "Loading recipes..." option
      select.innerHTML = "";

      const recipes = Array.isArray(data) ? data : Object.values(data);

      recipes.forEach((recipe, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = recipe.name || recipe.title || `Recipe ${index + 1}`;
        select.appendChild(option);
      });
    })
    .catch((err) => {
      console.error("Failed to load recipes:", err);
      select.innerHTML = "<option>Failed to load recipes</option>";
    });
}

if (startBtn) {
  startBtn.addEventListener("click", () => {
    const selectedIndex = select ? select.value : null;
    if (selectedIndex !== null) {
      // Save selected index to sessionStorage and go to rec.html
      sessionStorage.setItem("selectedRecipe", selectedIndex);
      window.location.href = "rec.html";
    }
  });
}

// ================================
// rec.html logic — shows recipe + Restart button fix
// ================================
const textDisplay = document.getElementById("text-display");
const restartBtn = document.getElementById("restart");

if (textDisplay) {
  const selectedIndex = sessionStorage.getItem("selectedRecipe");

  if (selectedIndex === null) {
    // No recipe selected — go back to main
    window.location.href = "main.html";
  } else {
    fetch("text.json")
      .then((res) => res.json())
      .then((data) => {
        const recipes = Array.isArray(data) ? data : Object.values(data);
        const recipe = recipes[selectedIndex];

        if (!recipe) {
          textDisplay.innerHTML = "<p>Recipe not found.</p>";
          return;
        }

        // Build recipe display
        const name = recipe.name || recipe.title || "Recipe";
        const ingredients = recipe.ingredients
          ? `<ul>${recipe.ingredients.map((i) => `<li>${i}</li>`).join("")}</ul>`
          : "";
        const instructions =
          recipe.instructions || recipe.description || recipe.steps || "";

        textDisplay.innerHTML = `
          <h2>${name}</h2>
          ${ingredients ? `<h3>Ingredients</h3>${ingredients}` : ""}
          ${instructions ? `<h3>Instructions</h3><p>${instructions}</p>` : ""}
        `;
      })
      .catch((err) => {
        console.error("Failed to load recipe:", err);
        textDisplay.innerHTML = "<p>Failed to load recipe. Please try again.</p>";
      });
  }
}

// ✅ FIX: Restart button — navigates back to main.html (selection screen)
if (restartBtn) {
  restartBtn.addEventListener("click", () => {
    sessionStorage.removeItem("selectedRecipe");
    window.location.href = "main.html";
  });
}