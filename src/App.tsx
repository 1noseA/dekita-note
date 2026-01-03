import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppStore } from '@/context/AppStoreContext';
import { LandingPage } from '@/pages/LandingPage';
import { CalendarPage } from '@/pages/CalendarPage';
import { RecordEditorPage } from '@/pages/RecordEditorPage';
import { SettingsPage } from '@/pages/SettingsPage';

function App() {
  const { currentUser } = useAppStore();

  return (
    <div className="min-h-screen w-full md:flex md:items-center md:justify-center md:bg-gray-100">
      <div className="w-full h-full min-h-screen md:min-h-0 md:max-w-md md:h-[85vh] md:max-h-[900px] md:rounded-2xl md:shadow-2xl md:overflow-hidden md:bg-background relative flex flex-col">
        {!currentUser ? (
          <Routes>
            <Route path="*" element={<LandingPage />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<CalendarPage />} />
            <Route path="/edit" element={<RecordEditorPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        )}
      </div>
    </div>
  );
}

export default App;
