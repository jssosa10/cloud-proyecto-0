import React, { useState, useEffect, useRef } from "react";
import EventsDataService from "../services/events";
import Evento from "./evento";
import Adder from "./adder";
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import Editer from './editer';
import { useAuth } from "../context/auth";


const useStyles = makeStyles({
  root: {
    minWidth: 420,
    marginTop: 50,
  }
});

const Home = () => {
  const classes = useStyles();
  const { authToken} = useAuth();
  const [eventos, setEventos] = useState([]);
  const [add, setAdd] = useState(false);
  const [evento, setEvento] = useState();
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    retrieveEventos();
  }, []);
  const retrieveEventos = () => {
    EventsDataService.getAll(authToken)
      .then(response => {
        setEventos(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  const refreshList = () => {
    retrieveEventos();
  };
  const deleteEvento = (id) => {
    EventsDataService.remove(authToken,id)
      .then(response => {
        refreshList();
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  const createEvento = evento =>
    <Evento key={evento.id} evento={evento} onEdit={(ev) => {setEvento(evento);setEdit(true)}} onDelete={(ev) => deleteEvento(ev.id)} />;
  return (
    <div className="col-md-12 container">
      <div className="child">
        <Button
          variant="contained"
          color="primary"
          className={classes.root}
          startIcon={<AddIcon />}
          onClick={(ev) => { setAdd(true) }}
        >
          Add
      </Button>
        {eventos.map(createEvento)}
      </div>
      <Adder open={add} setOpen={(v)=>{refreshList();setAdd(v)}} />
      {edit&&evento?<Editer evento={evento} open={edit} setOpen={(v)=>{refreshList();setEvento();setEdit(false)}} />:<span />}
    </div>
  )
};
export default Home;