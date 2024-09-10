import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Layout } from './components/Layouts/Layout'
import { Home } from './Pages/Home'
import { Dashboard } from './Pages/Dashboard'
import { Authentication } from './Pages/Authentication'
import { AdminLayout } from './components/Layouts/AdminLayout'
import { UserListPage } from './Pages/Admin/UserListPage'
import { ProtectedRoute } from './ProtectedRoute'
import { Toaster } from 'react-hot-toast';
import { ClinicalHistoryPage } from './Pages/Doc/ClinicalHistoryPage'
import { DoctorLayout } from './components/Layouts/DoctorLayout'
import { UserLayout } from './components/Layouts/UserLayout'
import { Error404 } from './components/NotFound/Error404'
import { ProfilePage } from './Pages/User/ProfilePage'
import { MedicalHistoryPage } from './Pages/User/MedicalHistoryPage'

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Authentication />} />
                    <Route path='/register' element={<Authentication />} />

                    <Route element={<ProtectedRoute />}>
                        <Route path='/dashboard' element={<Dashboard />} />

                        {/* Rutas para el administrador */}
                        <Route path='/admin' element={<AdminLayout />}>
                            {/* <Route path='/admin/profile' element={<ProfilePage />} /> */}
                            <Route path='/admin/userList/' element={<UserListPage />} />
                        </Route>

                        {/* Rutas para el doctor */}
                        <Route path='/doc' element={<DoctorLayout />}>
                            {/* <Route path='/doc/profile' element={<ProfilePage />} /> */}
                            <Route path='/doc/clinicalHistory/' element={<ClinicalHistoryPage />} />
                            <Route path='/doc/medicalHistory/' element={<MedicalHistoryPage />} />
                        </Route>

                        {/* Rutas para el usuario */}
                        <Route path='/user' element={<UserLayout />}>
                            {/* <Route path='/user/profile' element={<ProfilePage />} /> */}
                            <Route path='/user/medicalHistory/' element={<MedicalHistoryPage />} />
                        </Route>
                        <Route path='/profile' element={<ProfilePage />} />
                    </Route>
                    <Route path='/*' element={<Error404 />} />
                </Route>
            </Routes>
            <Toaster
            />
        </BrowserRouter>
    )
}
