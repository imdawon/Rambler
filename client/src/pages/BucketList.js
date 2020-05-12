import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API from '../utils/API';

function BucketList() {
    const [bucketList, setBucketList] = useState([]);

    const {id} = useParams();

    useEffect(() => {
        API.getBucketList(id)
        .then(res => setBucketList(res.data))
        .catch(err => console.log(err));
    }, []);

    
 

    return (
        <div>
        <p>BucketList</p>
        <p>{bucketList}</p>
        </div>
    );
}

export default BucketList;