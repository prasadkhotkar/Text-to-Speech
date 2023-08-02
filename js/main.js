const synth = window.speechSynthesis;

const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body');

let voices = [];

function populateVoiceList() {
  voices = synth.getVoices();

  for (const voice of voices) {
    const option = document.createElement("option");
    option.textContent = `${voice.name} (${voice.lang})`;

    if (voice.default) {
      option.textContent += " — DEFAULT";
    }

    option.setAttribute("data-lang", voice.lang);
    option.setAttribute("data-name", voice.name);
    voiceSelect.appendChild(option);
  }
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

// Speaking the content
const speak = () => {
    // to check if speaking
    if (synth.speaking) {
      console.error('Already speaking...');
      return;
    }
    if (textInput.value !== '') {
      // To add the background wave and color
      body.style.background = '#141414 url(img/wave.gif)';
      body.style.backgroundRepeat = 'repeat-x';
      body.style.backgroundSize = '100% 100%';
  
     // To Get speak text
      const speakText = new SpeechSynthesisUtterance(textInput.value);
  
     // After speak ends
      speakText.onend = e => {
        console.log('Done speaking...');
        body.style.background = '#141414';
      };
  
    // when Speak error occurs
      speakText.onerror = e => {
        console.error('Something went wrong');
      };
  
      // Selected voice
      const selectedVoice = voiceSelect.selectedOptions[0].getAttribute(
        'data-name'
      );
  
      // Loop through voices
      voices.forEach(voice => {
        if (voice.name === selectedVoice) {
          speakText.voice = voice;
        }
      });
  
      /// Set pitch and rate
      speakText.rate = rate.value;
      speakText.pitch = pitch.value;
      // Speak
      synth.speak(speakText);
    }
  };
  
  // EVENT LISTENERS
  
  // Text form submit
  textForm.addEventListener('submit', e => {
    e.preventDefault();
    speak();
    textInput.blur();
  });
  
   // to change the rate value
  rate.addEventListener('change', e => (rateValue.textContent = rate.value));
  
   // for changing the pitch value
  pitch.addEventListener('change', e => (pitchValue.textContent = pitch.value));
  
 // To change the selected voice
  voiceSelect.addEventListener('change', e => speak());
