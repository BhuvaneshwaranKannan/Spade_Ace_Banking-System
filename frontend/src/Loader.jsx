import React from 'react';

const Loader = ({ color = "#df7000", text = "" }) => {
    return (
        <div className="custom-loader-container">
            <div className="custom-loader-spinner" style={{ borderTopColor: color, borderLeftColor: color }}></div>
            {text && <div className="custom-loader-text" style={{ color: color }}>{text}</div>}
        </div>
    );
};

export default Loader;
