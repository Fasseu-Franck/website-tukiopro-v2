document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const el = document.querySelector(".reveal");
    if (el) el.classList.add("visible");
  }, 100);

  const toggleBtn = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("password");

  toggleBtn.addEventListener("click", () => {
    const type =
      passwordInput.getAttribute("type") === "password"
        ? "text"
        : "password";
    passwordInput.setAttribute("type", type);

    if (type === "password") {
      toggleBtn.innerHTML =
        '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle><line x1="3" y1="3" x2="21" y2="21"></line></svg>';
    } else {
      toggleBtn.innerHTML =
        '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
    }
  });

  document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = document.querySelector(".btn-submit");
    btn.textContent = "Connexion en cours...";
    setTimeout(() => {
      btn.textContent = "Se connecter";
    }, 1500);
  });
});
