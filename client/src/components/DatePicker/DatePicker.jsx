/* eslint-disable react/prop-types */
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';

export const DatePick = ({ startDate, setStartDate }) => {
    return (
        <div>
            <DatePicker
                className='hover:cursor-pointer'
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="dd/MM/yyyy"
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={100}
            />
        </div>
    );
};
