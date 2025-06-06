import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import ProtectedRoute from './components/guards/ProtectedRoute';
import JudgeAddPage from "./pages/judges/JudgeAddPage";
import Sidebar from "./components/SideBar";
import DivisionAddPage from "./pages/divisions/DivisionAddPage";
import CompetitorAddPage from "./pages/competitors/CompetitorAddPage";
import CompetitionAddPage from "./pages/competitions/CompetitionsAddPage";
import UserAddPage from "./pages/users/UsersAddPage";
import NotFoundPage from './pages/NotFoundPage';
import FullCritique from './components/recentcritiques/FullCritique';
import JudgeListPage from "./pages/judges/JudgeListPage";
import SSEComponent from "./components/ssecomponent/SSEComponent";

const App: React.FC = () => {
    const location = useLocation();
    const isAuthPage = location.pathname === '/login' || location.pathname === '/register';  
    // @ts-ignore
    return (
    <div className="bg-gray-100 min-h-screen">
        {/* Add your navigation bar here */}
        {isAuthPage === false && <Sidebar></Sidebar>}
        <div className="container mx-auto px-4 py-8">
            <Routes>
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/judge" element={<JudgeAddPage/>}/>
                <Route path="/judges" element={<JudgeListPage/>}/>
                <Route path="/division" element={<DivisionAddPage/>}/>
                <Route path="/competitor" element={<CompetitorAddPage/>}/>
                <Route path="/competition" element={<CompetitionAddPage/>}/>
                <Route path="/stream" element={<SSEComponent/>}/>
                <Route path="/user" element={<UserAddPage/>}/>
                <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
                <Route path="/critique/:id" element={<FullCritique />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </div>
    </div>
  );
};

export default App;
