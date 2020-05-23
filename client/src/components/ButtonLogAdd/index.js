import React from 'react';
import "./style.css"

function ButtonLogAdd(props) {

    return (
        (props.detail)
        ?
        <button id="detailButton" className="log-add button is-success is-light"  {...props}>
            <span id="log-icon" class="icon is-small">
                <i class="fa fa-book-open"></i>
            </span>
            <span>Add to Log</span>
        </button>
        :
         <button className="log-add btn card_btn " {...props}>
            Add to Log</button>
    );
};

export default ButtonLogAdd;

