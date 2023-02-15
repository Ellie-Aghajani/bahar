import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
// import { CardActionArea } from '@mui/material';
import { Button, CardActionArea, CardActions } from '@mui/material';

export default function Plantcard(props) {
  return (
    <div style={{backgroundColor :"#F2D388"}} >
      <Card style={{margin: '14px', borderRadius:'15px'}} sx={{ maxWidth: 300 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={`http://localhost:2017/uploads/${props.plant.image_url}`}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {props.plant.title}
            </Typography>
            
            {/* <Typography variant="body2" color="text.secondary">
              {props.plant.description}
            </Typography> */}
          </CardContent>
          <CardActions style={{paddingLeft:"125px"}}>
            <Button size="medium" color="primary">
              <a style={{color:"#92BA92"}} href='http://localhost:3000/customers'>${props.plant.price}</a>
            </Button>
          </CardActions>
          <CardActions style={{paddingLeft:"125px"}}>
            <Button size="medium" color="primary">
              <a style={{color:"seagreen"}} href='http://localhost:3000/customers'>Purchase 🛒</a>
            </Button>
          </CardActions>
        </CardActionArea>
      </Card>
    </div>
  );
}