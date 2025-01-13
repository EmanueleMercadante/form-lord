(function() {
  emailjs.init("_ja7Jcc47WQPY66Ry"); // <-- Sostituisci con la tua chiave
})();

// Inizializza intl-tel-input
const phoneInputField = document.querySelector("#telefono");
const phoneInput = window.intlTelInput(phoneInputField, {
  initialCountry: "it",                   
  preferredCountries: ["it", "us", "gb"], 
  separateDialCode: true,                 
  utilsScript:
    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});

// Cattura l'evento submit del form
const form = document.getElementById('myForm');
form.addEventListener('submit', function(e) {
  e.preventDefault();

  // -- Recupero valori dal form --
  const nomeVal = document.getElementById('nome').value;
  const cognomeVal = document.getElementById('cognome').value;
  const sessoVal = document.getElementById('sesso').value;
  const etaVal = document.getElementById('eta').value;
  const emailVal = document.getElementById('email').value;
  const giorniAllenamentoVal = document.getElementById('giorni_allenamento').value;
  const tempoGiornoVal = document.getElementById('tempo_giorno').value;
  const obiettiviVal = document.getElementById('obiettivi').value;
  const cosaDisposizioneVal = document.getElementById('cosa_disposizione').value;
  const eserciziFamiliariVal = document.getElementById('esercizi_familiari').value;
  const problemiArticolariVal = document.getElementById('problemi_articolari').value;
  const condizioniFisicheVal = document.getElementById('condizioni_fisiche').value;

  // Telefono con prefisso (se separateDialCode = true, unisci dialCode + input)
  const fullPhoneNumber = phoneInput.getSelectedCountryData().dialCode 
                          + " " 
                          + phoneInputField.value;

  // -- Prepara i parametri per EmailJS --
  const templateParams = {
    from_name: nomeVal + " " + cognomeVal,
    to_name: "Luca",               // se usi {{to_name}} nel template
    reply_to: emailVal,            // se usi {{reply_to}} nel template
    nome: nomeVal,
    cognome: cognomeVal,
    sesso: sessoVal,
    eta: etaVal,
    email: emailVal,
    telefono: fullPhoneNumber,
    giorni_allenamento: giorniAllenamentoVal,
    tempo_giorno: tempoGiornoVal,
    obiettivi: obiettiviVal,
    cosa_disposizione: cosaDisposizioneVal,
    esercizi_familiari: eserciziFamiliariVal,
    problemi_articolari: problemiArticolariVal,
    condizioni_fisiche: condizioniFisicheVal
  };

  // -- Disabilita il pulsante e mostra lo spinner --
  const submitBtn = document.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.innerHTML = 'Invio... <span class="spinner"></span>';

  // -- Invia con EmailJS --
  emailjs.send(
    "service_gnv1iun",  // <-- Sostituisci con il tuo service ID
    "template_4iu6kyb", // <-- Sostituisci con il tuo template ID
    templateParams
  ).then(
    function(response) {
      console.log("SUCCESS!", response.status, response.text);
      alert("Messaggio inviato correttamente!");

      // Ripristina il pulsante
      submitBtn.disabled = false;
      submitBtn.textContent = "Invia";

      // Resetta il form
      form.reset();
    },
    function(error) {
      console.error("FAILED...", error);
      alert("Si è verificato un errore durante l’invio.");

      // Ripristina il pulsante anche in caso di errore
      submitBtn.disabled = false;
      submitBtn.textContent = "Invia";
    }
  );
});
