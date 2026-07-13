import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute.jsx';

import Home from './pages/Home.jsx';
import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Quiz from './pages/Quiz.jsx';
import Chat from './pages/Chat.jsx';
import Roadmap from './pages/Roadmap.jsx';
import CareerTree from './pages/CareerTree.jsx';
import Colleges from './pages/Colleges.jsx';
import LearningResources from './pages/LearningResources.jsx';
import Profile from './pages/Profile.jsx';
import Subscription from './pages/Subscription.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/quiz" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
      <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
      <Route path="/roadmap" element={<ProtectedRoute><Roadmap /></ProtectedRoute>} />
      <Route path="/career-tree" element={<ProtectedRoute><CareerTree /></ProtectedRoute>} />
      <Route path="/colleges" element={<ProtectedRoute><Colleges /></ProtectedRoute>} />
      <Route path="/learning-resources" element={<ProtectedRoute><LearningResources /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/subscription" element={<ProtectedRoute><Subscription /></ProtectedRoute>} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
