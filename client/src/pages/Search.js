import React from "react";
import SearchForm from "../components/SearchForm";
import SearchResults from "../components/SearchResults";
import { useStoreContext } from "../utils/GlobalState";
import loading from "../assets/loading.png";


const Search = () => {
  const [state, dispatch] = useStoreContext();

  return (
    (state.loading)
    ?
    <div>
      <SearchForm />
      <div className="loading">
        <img  id="loading" src={loading} alt="Loading" />
      </div>
    </div>
    :
    <div>
      <SearchForm />
      <SearchResults />
    </div>
  );
}

export default Search;

