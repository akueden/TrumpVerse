import { BrowserRouter, Routes, Route } from "react-router-dom";
import {HomePage,RegisterPage, UpdateDeletePage } from '../pages';
import MainNavigation from "../components/shared/MainNavigation";

const AppRouting = () => {
    return (
        <>
            <BrowserRouter>
                <MainNavigation/>
                <Routes>
                    <Route path="/" element={<HomePage/>}></Route>
                    <Route path="register" element={<RegisterPage/>}></Route>
                    <Route path="update-delete" element={<UpdateDeletePage/>}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default AppRouting;