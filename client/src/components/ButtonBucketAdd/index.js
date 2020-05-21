import React from 'react';

function ButtonBucketAdd(props) {

    return (
        (props.detail)
        ?
        <button id="detailButton" className="btn bucketlist-add button is-success is-light" {...props}>
            <span class="icon is-small">
                <i class="fa fa-check"></i>
            </span>
            <span>Add to Bucket List</span></button>
        :
        <button className="btn bucketlist-add button " {...props}>
            Add to Bucket List</button>
    );
};

export default ButtonBucketAdd;

