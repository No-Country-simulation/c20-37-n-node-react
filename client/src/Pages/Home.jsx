import { faBell, faHeadset, faShieldHalved } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

export const Home = () => {
    return (
        <div>
            <div className="flex flex-col lg:flex-row justify-center items-center m-8 mb-10">
                <div className="title lg:w-8/12">
                    <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl" data-aos="zoom-in" data-aos-duration="1000">Conecta clínicas, acerca pacientes. <span className="text-primary">SaludNet</span> al servicio de tu salud.</h1>
                    <p className="text-base font-normal text-gray-500 lg:text-xl" data-aos="zoom-in" data-aos-duration="1000">Transformamos la atención médica con tecnología, facilitando la gestión integral de servicios médicos, todo desde un solo lugar.</p>
                    <button type="button" className="mt-5 text-white bg-primary hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-full text-lg font-semibold px-5 py-2.5 text-center me-2 mb-2" data-aos="fade-right" data-aos-duration="1000">Conéctate ahora</button>
                </div>
                <div className="title-image lg:w-4/12">
                    <img src="./doctors/duo-doctors-cover.png" alt="duo doctors" data-aos="zoom-in" data-aos-duration="1000" />
                </div>
            </div>
            <section className="flex flex-col lg:flex-row-reverse justify-center items-center h-110vh bg-primary p-5 lg:p-16" data-aos="zoom-in" data-aos-duration="1000">
                <div className="lg:w-5/12 p-11 lg:p-1">
                    <h4 className="mb-12 text-5xl font-bold tracking-tight text-background">Conoce a Nuestros <span className="text-secondary">Especialistas</span></h4>
                    <p className="font-semibold text-gray-200 mb-5 lg:mb-10">Accede a perfiles detallados de nuestros especialistas, con información sobre su experiencia, especialidades y horarios disponibles. Elige al médico que mejor se adapte a tus necesidades y consulta con los mejores profesionales.</p>
                    <Link to={'/specialists'} type="button" className="text-secondary bg-background hover:text-white hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-semibold uppercase px-5 py-2.5 text-center me-2">Ver Mis Especialistas</Link>
                </div>
                <div className="w-full lg:w-7/12 mb-11 lg:mr-5">
                    <img src="./doctors/doctors-group.png" alt="group of doctors" className="box-shadow" />
                </div>
            </section>

            <section className="flex flex-col lg:flex-row justify-center items-center h-110vh bg-background p-5 lg:p-16" data-aos="zoom-in" data-aos-duration="1000">
                <div className="lg:w-5/12 p-7 lg:p-1">
                    <h4 className="mb-12 text-5xl font-bold tracking-tight text-primary">Tu <span className="text-secondary">Historia Clínica</span> al Alcance de un <span className="text-secondary">Clic</span></h4>
                    <p className="font-semibold text-gray-600 mb-5 lg:mb-10">Los pacientes pueden cargar su historial médico en nuestra plataforma. Nuestros especialistas lo revisarán al solicitar una consulta, permitiendo un análisis más preciso y actualizado.</p>
                </div>
                <div className="w-full lg:w-7/12 mb-11">
                    <img src="./doctors/notes-doctor.png" alt="doctor noting" className="box-shadow" />
                </div>
            </section>

            <section className="flex flex-col lg:flex-row-reverse justify-center items-center h-110vh bg-primary p-5 lg:p-16" data-aos="zoom-in" data-aos-duration="1000">
                <div className="lg:w-5/12 p-7 lg:p-1">
                    <h4 className="mb-12 text-5xl font-bold tracking-tight text-background">Tu <span className="text-secondary">Salud</span> en la comodidad de tu <span className="text-secondary">Hogar</span></h4>
                    <p className="font-semibold text-gray-200 mb-5 lg:mb-10">Consulta a tu médico desde la comodidad de tu hogar con nuestras consultas virtuales seguras y efectivas. Evita desplazamientos y recibe atención médica de calidad, donde y cuando la necesites.</p>
                    <Link to={'/login'} type="button" className="text-secondary bg-background hover:text-white hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-semibold uppercase px-5 py-2.5 text-center me-2">Solicitar Consulta Ahora</Link>
                </div>
                <div className="w-full lg:w-7/12 mb-11 lg:mr-5">
                    <img src="./doctors/mobile-notebook.png" alt="mobile & notebook" className="box-shadow" />
                </div>
            </section>

            <section className="flex flex-col lg:flex-row justify-center items-center h-110vh bg-background p-5 lg:p-16" data-aos="zoom-in" data-aos-duration="1000">
                <div className="lg:w-5/12 p-7 lg:p-1">
                    <h4 className="mb-12 text-5xl font-bold tracking-tight text-primary">Organiza tu <span className="text-secondary">Calendario</span> Médico</h4>
                    <p className="font-semibold text-gray-600 mb-5 lg:mb-10">Gestiona todas tus citas médicas en un solo lugar. Programa cancela o reprograma consultas de manera sencilla, con opciones tanto para consultas virtuales como presenciales.</p>
                    <Link to={'/login'} type="button" className="text-secondary border border-secondary hover:text-white hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-semibold uppercase px-5 py-2.5 text-center me-2">Gestionar mis citas</Link>
                </div>
                <div className="w-full lg:w-7/12 mb-11">
                    <img src="./doctors/calendar.png" alt="doctor noting" className="box-shadow" />
                </div>
            </section>

            <section className="flex flex-col lg:flex-row-reverse justify-center items-center h-110vh bg-primary p-5 lg:p-16" data-aos="zoom-in" data-aos-duration="1000">
                <div className="lg:w-5/12 p-7 lg:p-1">
                    <h4 className="mb-12 text-5xl font-bold tracking-tight text-background"><span className="text-secondary">Guarda</span> y Revisa tus <span className="text-secondary">Consultas</span></h4>
                    <p className="font-semibold text-gray-200 mb-5 lg:mb-10">Si así lo deseas, puedes grabar tus consultas virtuales para revisarlas cuando lo necesites. Mantén un registro de tus consultas médicas y consulta la información cuando quieras.</p>
                </div>
                <div className="w-full lg:w-6/12 mb-11 lg:mr-8">
                    <img src="./doctors/record-mobile.png" alt="mobile recording" className="box-shadow" />
                </div>
            </section>

            <section className="flex flex-col lg:flex-row justify-center items-center h-110vh bg-background p-5 lg:p-16" data-aos="zoom-in" data-aos-duration="1000">
                <div className="lg:w-5/12 p-7 lg:p-1">
                    <h4 className="mb-12 text-5xl font-bold tracking-tight text-primary">Seguimiento <span className="text-secondary">Personalizado</span> para tu <span className="text-secondary">Salud</span></h4>
                    <p className="font-semibold text-gray-600 mb-5 lg:mb-10">Disfruta de un seguimiento continuo con nuestros especialistas, quienes revisarán y actualizarán tu historial médico tras cada consulta. Garantiza un tratamiento adecuado y un monitoreo constante de tu estado de salud.</p>
                    <Link to={'/login'} type="button" className="text-secondary border border-secondary hover:text-white hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-semibold uppercase px-5 py-2.5 text-center me-2">Recibir Seguimiento Médico</Link>
                </div>
                <div className="w-full lg:w-7/12">
                    <img src="./doctors/medical-follow-ups.png" alt="doctor noting" className="box-shadow" />
                </div>
            </section>

            <section className="flex flex-col lg:flex-row justify-center items-center bg-background p-5 lg:px-16" data-aos="fade-up" data-aos-duration="1000">
                <div className="lg:w-4/12 flex flex-col p-3 group mb-10">
                    <FontAwesomeIcon icon={faShieldHalved} className="text-primary text-8xl mb-5 group-hover:text-9xl transition-all duration-500" />
                    <p className="text-base text-gray-500 p-2 text-center group-hover:text-lg transition-all duration-450">Protegemos tus datos con la más alta tecnología de seguridad.</p>
                </div>
                <div className="lg:w-4/12 flex flex-col p-3 group mb-10">
                    <FontAwesomeIcon icon={faHeadset} className="text-primary text-8xl mb-5 group-hover:text-9xl transition-all duration-500" />
                    <p className="text-base text-gray-500 p-2 text-center group-hover:text-lg transition-all duration-450">Soporte disponible las 24 horas para resolver tus dudas y consultas médicas.</p>
                </div>
                <div className="lg:w-4/12 flex flex-col p-3 group mb-10">
                    <FontAwesomeIcon icon={faBell} className="text-primary text-8xl mb-5 group-hover:text-9xl transition-all duration-500" />
                    <p className="text-base text-gray-500 p-2 text-center group-hover:text-lg transition-all duration-450">Recibe notificaciones automáticas para no perder ninguna consulta</p>
                </div>
            </section>
        </div>
    )
}
