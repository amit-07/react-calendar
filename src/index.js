import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

import "./styles.css";

function App() {
  const [startDate, setStartDate] = useState(null);
  const [hoverDate, setHoverDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const calendarDates = Array(31)
    .fill(0)
    .map((e, i) => i);

  function updateDate(day) {
    if (!startDate) setStartDate(day);
    setEndDate(day);
  }
  function handleHover(day) {
    if (!startDate) return;
    setHoverDate(day);
  }

  return (
    <div className="App">
      <p>start Date: {startDate}</p>
      <p>End date: {endDate} </p>
      <StyledCalendar className="calendar">
        {calendarDates.map((day, index) => {
          const realDayNumber = index + 1;
          let isSelected = false;
          let isInBetween = false;
          if (realDayNumber === startDate) isSelected = true; //start
          if (realDayNumber === endDate) isSelected = true; //end
          if (
            realDayNumber > startDate &&
            (realDayNumber < hoverDate || realDayNumber < endDate)
          )
            isInBetween = true; //in between
          return (
            <StyledCalendarDay
              key={index}
              isSelected={isSelected}
              isInBetween={isInBetween}
              endDate={endDate}
              onClick={() => updateDate(day + 1)}
              onMouseEnter={() => handleHover(realDayNumber)}
            >
              {day + 1}
            </StyledCalendarDay>
          );
        })}
      </StyledCalendar>
    </div>
  );
}

const StyledCalendar = styled.div`
  max-width: 400px;
  margin: 0 auto;
  border: 1px solid black;
  background: white;

  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

const StyledCalendarDay = styled.button`
  display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 15px;
    width: 30px;
    transition: 0.3s ease background;
    cursor: pointer;
    border: none;
    background: ${props =>
      props.isSelected || props.isInBetween ? "#c00c00" : "none"}
    &:hover {
      background: #bada55;
    }
`;

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
