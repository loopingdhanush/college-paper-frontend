import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import Dashboard from "./pages/Dashboard"
import QuestionBank from "./pages/QuestionBank"
import Allcourses from "./pages/allcourses";
import Login from "./pages/Login"
import Pending from "./pages/Pending";
import AuthWrapper from "./components/AuthWrapper";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={
          <AuthWrapper>
            {(admin) => <Dashboard admin={admin}/>}
            </AuthWrapper>
          }>

          <Route index element={<Navigate to="questionbank" />} />

          <Route path="questionbank" element={
            <AuthWrapper>
            {(admin) => <QuestionBank admin={admin}/>}
            </AuthWrapper>
            }/>
          
          <Route path="filter" element={
            <AuthWrapper>
            {(admin) => <Allcourses admin={admin}/>}
            </AuthWrapper>
            }/>

          <Route
            path="pending"
            element={
              <AuthWrapper>
                {(admin) =>
                  admin ? <Pending /> : <Navigate to="/" />
                }
                </AuthWrapper>
            }/>

            <Route
            path="allpapers"
            element={
              <AuthWrapper>
                {(admin) =>
                  admin ? <Pending /> : <Navigate to="/" />
                }
                </AuthWrapper>
            }/>

          </Route>

          

          <Route path="/login" element={<Login/>}></Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App