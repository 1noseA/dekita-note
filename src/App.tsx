import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppStore } from '@/context/AppStoreContext';
import { LandingPage } from '@/pages/LandingPage';
import { CalendarPage } from '@/pages/CalendarPage';
import { RecordEditorPage } from '@/pages/RecordEditorPage';
import { SettingsPage } from '@/pages/SettingsPage';

function App() {
  const { currentUser } = useAppStore();

  if (!currentUser) {
    return (
      <Routes>
        <Route path="*" element={<LandingPage />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<CalendarPage />} />
      <Route path="/edit" element={<RecordEditorPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
