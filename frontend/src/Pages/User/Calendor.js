import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const MyCalendar = () => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);

  const handleCheckInDateChange = (date) => {
    setCheckInDate(date);
  };

  const handleCheckOutDateChange = (date) => {
    setCheckOutDate(date);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Perform API request to save check-in and check-out dates to the backend
    // ...

    // Reset check-in and check-out dates
    setCheckInDate(null);
    setCheckOutDate(null);
  };

  return (
    <div>
      <h2>Calendar</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Check-in Date:</label>
          <DatePicker selected={checkInDate} onChange={handleCheckInDateChange} dateFormat="dd/MM/yyyy" />
        </div>
        <div>
          <label>Check-out Date:</label>
          <DatePicker selected={checkOutDate} onChange={handleCheckOutDateChange} dateFormat="dd/MM/yyyy" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default MyCalendar;
