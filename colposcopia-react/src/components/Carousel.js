import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button, Container, CssBaseline } from '@mui/material'


export default function CarouselView(props)
{
    var items = [
        {
            url: "./img/slide/slide-1.jpeg",
            description: "Colposcopia",
            button: 'Iniciar Estudio'
        },
        {
            url: "./img/slide/slide-2.jpeg",
            description: "Pacientes",
            button: 'Registrar Paciente'
        },
        {
            url: "./img/slide/slide-3.jpeg",
            description: "Agenda",
            button: 'Consultar'
        }
    ]

    return (
        <Carousel>
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
    )
}

function Item(props)
{
    return (
        <React.Fragment>
        <CssBaseline />
            <Container maxWidth="md">
                <Paper>
                    <div className="flex flex-col justify-center mt-12">                
                    <img src={props.item.url}></img>
                        <h4 className='text-center'>{props.item.description}</h4>
                    <Button className="CheckButton">
                        {props.item.button}
                    </Button>
                    </div>                 
                </Paper>
        </Container>
      </React.Fragment>
    )
}
