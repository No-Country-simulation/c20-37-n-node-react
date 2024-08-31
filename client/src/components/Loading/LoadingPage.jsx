import './loading.css'

export const LoadingPage = () => {
    return (
        <div className="h-full bg-green-500 w-full">
            <div className="h-[calc(100vh-50px)]">
                <div className="sk-chase">
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                </div>
            </div>
        </div>
    )
}
