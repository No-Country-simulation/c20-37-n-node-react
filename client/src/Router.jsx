import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Layout } from './components/Layouts/Layout'
import { Home } from './Pages/Home'
import { Dashboard } from './Pages/Dashboard'
import { Authentication } from './Pages/Authentication'
import { AdminLayout } from './components/Layouts/AdminLayout'
import { UserList } from './components/Users/UserList'
import { ProtectedRoute } from './ProtectedRoute'
import { Toaster } from 'react-hot-toast';
import { ClinicalHistory } from './Pages/ClinicalHistory'
import { DoctorLayout } from './components/Layouts/DoctorLayout'
import { UserLayout } from './components/Layouts/UserLayout'
import { Error404 } from './components/NotFound/Error404'
import { Profile } from './components/Profile/Profile'

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
                            <Route path='/admin/userList/' element={<UserList />} />
                        </Route>
                        {/* Rutas para el doctor */}
                        <Route path='/doc' element={<DoctorLayout />}>
                            <Route path='/doc/clinicalHistory/' element={<ClinicalHistory />} />
                        </Route>
                        <Route path='/user' element={<UserLayout />}>
                            <Route path='/profile' element={<Profile />} />
                        </Route>
                    </Route>
                    <Route path='/*' element={<Error404 />} />
                </Route>
            </Routes>
            <Toaster />
        </BrowserRouter>
    )
}
