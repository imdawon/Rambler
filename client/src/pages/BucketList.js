import React, { useEffect } from "react";
import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_BUCKETLIST } from "../utils/actions";
import API from '../utils/API';
import BucketResults from "../components/BucketResults";
import takeAHike from "../assets/takeAHike.png";
import bucket from "../assets/bucket.jpg";

function BucketList() {
    const [state, dispatch] = useStoreContext();


    useEffect(() => {
        generateBucketListData();
    }, []);

    useEffect(() => {
        console.log(state.bucketList)
    }, [state]);

    const generateBucketListData = () => {
        API.getUserList(state.googleId)
            .then((hikes) => {
                let bucketListHikes = hikes.data.bucketlist
                dispatch({
                    type: UPDATE_BUCKETLIST,
                    bucketList: bucketListHikes
                });
            })
            .catch(err => console.log(err));
    };

    return (
        (state.bucketList.length > 0) 
        ? 
        <div>
            <img id="bucketListImage" src={bucket} />
            <BucketResults />
        </div>
        :
        <div>
        <h2>Add some hikes to your bucketlist!</h2>
        <img id="emptyLog" src={takeAHike} />
        </div>
    )
}

export default BucketList;
