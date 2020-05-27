import React, { useEffect } from 'react';
import { useStoreContext } from "../../utils/GlobalState";
import { SET_VISIBLE_INDEX, SET_PREV_INDEX, LOAD_MORE_HIKES } from "../../utils/actions";
const axios = require('axios');

function ButtonLoadMore(props) {
    const [state, dispatch] = useStoreContext();
    
    useEffect(() => {
        console.log("Hikes loaded!")
    }, [state.paginationHikes]);

    const loadMore = () => {
        
        dispatch({
            type: SET_PREV_INDEX,
            prevIndex: state.visibleIndex
        });

        dispatch({
            type: SET_VISIBLE_INDEX,
            visibleIndex: state.visibleIndex + 12
        });
        gatherDataPaginationHikes();
    }; 

    const gatherDataPaginationHikes = () => {
        const moreHikesToLoad = []
        state.paginationHikes.slice(state.prevIndex, state.visibleIndex).map((hike, i) => {  
                moreHikesToLoad.push(hike);
        });
                let hikesWithDetails;
                axios.post('/hikeDetails', moreHikesToLoad)
                .then(res => {
                    console.log(res.config.data)
                    hikesWithDetails = JSON.parse(res.config.data);
                    console.log("!!!",hikesWithDetails);
                    dispatch({
                        type: LOAD_MORE_HIKES,
                        hikes: hikesWithDetails
                    });
                })
                .catch(err => console.log(err));
    };

    return (
        <button className="btn card_btn" onClick={() => loadMore()}>Load More</button>
    );
};

export default ButtonLoadMore;

