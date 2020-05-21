import React from 'react';

function ButtonLogAdd(props) {

    return (
        (props.detail)
        ?
        <button id="detailButton" className="log-add button is-success is-light"  {...props}>
            <span class="icon is-small">
                <i class="fa fa-check"></i>
            </span>
            <span>Add to Log</span>
        </button>
        :
         <button className="btn log-add button " {...props}>
            Add to Log</button>
    );
};

export default ButtonLogAdd;

