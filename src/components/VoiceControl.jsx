function VoiceControl({ onCommand }) {
  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = (event) => {
      const command =
        event.results[0][0].transcript.toLowerCase();

      onCommand(command);
    };
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
      }}
    >
      🎤 Voice
    </button>
  );
}

export default VoiceControl;