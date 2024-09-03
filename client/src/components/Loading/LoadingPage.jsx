import './loading.css'

export const LoadingPage = () => {
    return (
        <div className="bg-primary flex items-center align-middle justify-center min-h-screen z-50">
            <div className="">
                <div className="sk-chase">
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                </div>
            </div>
            <p className='text-white mx-8 my-8'>Cargando...</p>
        </div>
    )
}
