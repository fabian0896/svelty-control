import React, { useState } from 'react'
import 'react-dates/initialize';
import {DateRangePicker,DayPickerRangeControllerWrapper} from 'react-dates'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment'

const useStyles = makeStyles(theme =>({
  button: {
    marginLeft: theme.spacing(2)
  }
}))

const DateSelector = props => {

    const {onUpdate} = props

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [focusedInput, setFocusedInput] = useState(null)

    const classes = useStyles()

    const onChange = ({ startDate, endDate }) => {     
      setStartDate(startDate);
      setEndDate(endDate);
      
    };

    const handleFocusChange = (focusedInput)=>{
        setFocusedInput(focusedInput)
    } 

    const handleOnUpdate = ()=>{
      onUpdate(startDate,endDate)
    }

    return (
      <div>
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
        <Button onClick={handleOnUpdate} className={classes.button} variant="contained" color="primary" >Calcular</Button>
      </div>
    )
}



export default DateSelector