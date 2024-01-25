import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import "react-datepicker/dist/react-datepicker.css";

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

//import DatePickerTime from 'datetimepicker';
//import 'react-datepicker-time/dist/react-datepicker-time.css';


/**
 * React component for a mini calendar.
 *
 * @param {Object} props - Component properties.
 * @param {boolean} props.show - Boolean indicating whether the modal is visible.
 * @param {function} props.setSelectedDate - Function to set the selected date.
 * @param {function} props.toggleShow - Function to toggle the modal visibility.
 * @returns {JSX.Element} - The JSX element representing the MiniCalendar component.
 */
const MiniCalendar = (props) => {
    const [show, setShow] = useState(props.show);    
    
    const handleDateChange = (date) => {
        if(date){
            props.setSelectedDate(date['$d']);
        }
    };

    return (
        <>
            <Modal
                show={props.show}
                onHide={() => setShow(false)}
                backdrop="static"
                keyboard={false}
                className="alladdUser2"
            >
                <div className="alladdUser">
                    <Modal.Header className="header">
                        Select Date
                    </Modal.Header>
                    <Modal.Body className="body-text">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DateTimePicker']}>
                                <DateTimePicker label="Select publication Date/Time" 
                                onChange={(newValue) => handleDateChange(newValue)}/>
                            </DemoContainer>
                        </LocalizationProvider>
                    </Modal.Body>
                    <Modal.Footer className="buttons">
                        <button className="addbutton"
                            onClick={() => {
                                    //props.render(selectedDate);
                                    props.toggleShow();
                                }
                            }
                        >
                            Select
                        </button>
                        <button className="cancelbutton" 
                            onClick={() => {
                                    props.toggleShow()
                                }
                            }
                        >
                            Close
                        </button>
                    </Modal.Footer>
                </div>
            </Modal>
        </>
    );
};

export default MiniCalendar;
