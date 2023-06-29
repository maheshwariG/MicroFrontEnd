import React from 'react';
import styles from './HomeComponent.module.css';
import Logo from '../images/logo.svg';
import Bottle from '../images/bottle.jpg';

const HomeComponent=()=>{
  return(
    <>
    <img src={Logo}/>
    <img src={Bottle}/>
    <div className={styles.heading}>Container</div>
    </>
  )
}
export default HomeComponent;
