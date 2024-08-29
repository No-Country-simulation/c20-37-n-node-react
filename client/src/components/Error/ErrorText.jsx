/* eslint-disable react/prop-types */
export const ErrorText = ({ text }) => {
    return (
        <div className="bg-red-100 border text-sm border-red-400 text-red-700 px-2 my-2 rounded relative" role="alert">
            <span className="block sm:inline">{text}</span>
        </div>
    )
}
