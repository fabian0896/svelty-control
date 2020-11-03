import React, { useState } from 'react'
import 'react-dates/initialize';
import {DateRangePicker,DayPickerRangeControllerWrapper} from 'react-dates'
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment'

const DateSelector = props => {

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [focusedInput, setFocusedInput] = useState(null)

    const onChange = ({ startDate, endDate }) => {     
      setStartDate(startDate);
      setEndDate(endDate);
    };

    const handleFocusChange = (focusedInput)=>{
        setFocusedInput(focusedInput)
    } 

    return (
        <DateRangePicker
       isOutsideRange={()=>false}
        startDate={startDate} // momentPropTypes.momentObj or null,
        startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
        endDate={endDate} // momentPropTypes.momentObj or null,
        endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
        onDatesChange={onChange} // PropTypes.func.isRequired,
        focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
        onFocusChange={handleFocusChange} // PropTypes.func.isRequired,
      />
    )
}



export default DateSelector