import React, { useState, useEffect } from 'react'
import "./Button.css";

const Button = ({ content, clickHandler, clicked }) => {

    // const [ btnStyle, setBtnStyle ] = useState(defaultStyle);
    // useEffect(() => {
    // setBtnStyle(defaultStyle);  
    // }, [defaultStyle]);
    // function mouseEnterHandler(Clicked){
    //     setBtnStyle(hoverStyle);
    // }

    // function mouseLeaveHandler(){
    //     setBtnStyle(defaultStyle);
    // }

    // function mouseDownHandler(){
    //     setBtnStyle(pressStyle);
    // }
    // function mouseUpHandler(){
    //     console.log('Hi');
    //     setBtnStyle(hoverStyle);
    // }

  return (
    <button
    className= {clicked ? "active" : null}
    onClick={clickHandler}
    >{content} </ button>
  );
}

export default Button;