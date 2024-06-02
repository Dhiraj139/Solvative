import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchPlaces = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    const fetchPlaces = async () => {
      setIsLoading(true);
      try {
        const options = {
          method: "GET",
          url: "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
          params: { countryIds: "IN", namePrefix: searchTerm, limit },
          headers: {
            "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
            "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_KEY,
          },
        };

        const response = await axios.request(options);
        setPlaces(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (searchTerm) {
      fetchPlaces();
    } else {
      setPlaces([]);
    }
  }, [searchTerm, limit]);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setSearchTerm(e.target.value);
    }
  };

  const handleLimitChange = (e) => {
    const newLimit = parseInt(e.target.value, 10);
    if (newLimit >= 1 && newLimit <= 10) {
      setLimit(newLimit);
    } else {
      alert("Limit should be between 1 and 10");
    }
  };

  const indexOfLastPlace = currentPage * itemsPerPage;
  const indexOfFirstPlace = indexOfLastPlace - itemsPerPage;
  const currentPlaces = places.slice(indexOfFirstPlace, indexOfLastPlace);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search places..."
          onKeyDown={handleSearch}
          style={{
            width: "241px",
            height: "38px",
            fontSize: "16px",
            backgroundColor: "rgb(255, 255, 255)",
            borderColor: "rgb(206, 212, 218)",
            paddingTop: "6px",
            paddingBottom: "6px",
            paddingLeft: "12px",
            borderRadius: "4px",
          }}
        />
        <span
          style={{
            fontSize: "12px",
            borderColor: "rgb(222, 226, 230)",
            borderRadius: "2px",
            height: "24px",
            paddingLeft: "4px",
            paddingRight: "4px",
          }}
        >
          Ctrl + /
        </span>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Place Name</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="3">
                  <div>Loading...</div>
                </td>
              </tr>
            ) : places.length === 0 ? (
              <tr>
                <td colSpan="3">
                  {searchTerm ? "No result found" : "Start searching"}
                </td>
              </tr>
            ) : (
              currentPlaces.map((place, index) => (
                <tr key={place.id}>
                  <td>{indexOfFirstPlace + index + 1}</td>
                  <td>{place.name}</td>
                  <td>
                    <img
                      src={`https://www.countryflagsapi.com/png/${place.countryCode.toLowerCase()}`}
                      alt={place.country}
                      style={{ width: "24px", height: "16px" }}
                    />
                    {place.country}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div>
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={places.length}
            currentPage={currentPage}
            paginate={paginate}
          />
          <input
            type="number"
            min="1"
            max="10"
            value={limit}
            onChange={handleLimitChange}
            style={{ marginLeft: "10px" }}
          />
        </div>
      </div>
    </div>
  );
};

const Pagination = ({ itemsPerPage, totalItems, currentPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul>
        {pageNumbers.map((number) => (
          <li key={number}>
            <a
              href="#"
              onClick={() => paginate(number)}
              style={{
                backgroundColor: currentPage === number ? "lightgray" : "",
              }}
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SearchPlaces;
