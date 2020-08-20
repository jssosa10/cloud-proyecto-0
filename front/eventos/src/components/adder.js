import React, { useState, useRef } from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from '@material-ui/core/Select';
import CheckButton from "react-validation/build/button";
import EventsDataService from "../services/events";
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Adder = ({ open, setOpen }) => {
    const form = useRef();
    const checkBtn = useRef();
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState('');
    const [eventName, setEventName] = useState('');
    const [eventCategory, setEventCategory] = useState('COURSE');
    const [eventPlace, setEventPlace] = useState('');
    const [eventAddress, setEventAddress] = useState('');
    const [eventType, setEventType] = useState('VIRTUAL');
    const [eventThumbnail, setEventThumbnail] = useState();
    const [value, setValue] = useState('');
    const [eventInitialDate, setEventInitialDate] = useState(new Date());
    const [eventFinalDate, setEventFinalDate] = useState(new Date());


    const handleSubmit = (e) => {
        e.preventDefault();

        setMessage("");
        setSuccessful(false);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            let formData = new FormData();
            formData.append('event_name', eventName);
            formData.append('event_category', eventCategory);
            formData.append('event_place', eventPlace);
            formData.append('event_address', eventAddress);
            formData.append('event_initial_date',eventInitialDate.toISOString());
            formData.append('event_final_date',eventFinalDate.toISOString());
            formData.append('event_type', eventType);
            formData.append('thumbnail', eventThumbnail);
            console.log(eventInitialDate.toISOString());
            EventsDataService.create(formData).then(
                (response) => {
                    console.log(response);
                    setMessage("created successfully");
                    setSuccessful(true);
                    clear();
                    setOpen(false);
                },
                (error) => {
                    const resMessage = JSON.stringify(error.response.data);

                    setMessage(resMessage);
                    setSuccessful(false);
                }
            );
        }
    };


    const clear = () => {
        setEventName('');
        setEventCategory('COURSE');
        setEventPlace('');
        setEventAddress('');
        setEventType('VIRTUAL');
        setEventThumbnail();
        setValue('');
        setSuccessful(false);
        setMessage('');
        setEventInitialDate(new Date());
        setEventFinalDate(new Date());
    }

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => { setOpen(false) }}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">{"Add Event"}</DialogTitle>
            <DialogContent>
                <Form ref={form}>
                    {!successful && (
                        <div>
                            <div className="form-group">
                                <label htmlFor="event_name">event_name</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="event_name"
                                    value={eventName}
                                    onChange={(e) => { setEventName(e.target.value); }}
                                    validations={[required]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="event_category">event_category</label>
                                <Select
                                    native
                                    name="event_category"
                                    value={eventCategory}
                                    onChange={(e) => { setEventCategory(e.target.value); }}
                                >
                                    
                                    
                                    <option value={"SEMINAR"}>SEMINAR</option>
                                    <option value={"CONGRESS"}>CONGRESS</option>
                                    <option value={"COURSE"}>COURSE</option>
                                    <option value={"CONFERENCE"}>CONFERENCE</option>
                                </Select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="event_place">event_place</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="event_place"
                                    value={eventPlace}
                                    onChange={(e) => { setEventPlace(e.target.value); }}
                                    validations={[required]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="event_address">event_address</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="event_address"
                                    value={eventAddress}
                                    onChange={(e) => { setEventAddress(e.target.value); }}
                                    validations={[required]}
                                />
                            </div>
                            <div className="form-group">
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <Grid container justify="space-around">
                                        <KeyboardDatePicker
                                            margin="normal"
                                            id="date-picker-dialog"
                                            label="event_initial_date "
                                            format="yyyy-MM-dd"
                                            value={eventInitialDate}
                                            onChange={(date)=>{setEventInitialDate(date)}}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                        <KeyboardTimePicker
                                            margin="normal"
                                            id="time-picker"
                                            label="event_initial_time"
                                            value={eventInitialDate}
                                            onChange={(date)=>{setEventInitialDate(date)}}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change time',
                                            }}
                                        />
                                    </Grid>
                                </MuiPickersUtilsProvider>
                            </div>
                            <div className="form-group">
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <Grid container justify="space-around">
                                        <KeyboardDatePicker
                                            margin="normal"
                                            id="date-picker-dialog"
                                            label="event_final_date "
                                            format="yyyy-MM-dd"
                                            value={eventFinalDate}
                                            onChange={(date)=>{setEventFinalDate(date)}}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                        <KeyboardTimePicker
                                            margin="normal"
                                            id="time-picker"
                                            label="event_final_time"
                                            value={eventFinalDate}
                                            onChange={(date)=>{setEventFinalDate(date)}}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change time',
                                            }}
                                        />
                                    </Grid>
                                </MuiPickersUtilsProvider>
                            </div>

                            <div className="form-group">
                                <label htmlFor="event_type">event_type</label>
                                <Select
                                    native
                                    name="event_category"
                                    value={eventType}
                                    onChange={(e) => { setEventType(e.target.value); }}
                                >
                                    <option value={"VIRTUAL"}>VIRTUAL</option>
                                    <option value={"PRESENCIAL"}>PRESENCIAL</option>
                                </Select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="event_thumbnail">event_thumbnail</label>
                                <Input
                                    type="file"
                                    accept=".png, .jpg, .jpeg"
                                    className="form-control"
                                    name="event_thumbnail"
                                    value={value}
                                    onChange={(e) => { setEventThumbnail(e.target.files[0]); setValue(e.target.value) }}
                                    validations={[required]}
                                />
                            </div>
                        </div>
                    )}

                    {message && (
                        <div className="form-group">
                            <div
                                className={
                                    successful ? "alert alert-success" : "alert alert-danger"
                                }
                                role="alert"
                            >
                                {message}
                            </div>
                        </div>
                    )}
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </Form>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => { clear(); setOpen(false) }} color="primary">
                    Cancel
          </Button>
                <Button onClick={handleSubmit} color="primary">
                    Add
          </Button>
            </DialogActions>
        </Dialog>
    );
}

export default Adder;