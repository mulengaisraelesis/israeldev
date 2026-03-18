const CONTACT_PUBLIC_KEY = "F7Oj1TjTsgafCbwWV";
const CONTACT_SERVICE_ID = "service_ny8sjqn";
const CONTACT_TEMPLATE_ID = "template_2tov0yw";

const form = document.getElementById("contactForm");
const submitButton = document.getElementById("submitButton");
const consoleStatus = document.getElementById("consoleStatus");

function appendConsoleLog(message, level) {
  if (!consoleStatus) {
    return;
  }

  const line = document.createElement("p");
  line.className = `console-log ${level}`;
  line.textContent = message;
  consoleStatus.prepend(line);
}

if (window.emailjs) {
  window.emailjs.init({ publicKey: CONTACT_PUBLIC_KEY });
}

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!window.emailjs) {
      appendConsoleLog(
        "[ERROR] Email service indisponible. Recharge la page.",
        "error",
      );
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Envoi en cours...";
    appendConsoleLog("[PENDING] Envoi en cours...", "pending");

    try {
      await window.emailjs.sendForm(
        CONTACT_SERVICE_ID,
        CONTACT_TEMPLATE_ID,
        form,
      );
      appendConsoleLog("[SUCCESS] Message envoye avec succes.", "success");
      form.reset();
    } catch (error) {
      appendConsoleLog(
        "[ERROR] Echec de l'envoi. Reessaie ou contacte via WhatsApp.",
        "error",
      );
      console.error("EmailJS send error:", error);
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Envoyer";
    }
  });
}
