import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
// import { CardActionArea } from '@mui/material';
import { Button, CardActionArea, CardActions } from '@mui/material';

export default function Plantcard(props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.plant.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ${props.plant.price}
          </Typography>
        </CardContent>
        <CardActions>
        <Button size="small" color="primary">
          Buy now
        </Button>
      </CardActions>
      <CardActions>
      <Typography variant="body2" color="text.secondary">
            ${props.plant.price}
          </Typography>
      </CardActions>
      </CardActionArea>
    </Card>
  );
}