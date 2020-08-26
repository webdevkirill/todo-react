import React from 'react';
import classes from './Loader.module.scss'

export const Loader = () => (
    <div className={classes.container}>
        <div className={classes.box}></div>
        <div className={classes.box}></div>
        <div className={classes.box}></div>
        <div className={classes.box}></div>
        <div className={classes.box}></div>
    </div>
)