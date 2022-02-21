import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const UpdateData = () => {
  const { id } = useParams();
  const reDirect = useNavigate();
  const [dataValue, setDataValue] = useState({
    firstName: "",
    lastName: "",
    age: "",
    address: "",
    gender: "",
    hobbies: [],
  });
  const hobbies = dataValue.hobbies;
  useEffect(() => {
    axios
      .get(`https://62024b29b8735d00174cb98f.mockapi.io/User/${id}`)
      .then((response) => {
        setDataValue(response.data);
      });
  }, [id]);

  const changeField = (e, isCheckbox) => {
    const hobbies = dataValue.hobbies;
    const { name, value } = e.target;
    if (isCheckbox) {
      const ischeck = e.target.checked;
      if (ischeck) {
        hobbies.push(value);
      } else {
        const index = hobbies.findIndex((e) => e === value);
        hobbies.splice(index, 1);
      }
      setDataValue((prevState) => ({ ...prevState, hobbies }));
    } else {
      setDataValue((prevState) => ({ ...prevState, [name]: value }));
    }
  };
  const updateData = (index) => {
    axios
      .put(`https://62024b29b8735d00174cb98f.mockapi.io/User/${id}`, dataValue)
      .then((response) => {
        reDirect("/ReadData");
      });
  };
  return (
    <div className="main-div">
      <div id="main-registration-container">
        <div id="register">
          <h2>UPDATE DATA</h2>
          <div className="user-box">
            <input
              type="text"
              name="firstName"
              required
              value={dataValue.firstName}
              onChange={changeField}
            />
            <label>FirstName</label>
          </div>
          <div className="user-box">
            <input
              type="text"
              name="lastName"
              required
              value={dataValue.lastName}
              onChange={changeField}
            />
            <label>LastName</label>
          </div>
          <div className="user-box">
            <input
              type="number"
              name="age"
              required
              value={dataValue.age}
              onChange={changeField}
            />
            <label>Age</label>
          </div>
          <div className="user-box">
            <textarea
              name="address"
              required
              value={dataValue.address}
              onChange={changeField}
            ></textarea>
            <label>Address</label>
          </div>
          <div className="user-box">
            <label>Gender</label>
          </div>
          <div className="radio">
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              checked={dataValue.gender === "male" ? true : false}
              onChange={changeField}
            ></input>
            <label>Male</label>
            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              checked={dataValue.gender === "female" ? true : false}
              onChange={changeField}
            ></input>
            <label>Female</label>
          </div>
          <br />
          <div className="user-box">
            <label>Hobbies</label>
          </div>
          <div className="checkbox">
            <input
              type="checkbox"
              id="play"
              name="play"
              value="Playing"
              checked={hobbies.includes("Playing")}
              onChange={(e) => changeField(e, true)}
            />
            <label htmlFor="play">Playing</label>
            <input
              type="checkbox"
              id="sing"
              name="sing"
              value="Singing"
              checked={hobbies.includes("Singing")}
              onChange={(e) => changeField(e, true)}
            ></input>
            <label htmlFor="sing">Singing</label>
            <input
              type="checkbox"
              id="dance"
              name="dance"
              value="Dancing"
              checked={hobbies.includes("Dancing")}
              onChange={(e) => changeField(e, true)}
            ></input>
            <label htmlFor="dance">Dancing</label>
            <input
              type="checkbox"
              id="read"
              name="read"
              value="Reading"
              checked={hobbies.includes("Reading")}
              onChange={(e) => changeField(e, true)}
            ></input>
            <label htmlFor="read">Reading</label>
          </div>
          <br />
          <div className="submit">
            <input
              type="submit"
              className="button"
              value="Update"
              onClick={updateData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
