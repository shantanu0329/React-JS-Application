import React,{useState} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Calendars() {

    const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
      selected={startDate}
      onChange={date => setStartDate(date)}
      maxDate={new Date()}
      placeholderText="Select a date"
      ClassName="red-border"
    />
  );
}

export default Calendars;
