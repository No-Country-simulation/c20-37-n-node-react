'use client'

import { useState, useEffect } from 'react'

export const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        window.addEventListener('scroll', toggleVisibility)

        return () => window.removeEventListener('scroll', toggleVisibility)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    if (!isVisible) {
        return null
    }

    return (
        <button
            className='bg-primary text-white border-none flex fixed cursor-pointer, justify-center align-middle text-2xl w-12 h-12 items-center rounded-full shadow-lg hover:bg-blue-900 transition-all duration-300 ease-in-out bottom-5 right-5'
            onClick={scrollToTop}
            aria-label="Volver al inicio de la página"
        >
            &#8593;
        </button>
    )
}