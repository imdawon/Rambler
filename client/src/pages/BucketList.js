import React, { useEffect } from "react";
import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_BUCKETLIST } from "../utils/actions";
import API from '../utils/API';
import BucketResults from "../components/BucketResults";

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
            <p>BucketList</p>
            <BucketResults />
        </div>
        :
        <h3>You don't have any hikes in your bucket list.</h3>
    )
}

export default BucketList;
