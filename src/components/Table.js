import React from "react";

const Table = ({ data }) => {
  if (!data) return <p className="message">Start searching</p>;
  if (data.length === 0) return <p className="message">No result found</p>;

  return (
    <table className="results-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Place Name</th>
          <th>Country</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={item.id}>
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td>
              <img
                src={`https://countryflagsapi.com/png/${item.countryCode.toLowerCase()}`}
                alt={item.countryCode}
                className="flag"
              />{" "}
              {item.country}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
