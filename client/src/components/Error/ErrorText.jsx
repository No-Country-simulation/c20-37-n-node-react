/* eslint-disable react/prop-types */

export const ErrorText = ({ text }) => {
    return (
        <span className="text-sm text-red-600 dark:text-red-500">
            {text}
        </span>
    )
}
