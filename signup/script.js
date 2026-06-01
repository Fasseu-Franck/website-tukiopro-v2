document.addEventListener("DOMContentLoaded", () => {
  // Reveal animation
  setTimeout(() => {
    const el = document.querySelector(".reveal");
    if (el) el.classList.add("visible");
  }, 100);

  // --- Password toggle helper ---
  function setupPasswordToggle(toggleId, inputId) {
    const toggleBtn = document.getElementById(toggleId);
    const input = document.getElementById(inputId);
    if (!toggleBtn || !input) return;

    toggleBtn.addEventListener("click", () => {
      const type = input.getAttribute("type") === "password" ? "text" : "password";
      input.setAttribute("type", type);

      if (type === "password") {
        toggleBtn.innerHTML =
          '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle><line x1="3" y1="3" x2="21" y2="21"></line></svg>';
      } else {
        toggleBtn.innerHTML =
          '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
      }
    });
  }

  setupPasswordToggle("togglePassword", "password");
  setupPasswordToggle("toggleConfirmPassword", "confirmPassword");

  // --- Form validation ---
  const form = document.getElementById("signupForm");
  const errorBox = document.getElementById("formError");
  const submitBtn = document.getElementById("submitBtn");

  function showError(msg) {
    errorBox.textContent = msg;
    errorBox.hidden = false;
  }

  function hideError() {
    errorBox.hidden = true;
    errorBox.textContent = "";
  }

  function clearFieldErrors() {
    document.querySelectorAll(".form-control.error").forEach((el) => {
      el.classList.remove("error");
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    hideError();
    clearFieldErrors();

    const fullname = document.getElementById("fullname");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");

    // Validate full name
    if (!fullname.value.trim()) {
      fullname.classList.add("error");
      showError("Veuillez entrer votre nom complet.");
      fullname.focus();
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
      email.classList.add("error");
      showError("Veuillez entrer une adresse e-mail valide.");
      email.focus();
      return;
    }

    // Validate phone
    if (!phone.value.trim() || phone.value.trim().length < 8) {
      phone.classList.add("error");
      showError("Veuillez entrer un numéro de téléphone valide.");
      phone.focus();
      return;
    }

    // Validate password length
    if (password.value.length < 8) {
      password.classList.add("error");
      showError("Le mot de passe doit contenir au moins 8 caractères.");
      password.focus();
      return;
    }

    // Validate password match
    if (password.value !== confirmPassword.value) {
      confirmPassword.classList.add("error");
      showError("Les mots de passe ne correspondent pas.");
      confirmPassword.focus();
      return;
    }

    // Simulate submit
    submitBtn.disabled = true;
    submitBtn.textContent = "Création en cours...";

    setTimeout(() => {
      submitBtn.textContent = "Démarrer Maintenant";
      submitBtn.disabled = false;
    }, 2000);
  });

  // Clear field error on input
  document.querySelectorAll(".form-control").forEach((input) => {
    input.addEventListener("input", () => {
      input.classList.remove("error");
      hideError();
    });
  });
});
