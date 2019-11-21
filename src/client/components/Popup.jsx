import React from 'react';

const Popup = (props) => {
  if (props.isPopupActive) {
    return (
      <div className="overlay">
        <div className="popup">
          {props.children}
        </div>
      </div>
    );
  }
  return null;
};

export default Popup;
