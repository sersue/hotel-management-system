import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { PricingTable, PricingSlot, PricingDetail } from 'react-pricing-table';
import Slider from '@material-ui/core/Slider';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    }, button: {
        margin: 0,
    }, buttongrid: {
        padding: theme.spacing(1, 0.5, 1),
    }, button4: {
        backgroundColor: 'green',
        padding: ".285rem .815rem",
        border: "1px solid teal",
        borderRadius: ".25rem",
        fontSize: "1rem",
        lineHeight: 1.5,

    }, button2: {
        backgroundColor: 'red',
        padding: ".285rem .815rem",
        border: "1px solid teal",
        borderRadius: ".25rem",
        fontSize: "1rem",
        lineHeight: 1.5,
    }, button1: {
        backgroundColor: 'blue',
        padding: ".285rem .815rem",
        border: "1px solid teal",
        borderRadius: ".25rem",
        fontSize: "1rem",
        lineHeight: 1.5,
    }, gridbox: {

        border: '2px solid #d3d3d3',
        borderRadius: '5px',
    },

}));


const tiers = [
    { title: '201', type: '2', floor: 2, res: true },
    { title: '202', type: '2', floor: 2, res: true },
    { title: '203', type: '2', floor: 2, res: true },
    { title: '204', type: '2', floor: 2, res: true },
    { title: '205', type: '2', floor: 2, res: true },
    { title: '206', type: '2', floor: 2, res: true },
    { title: '207', type: '2', floor: 2, res: true },
    { title: '208', type: '2', floor: 2, res: true },
    { title: '209', type: '2', floor: 2, res: true },
    { title: '210', type: '2', floor: 2, res: true },
    { title: '211', type: '4', floor: 2, res: true },
    { title: '212', type: '4', floor: 2, res: true },
    { title: '213', type: '4', floor: 2, res: true },
    { title: '214', type: '4', floor: 2, res: false },
    { title: '215', type: '4', floor: 2, res: false },
    { title: '216', type: '4', floor: 2, res: false },
    { title: '217', type: '4', floor: 2, res: false },
    { title: '218', type: '4', floor: 2, res: false },
    { title: '219', type: '4', floor: 2, res: false },
    { title: '220', type: '4', floor: 2, res: false },



    //3
    { title: '301', type: '2', floor: 3, res: false },
    { title: '302', type: '2', floor: 3, res: false },
    { title: '303', type: '2', floor: 3, res: false },
    { title: '304', type: '2', floor: 3, res: false },
    { title: '305', type: '2', floor: 3, res: false },
    { title: '306', type: '2', floor: 3, res: false },
    { title: '307', type: '2', floor: 3, res: false },
    { title: '308', type: '2', floor: 3, res: false },
    { title: '309', type: '2', floor: 3, res: false },
    { title: '310', type: '2', floor: 3, res: false },
    { title: '311', type: '4', floor: 3, res: false },
    { title: '312', type: '4', floor: 3, res: false },
    { title: '313', type: '4', floor: 3, res: false },
    { title: '314', type: '4', floor: 3, res: false },
    { title: '315', type: '4', floor: 3, res: false },
    { title: '316', type: '4', floor: 3, res: false },
    { title: '317', type: '4', floor: 3, res: false },
    { title: '318', type: '4', floor: 3, res: false },
    { title: '319', type: '4', floor: 3, res: false },
    { title: '320', type: '4', floor: 3, res: false },


];

export default function Selectroom({ Getroomnuber, UserSelectRoomType }) {
    const [roomnumber, setroomnumber] = useState([]);
    const [floor, setfloor] = useState([2,3]);
    const classes = useStyles();

    const handleChange = (event, newValue) => {
        setfloor(newValue);
      };

    const selectroombutton = (data) => {

        if (roomnumber.indexOf(data)>-1) {
            roomnumber.splice(roomnumber.indexOf(data),1)
        }else{
            roomnumber.push(data)
            setroomnumber(roomnumber);
            Getroomnuber(roomnumber)
        }
    };

    function getbutton(tier, floor) {
        if (floor[0] <= tier.floor && floor[1] >= tier.floor) {
            switch (tier.type) {
                case '2':
                    if (tier.res) {
                        return (
                            <Grid className={classes.buttongrid} key={tier.title}>
                                <button className={classes.button2} disabled onClick={() => selectroombutton(tier.title)}>
                                    {tier.title}
                                </button>
                            </Grid>
                        )
                    } else {
                        return (
                            <Grid className={classes.buttongrid} key={tier.title}>
                                <button className={classes.button2} onClick={() => selectroombutton(tier.title)}>
                                    {tier.title}
                                </button>
                            </Grid>
                        )
                    }

                case '4':
                    if (tier.res) {
                        return (
                            <Grid className={classes.buttongrid} key={tier.title}>
                                <button className={classes.button4} disabled onClick={() => selectroombutton(tier.title)}>
                                    {tier.title}
                                </button>
                            </Grid>
                        )
                    } else {
                        return (
                            <Grid className={classes.buttongrid} key={tier.title}>
                                <button className={classes.button4} onClick={() => selectroombutton(tier.title)}>
                                    {tier.title}
                                </button>
                            </Grid>
                        )
                    }
            }
        }
    }
    function selectedroomprint(){
        return roomnumber.length +"개";
    }
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm" component="main" className={classes.heroContent}>
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    Select Room
                </Typography>
            </Container>
            <Slider
                value={floor}
                onChange={handleChange}
                valueLabelDisplay="auto"
                step={1}
                min={2}
                max={10}
                aria-labelledby="range-slider"
            />
            
            <Container maxWidth="md" component="main">

                <Grid className={classes.gridbox} container spacing={5} alignItems="flex-end">
                    {tiers.map((tier) => (
                        getbutton(tier, floor)
                    ))}
                </Grid>
                <Typography id="range-slider" gutterBottom>
                    {roomnumber.length>0 ? selectedroomprint():null}
                </Typography>
            </Container>
        </React.Fragment>
    );
}