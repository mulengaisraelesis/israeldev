const CONTACT_PUBLIC_KEY = "F7Oj1TjTsgafCbwWV";
const CONTACT_SERVICE_ID = "service_ny8sjqn";
const CONTACT_TEMPLATE_ID = "template_2tov0yw";

const form = document.getElementById("contactForm");
const submitButton = document.getElementById("submitButton");
const consoleStatus = document.getElementById("consoleStatus");

function t(key, fallback) {
  return window.i18n ? window.i18n.t(key) : fallback;
}

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
        t("contact.log.unavailable", "[ERROR] Email service unavailable."),
        "error",
      );
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = t("contact.sending", "Sending...");
    appendConsoleLog(
      t("contact.log.pending", "[PENDING] Sending..."),
      "pending",
    );

    try {
      await window.emailjs.sendForm(
        CONTACT_SERVICE_ID,
        CONTACT_TEMPLATE_ID,
        form,
      );
      appendConsoleLog(
        t("contact.log.success", "[SUCCESS] Message sent successfully."),
        "success",
      );
      form.reset();
    } catch (error) {
      appendConsoleLog(
        t(
          "contact.log.error",
          "[ERROR] Sending failed. Try again or use WhatsApp.",
        ),
        "error",
      );
      console.error("EmailJS send error:", error);
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = t("contact.submit", "Send");
    }
  });
}
