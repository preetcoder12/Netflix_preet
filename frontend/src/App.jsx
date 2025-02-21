import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import WatchPage from "./pages/WatchPage";
import HomePage from "./pages/home/HomePage";
import NotFoundPage from "./pages/NotFound";

import { Toaster } from "react-hot-toast";
import { userAuthstore } from "./store/AuthUser";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import SearchPage from "./components/SearchPage";
import History from "./components/History";

function App() {
    const { user, isCheckingAuth, checkAuth } = userAuthstore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    if (isCheckingAuth) {
        return (
            <div className='h-screen'>
                <div className='flex justify-center items-center bg-black h-full'>
                    <Loader className='animate-spin text-red-600 size-10' />
                </div>
            </div>
        );
    }

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/login' element={!user ? <LoginPage /> : <Navigate to={"/"} />} />
                    <Route path='/signup' element={!user ? <SignupPage /> : <Navigate to={"/"} />} />
                    <Route path='/watch/:id' element={!user ? <Navigate to={"/login"} /> : <WatchPage />} />
                    <Route path='/search' element={!user ? <Navigate to={"/login"} /> : <SearchPage />} />
                    <Route path='/history' element={!user ? <Navigate to={"/login"} /> : <History />} />
                    <Route path='/*' element={<NotFoundPage />} />
                </Routes>
            </BrowserRouter>
            <Toaster />
        </>
    );
}

export default App; 