import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Layout } from './Layout'
import { Home } from './Pages/Home'
import { Dashboard } from './Pages/Dashboard'
import { Authentication } from './Pages/Authentication'

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route element={<Layout />}>
                    <Route path='/login' element={<Authentication />} />
                    <Route path='/register' element={<Authentication />} />
                    <Route path='/dashboard' element={<Dashboard />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
