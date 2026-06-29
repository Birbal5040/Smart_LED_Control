function VoiceControl({ onCommand }) {
  const startListening = () => {
    console.log("Voice button clicked");

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      alert("Listening Started");
      console.log("Listening Started");
    };

    recognition.onspeechstart = () => {
      alert("Speech Detected");
      console.log("Speech Detected");
    };

    recognition.onspeechend = () => {
      alert("Speech Ended");
      console.log("Speech Ended");
    };

    recognition.onresult = (event) => {
      const command =
        event.results[0][0].transcript.toLowerCase();

      alert("You said: " + command);

      console.log(command);

      if (onCommand) {
        onCommand(command);
      }
    };

    recognition.onerror = (event) => {
      alert("Error: " + event.error);
      console.log(event.error);
    };

    recognition.onend = () => {
      alert("Recognition Ended");
      console.log("Recognition Ended");
    };

    recognition.start();
  };

  return (
    <button onClick={startListening}>
      🎤 Voice
    </button>
  );
}

export default VoiceControl;