import { Outlet } from "react-router-dom"
import { Header } from "../Header/Header"
import { Footer } from "../Footer/Footer"
import { LoadingPage } from "../Loading/LoadingPage"
import { useGeneralContext } from "../../hooks/useGeneralContext"

export const Layout = () => {

    const { loading } = useGeneralContext()
    if (loading) return <LoadingPage />
    return (

        <div className="">
            <Header />
            <main className="mt-12 max-w-screen-2xl min-h-screen mx-auto z-50">
                <Outlet />
            </main>
            <Footer />
        </div >
    )
}
