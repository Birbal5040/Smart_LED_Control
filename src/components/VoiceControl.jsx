import { useState } from "react";

function VoiceControl({ onCommand }) {
  const [voiceStatus, setVoiceStatus] = useState("🎤 Voice Assistant");
  const [isListening, setIsListening] = useState(false);

  const startListening = () => {
    if (isListening) return;

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
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setVoiceStatus("🎙️ Listening...");
      console.log("Listening...");
    };

    recognition.onresult = (event) => {
      const command =
        event.results[0][0].transcript.toLowerCase().trim();

      console.log("Voice Command:", command);

      if (onCommand) {
        onCommand(command);
      }

      setVoiceStatus(`✅ ${command}`);
    };

    recognition.onerror = (event) => {
      console.log(event.error);

      switch (event.error) {
        case "no-speech":
          setVoiceStatus("❌ No Speech");
          break;

        case "not-allowed":
          setVoiceStatus("❌ Permission Denied");
          break;

        default:
          setVoiceStatus("❌ Voice Error");
      }
    };

    recognition.onend = () => {
      setIsListening(false);

      setTimeout(() => {
        setVoiceStatus("🎤 Voice Assistant");
      }, 1500);

      console.log("Recognition Ended");
    };

    recognition.start();
  };

  return (
    <div style={{ width: "100%" }}>
      <button
        onClick={startListening}
        disabled={isListening}
        style={{
          width: "100%",
          height: "60px",
          border: "none",
          borderRadius: "12px",
          background: isListening ? "#1d4ed8" : "#2563eb",
          color: "white",
          fontSize: "18px",
          fontWeight: "600",
          cursor: isListening ? "not-allowed" : "pointer",
          transition: "0.3s",
          opacity: isListening ? 0.8 : 1,
        }}
      >
        {voiceStatus}
      </button>
    </div>
  );
}

export default VoiceControl;