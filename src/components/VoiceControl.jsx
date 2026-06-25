function VoiceControl({ onCommand }) {
  const startListening = () => {
    console.log("Voice button clicked");

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      console.log("🎤 Listening started...");
    };

    recognition.onresult = (event) => {
      const command =
        event.results[0][0].transcript.toLowerCase();

      console.log("Voice Command:", command);

      if (onCommand) {
        onCommand(command);
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech Error:", event.error);

      if (event.error === "not-allowed") {
        alert("Please allow microphone permission.");
      }
    };

    recognition.onend = () => {
      console.log("🎤 Listening stopped");
    };

    // IMPORTANT: Start listening
    recognition.start();
  };

  return (
    <button
      onClick={startListening}
      style={{
        flex: 1,
        padding: "15px",
        borderRadius: "12px",
        border: "none",
        background: "#2563eb",
        color: "white",
        cursor: "pointer",
        fontSize: "16px",
      }}
    >
      🎤 Voice
    </button>
  );
}

export default VoiceControl;