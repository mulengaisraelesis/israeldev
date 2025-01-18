
(function(){
    emailjs.init("F7Oj1TjTsgafCbwWV");
    console.log("EmailJS initialized");
});

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    console.log("Form submitted");

    const serviceID = 'service_ny8sjqn';
    const templateID = 'template_2tov0yw';
    const form = document.getElementById('contactForm');
    
    console.log("Service ID:", serviceID);
    console.log("Template ID:", templateID);
    console.log("Form Data:", new FormData(form));
    
    emailjs.sendForm(serviceID, templateID, form)
        .then((response) => {
            console.log("Email sent successfully:", response.status, response.text);
            alert('Email envoyé avec succès!');
        }, (error) => {
            console.log("Failed to send email:", error);
            alert('Échec de l\'envoi de l\'email.');
        });
});
