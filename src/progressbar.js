import React from "react";

const ProgressBar = (props) => {
    const { bgcolor, completed } = props;
  
    const containerStyles = {
      height: 30,
      width: '50%',
      backgroundColor: "#e4e4e4",
      borderRadius: 50,
      margin: '0 0 0 130px',
      boxShadow: "1px 1px 2px 2px #d4d4d4"
      
    }
  
    const fillerStyles = {
      height: '100%',
      width: `${completed}%`,
      backgroundColor: bgcolor,
      borderRadius: 'inherit',
      textAlign: 'right'
    }
  
  
    return (
      <div style={containerStyles}>
        <div style={fillerStyles}>
          
        </div>
      </div>
    );
  };
  
  export default ProgressBar;