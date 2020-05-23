import React from 'react';
import "./style.css"

function ButtonBucketAdd(props) {

    return (
        (props.detail)
            ?
            <button id="detailButton" className=" bucket-add button is-success is-light" {...props}>
                <span id="bucket-icon"class=" bucket icon is-small">
                    <i class="fa fa-fill"></i>
                </span>
                <span>Add to Bucket List </span>
            </button>
            :
            <button className="bucket-add btn card_btn " {...props}>
                Add to Bucket List</button>
    );
};

export default ButtonBucketAdd;
