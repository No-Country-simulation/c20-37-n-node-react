import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Layout } from './Layout'
import { Home } from './Pages/Home'
import { Authentication } from './Pages/Authentication'
import { Dashboard } from './Pages/Dashboard'

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Authentication />} />
                <Route path='/register' element={<Authentication />} />
                <Route element={<Layout />}>
                    <Route path='/dashboard' element={<Dashboard />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
