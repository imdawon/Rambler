import React from 'react';
import { useStoreContext } from "../../utils/GlobalState";
import { SET_VISIBLE_INDEX, SET_PREV_INDEX, LOAD_MORE_HIKES } from "../../utils/actions";
import "./style.css";
import loading from '../../assets/loading.png'
const axios = require('axios');

function ButtonLoadMore() {
    const [state, dispatch] = useStoreContext();

    const loadMore = () => {

        dispatch({
            type: SET_PREV_INDEX,
            prevIndex: state.visibleIndex
        });

        dispatch({
            type: SET_VISIBLE_INDEX,
            visibleIndex: state.visibleIndex + 12
        });
          const moreHikesToLoad = []
        state.paginationHikes.slice(state.prevIndex, state.visibleIndex).map((hike, i) => {
            moreHikesToLoad.push(hike);
        });
        let hikesWithDetails;
        axios.post('/hikeDetails', moreHikesToLoad)
            .then(res => {
                hikesWithDetails = JSON.parse(res.config.data);
                dispatch({
                    type: LOAD_MORE_HIKES,
                    hikes: hikesWithDetails
                });
            })
            .catch(err => console.log(err));
    };

    return (
        (state.loading)
        ?
        <div>
        <button className="load_more btn card_btn" onClick={() => loadMore()}>Load More</button>
        <img id="bucketListImage" src={loading} />
        </div>
        :
        <button className="load_more btn card_btn" onClick={() => loadMore()}>Load More</button>
    );
};

export default ButtonLoadMore;

