(function() {
    emailjs.init("_ja7Jcc47WQPY66Ry"); // <-- Sostituisci con la tua chiave
  })();




  const phoneInputField = document.querySelector("#telefono");
  const phoneInput = window.intlTelInput(phoneInputField, {
    initialCountry: "it",                     // imposta l'Italia come predefinito
    preferredCountries: ["it", "us", "gb"],   // paesi preferiti in alto alla lista
    separateDialCode: true,                  // separa il prefisso dal numero
    utilsScript:
      "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
  });

  // 3. Cattura l'evento submit del form
  const form = document.getElementById('myForm');
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Recupero valori dal form
    const nomeVal = document.getElementById('nome').value;
    const cognomeVal = document.getElementById('cognome').value;
    const sessoVal = document.getElementById('sesso').value;
    const etaVal = document.getElementById('eta').value;
    const emailVal = document.getElementById('email').value;
    const giorniAllenamentoVal = document.getElementById('giorni_allenamento').value;
    const tempoGiornoVal = document.getElementById('tempo_giorno').value;
    const obiettiviVal = document.getElementById('obiettivi').value;
    const cosaDisposizioneVal = document.getElementById('cosa_disposizione').value;
    const eserciziFamigliariVal = document.getElementById('esercizi_famigliari').value;
    const problemiArticolariVal = document.getElementById('problemi_articolari').value;
    const condizioniFisicheVal = document.getElementById('condizioni_fisiche').value;

    // Telefono con prefisso
    // Se hai usato separateDialCode = true, devi unire il prefisso + numero
    const fullPhoneNumber = phoneInput.getSelectedCountryData().dialCode + " " + phoneInputField.value;

    // Prepara i parametri per EmailJS
    // I NOMI di questi campi devono corrispondere ai placeholder nel tuo template
    const templateParams = {
      from_name: nomeVal + " " + cognomeVal,       // o come preferisci
      to_name: "Luca",                             // facoltativo: se nel template hai {{to_name}}
      reply_to: emailVal,                          // per "reply to" dell'email
      nome: nomeVal,
      cognome: cognomeVal,
      sesso: sessoVal,
      eta: etaVal,
      email: emailVal,
      telefono: fullPhoneNumber,                   // per {{telefono}}
      giorni_allenamento: giorniAllenamentoVal,
      tempo_giorno: tempoGiornoVal,
      obiettivi: obiettiviVal,
      cosa_disposizione: cosaDisposizioneVal,
      esercizi_famigliari: eserciziFamigliariVal,
      problemi_articolari: problemiArticolariVal,
      condizioni_fisiche: condizioniFisicheVal
    };

    // 4. Invia con EmailJS
    emailjs.send(
      "service_gnv1iun",     // service id
      "template_4iu6kyb",    // template id
      templateParams
    ).then(
      function(response) {
        console.log("SUCCESS!", response.status, response.text);
        alert("Messaggio inviato correttamente!");
        form.reset();
      },
      function(error) {
        console.error("FAILED...", error);
        alert("Si è verificato un errore durante l’invio.");
      }
    );
  });