import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Layout } from './components/Layouts/Layout'
import { Home } from './Pages/Home'
import { Dashboard } from './Pages/Dashboard'
import { Authentication } from './Pages/Authentication'
import { AdminLayout } from './components/Layouts/AdminLayout'
import { UserList } from './components/Users/UserList'
import { ProtectedRoute } from './ProtectedRoute'

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route element={<Layout />}>

                    <Route path='/login' element={<Authentication />} />
                    <Route path='/register' element={<Authentication />} />

                    <Route element={<ProtectedRoute />}>
                        <Route path='/dashboard' element={<Dashboard />} />

                        {/* Rutas para el administrador */}
                        <Route path='/admin' element={<AdminLayout />}>
                            <Route path='/admin/userList/' element={<UserList />} />
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
