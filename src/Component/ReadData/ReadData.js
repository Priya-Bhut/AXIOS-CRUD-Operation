import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ReadData.css";
import { Link } from "react-router-dom";

export const ReadData = () => {
  const [apiData, setApiData] = useState([]);
  useEffect(async () => {
    await axios
      .get("https://62024b29b8735d00174cb98f.mockapi.io/User")
      .then((getData) => {
        setApiData(getData.data);
      });
  }, []);
  const setId = (id) => {
    console.log(id);
    console.log(apiData);
    // localStorage.setItem("ID", id);
  };

  const getData = () => {
    axios
      .get("https://62024b29b8735d00174cb98f.mockapi.io/User")
      .then((getData) => {
        setApiData(getData.data);
      });
  };
  const onDelete = (id) => {
    if (window.confirm("Are you sure.. you want to Delete?")) {
      axios
        .delete(`https://62024b29b8735d00174cb98f.mockapi.io/User/${id}`)
        .then(() => {
          getData();
        });
    }
  };
  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Age</th>
            <th>Address</th>
            <th>Gender</th>
            <th>Hobbies</th>
          </tr>
        </thead>
        <tbody>
          {apiData.map((data, index) => {
            return (
              <tr key={index}>
                <td>{data.id}</td>
                <td>{data.firstName}</td>
                <td>{data.lastName}</td>
                <td>{data.age}</td>
                <td>{data.address}</td>
                <td>{data.gender}</td>
                <td>{data.hobbies.join(",")}</td>
                <td>
                  <Link to={`/UpdateData/${data.id}`}>
                    <button
                      type="button"
                      className="update"
                      onClick={() => setId(index)}
                    >
                      Update
                    </button>
                  </Link>
                </td>
                <td>
                  <button
                    type="button"
                    className="delete"
                    onClick={() => onDelete(data.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
