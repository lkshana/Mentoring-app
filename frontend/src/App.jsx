import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Auth Components
import StudentLogin from './components/Auth/StudentLogin';
import StudentRegister from './components/Auth/StudentRegister';
import MentorLogin from './components/Auth/MentorLogin';
import MentorRegister from './components/Auth/MentorRegister';
import AdminLogin from './components/Auth/AdminLogin';
import MasterLogin from './components/Auth/MasterLogin';

// Layout Components
import StudentLayout from './components/Layouts/StudentLayout';
import MentorLayout from './components/Layouts/MentorLayout';
import AdminLayout from './components/Layouts/AdminLayout';
import MasterLayout from './components/Layouts/MasterLayout';

// Mentoring Components
import StudentDashboard from './components/Mentoring/StudentDashboard';
import ProjectForm from './components/Mentoring/ProjectForm';
import ProjectList from './components/Mentoring/ProjectList';
import ProjectDetail from './components/Mentoring/ProjectDetail';
import UpdateForm from './components/Mentoring/UpdateForm';
import FeedbackList from './components/Mentoring/FeedbackList';
import MentorDashboard from './components/Mentoring/MentorDashboard';
import MentorFeedbackForm from './components/Mentoring/MentorFeedbackForm';
import ReportList from './components/Mentoring/ReportList';

// Profile Components
import StudentProfile from './components/Profile/StudentProfile';
import MentorProfile from './components/Profile/MentorProfile';

// Shared Components
import ProtectedRoute from './components/Shared/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Navigate to="/student/login" replace />} />
            <Route path="/student/login" element={<StudentLogin />} />
            <Route path="/student/register" element={<StudentRegister />} />
            <Route path="/mentor/login" element={<MentorLogin />} />
            <Route path="/mentor/register" element={<MentorRegister />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/master/login" element={<MasterLogin />} />

            {/* Protected Student Routes */}
            <Route element={<ProtectedRoute role="student" />}>
              <Route path="/student/dashboard" element={<StudentLayout><StudentDashboard /></StudentLayout>} />
              <Route path="/student/profile" element={<StudentLayout><StudentProfile /></StudentLayout>} />
              <Route path="/student/projects" element={<StudentLayout><ProjectList /></StudentLayout>} />
              <Route path="/student/projects/new" element={<StudentLayout><ProjectForm /></StudentLayout>} />
              <Route path="/student/projects/:projectId" element={<StudentLayout><ProjectDetail /></StudentLayout>} />
              <Route path="/student/projects/:projectId/update" element={<StudentLayout><UpdateForm /></StudentLayout>} />
              <Route path="/student/projects/:projectId/feedback" element={<StudentLayout><FeedbackList /></StudentLayout>} />
              <Route path="/student/projects/:projectId/reports" element={<StudentLayout><ReportList /></StudentLayout>} />
            </Route>

            {/* Protected Mentor Routes */}
            <Route element={<ProtectedRoute role="mentor" />}>
              <Route path="/mentor/dashboard" element={<MentorLayout><MentorDashboard /></MentorLayout>} />
              <Route path="/mentor/profile" element={<MentorLayout><MentorProfile /></MentorLayout>} />
              <Route path="/mentor/projects/:projectId/feedback" element={<MentorLayout><MentorFeedbackForm /></MentorLayout>} />
            </Route>

            {/* Protected Admin Routes */}
            <Route element={<ProtectedRoute role="admin" />}>
              <Route path="/admin/dashboard" element={<AdminLayout><MentorDashboard /></AdminLayout>} />
            </Route>

            {/* Protected Master Routes */}
            <Route element={<ProtectedRoute role="master" />}>
              <Route path="/master/dashboard" element={<MasterLayout><MentorDashboard /></MasterLayout>} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/student/login" replace />} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;