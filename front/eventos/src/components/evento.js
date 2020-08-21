import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 420,
    marginTop: 15,
  },
  media: {
    height: 200,
  },
});

const EventCard = ({evento, onDelete, onEdit}) => { 
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={"http://172.24.98.179:8081"+evento.thumbnail}
          title={evento.event_name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {evento.event_name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
              {`Category: ${evento.event_category}`}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
              {`Place: ${evento.event_place}`}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
              {`Address: ${evento.event_address}`}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
              {`Initial date: ${new Date(evento.event_initial_date).toDateString()} ${new Date(evento.event_initial_date).toLocaleTimeString()}`}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
              {`Final date: ${new Date(evento.event_final_date).toDateString()} ${new Date(evento.event_final_date).toLocaleTimeString()}`}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
              {`Type: ${evento.event_type}`}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={()=>onEdit(evento)}>
          Edit
        </Button>
        <Button size="small" color="primary" onClick={()=>onDelete(evento)}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

export default EventCard;