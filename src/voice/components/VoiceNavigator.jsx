import { useVoiceNavigation } from '../hooks/useVoiceNavigation';

const VoiceNavigator = () => {
  const { listening, transcript, currentLang, toggleListening } = useVoiceNavigation();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center">
      {transcript && (
        <div className={`mb-2 bg-gray-800 text-white text-xs px-3 py-1.5 rounded shadow max-w-xs text-center ${
          currentLang === 'fa' ? 'direction-rtl' : 'direction-ltr'
        }`}>
          {currentLang === 'fa' ? `شنیده شد: ${transcript}` : `Heard: ${transcript}`}
        </div>
      )}
      <button
        onClick={toggleListening}
        className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-lg transition-all ${
          listening ? 'bg-red-500 animate-pulse' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {listening ? '⏹️' : '🎤'}
      </button>
      <p className="text-xs text-center mt-2 text-gray-500 font-sans">
        {currentLang === 'fa' ? 'کنترل صوتی' : 'Voice Control'}
      </p>
    </div>
  );
};

export default VoiceNavigator;