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
import Axios from 'axios';
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
        backgroundColor: '#70a3b9',
        padding: ".285rem .815rem",
        border: "1px solid teal",
        borderRadius: ".25rem",
        fontSize: "1rem",
        lineHeight: 1.5,

    }, button2: {
        backgroundColor: '#00ff68',
        padding: ".285rem .815rem",
        border: "1px solid teal",
        borderRadius: ".25rem",
        fontSize: "1rem",
        lineHeight: 1.5,
    },
    button1: {
        backgroundColor: '#ff7f00',
        padding: ".285rem .815rem",
        border: "1px solid teal",
        borderRadius: ".25rem",
        fontSize: "1rem",
        lineHeight: 1.5,

    }, gridbox: {
        border: '2px solid #d3d3d3',
        borderRadius: '5px',
    },
    button3: {
        backgroundColor: '#cbff00',
        padding: ".285rem .815rem",
        border: "1px solid teal",
        borderRadius: ".25rem",
        fontSize: "1rem",
        lineHeight: 1.5,

    },
    button5: {
        backgroundColor: '#dcb8d8',
        padding: ".285rem .815rem",
        border: "1px solid teal",
        borderRadius: ".25rem",
        fontSize: "1rem",
        lineHeight: 1.5,

    },
    button6: {
        backgroundColor: '#4a763a',
        padding: ".285rem .815rem",
        border: "1px solid teal",
        borderRadius: ".25rem",
        fontSize: "1rem",
        lineHeight: 1.5,

    },
    button7: {
        backgroundColor: '#bbb276',
        padding: ".285rem .815rem",
        border: "1px solid teal",
        borderRadius: ".25rem",
        fontSize: "1rem",
        lineHeight: 1.5,

    },

}));



export default function Selectroom({ Getroomnuber, CheckIn, CheckOut }) {
    const [roomnumber, setroomnumber] = useState([]);
    const [floor, setfloor] = useState([2, 3]);
    const [tiers, settiers] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        Axios.post('http://localhost:5000/reservation/getroom', {
            Check_In: CheckIn,
            Check_Out: CheckOut,
        }).then((response) => {
            settiers(response.data);
        });
        console.log(tiers);

    }, []);

    const handleChange = (event, newValue) => {
        setfloor(newValue);
    };

    const selectroombutton = (data) => {

        if (roomnumber.indexOf(data) > -1) {
            roomnumber.splice(roomnumber.indexOf(data), 1)
        } else {
            roomnumber.push(data)
            setroomnumber(roomnumber);
            Getroomnuber(roomnumber)
        }
    };


    function getbutton(tier, floor) {
        if (floor[0] <= tier.floor && floor[1] >= tier.floor) {
            switch (tier.type) {

                case 'Single':
                    if (tier.res) {
                        return (
                            <Grid className={classes.buttongrid}>
                                <button className={classes.button1} disabled>
                                    {tier.title}
                                </button>
                            </Grid>
                        )
                        break;
                    } else {
                        return (
                            <Grid className={classes.buttongrid} >
                                <button className={classes.button1} onClick={() => selectroombutton(tier.title)}>
                                    {tier.title}
                                </button>
                            </Grid>
                        )
                        break;
                    }

                case 'Twin':
                    if (tier.res) {
                        return (
                            <Grid className={classes.buttongrid} >
                                <button className={classes.button2} disabled>
                                    {tier.title}
                                </button>
                            </Grid>
                        )
                        break;
                    } else {
                        return (
                            <Grid className={classes.buttongrid} >
                                <button className={classes.button2} onClick={() => selectroombutton(tier.title)}>
                                    {tier.title}
                                </button>
                            </Grid>
                        )
                        break;
                    }
                case 'Double':
                    if (tier.res) {
                        return (
                            <Grid className={classes.buttongrid} >
                                <button className={classes.button3} disabled>
                                    {tier.title}
                                </button>
                            </Grid>
                        )
                        break;
                    } else {
                        return (
                            <Grid className={classes.buttongrid} >
                                <button className={classes.button3} onClick={() => selectroombutton(tier.title)}>
                                    {tier.title}
                                </button>
                            </Grid>
                        )
                        break;
                    }
                case 'Triple':
                    if (tier.res) {
                        return (
                            <Grid className={classes.buttongrid} >
                                <button className={classes.button4} disabled>
                                    {tier.title}
                                </button>
                            </Grid>
                        )
                        break;
                    } else {
                        return (
                            <Grid className={classes.buttongrid} >
                                <button className={classes.button4} onClick={() => selectroombutton(tier.title)}>
                                    {tier.title}
                                </button>
                            </Grid>
                        )
                        break;
                    }
                case 'Derux_Twin':
                    if (tier.res) {
                        return (
                            <Grid className={classes.buttongrid} >
                                <button className={classes.button5} disabled>
                                    {tier.title}
                                </button>
                            </Grid>
                        )
                        break;
                    } else {
                        return (
                            <Grid className={classes.buttongrid} >
                                <button className={classes.button5} onClick={() => selectroombutton(tier.title)}>
                                    {tier.title}
                                </button>
                            </Grid>
                        )
                        break;
                    }
                case 'Ondol':
                    if (tier.res) {
                        return (
                            <Grid className={classes.buttongrid} >
                                <button className={classes.button6} disabled >
                                    {tier.title}
                                </button>
                            </Grid>
                        )
                        break;
                    } else {
                        return (
                            <Grid className={classes.buttongrid} >
                                <button className={classes.button6} onClick={() => selectroombutton(tier.title)}>
                                    {tier.title}
                                </button>
                            </Grid>
                        )
                        break;
                    }
                case 'Sweet':
                    if (tier.res) {
                        return (
                            <Grid className={classes.buttongrid} >
                                <button className={classes.button7} disabled>
                                    {tier.title}
                                </button>
                            </Grid>
                        )
                        break;
                    } else {
                        return (
                            <Grid className={classes.buttongrid} >
                                <button className={classes.button7} onClick={() => selectroombutton(tier.title)}>
                                    {tier.title}
                                </button>
                            </Grid>
                        )
                        break;
                    }


            }
        }
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm" component="main" className={classes.heroContent}>
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    Select Room
                </Typography>
            </Container>
            <Grid container>
                <Grid item xs={12}>
                    <Slider
                        value={floor}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        step={1}
                        min={2}
                        max={8}
                        aria-labelledby="range-slider"
                    />
                    <div style={{ minHeight: 35 }}></div>
                </Grid>
                <Grid container className={classes.gridbox} item xs={12} >
                    {tiers.map((tier) => (
                        getbutton(tier, floor)
                    ))}
                </Grid>
            </Grid>
        </React.Fragment>
    );
}