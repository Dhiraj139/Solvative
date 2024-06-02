import React, { useState, useEffect, useRef } from "react";
import SearchBox from "./components/searchBox";
import Table from "./components/Table";
import Pagination from "./components/Pagination";
import Spinner from "./components/Spinner";
import { fetchCities } from "./services/api";
import "./App.css";

const App = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(5);
  const [loading, setLoading] = useState(false);
  const searchBoxRef = useRef(null);

  const handleSearch = async (searchQuery) => {
    setQuery(searchQuery);
    setCurrentPage(1);
    fetchData(searchQuery, 1, limit);
  };

  const fetchData = async (searchQuery, page, limit) => {
    setLoading(true);
    try {
      const response = await fetchCities({
        namePrefix: searchQuery,
        offset: (page - 1) * limit,
        limit: limit,
      });
      setData(response.data);
      setTotalPages(Math.ceil(response.metadata.totalCount / limit));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      fetchData(query, currentPage, limit);
    }
  }, [currentPage, limit, query]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleLimitChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (value > 0 && value <= 10) {
      setLimit(value);
    } else {
      alert("Please enter a value between 1 and 10.");
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "/") {
        event.preventDefault();
        searchBoxRef.current.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="app">
      <SearchBox onSearch={handleSearch} ref={searchBoxRef} />
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Table data={data} />
          {data && (
            <div className="pagination-controls">
              <input
                type="number"
                value={limit}
                onChange={handleLimitChange}
                className="limit-input"
                placeholder="Limit"
                min="1"
                max="10"
              />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                data={data}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;
