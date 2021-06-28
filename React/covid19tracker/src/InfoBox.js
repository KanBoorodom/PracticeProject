//rfce snip
import React from 'react'
import {Card,CardContent,Typography} from '@material-ui/core'
import './InfoBox.css'                  //any other props
function Infobox({title,cases,active,total,isRed,...props }) {
    return (
        <Card  //use __ for changing element and -- for modification of element
        onClick = {props.onClick}
        className={`infoBox ${active && 'infoBox--selected'} 
                    ${isRed && 'infoBox--red'}`}>
            <CardContent>
                <Typography 
                    className='infoBox__title'
                    color='textSecondary'>
                    {title}
                </Typography>
                <h2 
                    className={`infoBox__cases ${!isRed && 'infoBox__cases--green'}`}
                >
                    {cases}
                </h2>
                <Typography 
                    className='infoBox__total'
                    color='textSecondary'>
                    {total} Total
                </Typography>
            </CardContent>
        </Card>
    )
    
}

export default Infobox


