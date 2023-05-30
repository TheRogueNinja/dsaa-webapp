import React from 'react';

function Battery() {
    return (<>
        <span>
            <img src={`${process.env.PUBLIC_URL}/car-battery.png`}
                alt='battery'
                style={{ width: 'auto', height: '1em', verticalAlign: 'middle' }}
            ></img>
        </span>
    </>)
}

export default Battery;