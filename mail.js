// Initialisez EmailJS avec votre Public Key
(function(){
    emailjs.init("2W5V1TCu3Nr8NyHHQ"); // Remplacez par votre Public Key EmailJS
})();

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const serviceID = 'service_ny8sjqn'; // Remplacez par votre ID de service EmailJS
    const templateID = 'template_8y4iirm'; // Remplacez par votre ID de modèle EmailJS

    emailjs.sendForm(serviceID, templateID, this)
        .then((response) => {
            document.getElementById('result').textContent = 'Email envoyé avec succès!';
        }, (error) => {
            document.getElementById('result').textContent = 'Échec de l\'envoi de l\'email.';
        });
});
