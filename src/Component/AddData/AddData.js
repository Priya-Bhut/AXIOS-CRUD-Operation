import React, { useState, useEffect } from "react";
import "./AddData.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddData() {
  const reDirect = useNavigate();
  const [error, setError] = useState({
    fnameErrorMsg: "",
    lnameErrorMsg: "",
    ageErrorMsg: "",
    addressErrorMsg: "",
  });
  const [dataValue, setDataValue] = useState({
    firstName: "",
    lastName: "",
    age: "",
    address: "",
    gender: "",
    hobbies: [],
  });

  //console.log(dataValue);
  const changeField = (e, isCheckbox) => {
    const hobbies = dataValue.hobbies;
    const { name, value } = e.target;
    switch (name) {
      case "firstName":
        error.fnameErrorMsg =
          value.length < 3 ? "First Name must be 3 characters long!" : "";
        break;
      case "lastName":
        error.lnameErrorMsg =
          value.length < 3 ? "Last Name must be 3 characters long!" : "";
        break;
      case "age":
        error.ageErrorMsg = value.match(/^([0-9]{2}|100)$/)
          ? ""
          : "Enter Valid Age";
        break;
      case "address":
        error.addressErrorMsg = value.match(/^([a-zA-z0-9/\\' '(),-\s]{2,10})$/)
          ? ""
          : "Enter the address up to 240 characters.";
        break;
      default:
        break;
    }
    setError((prevState) => ({ ...prevState, [name]: value }));

    console.log(error);

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

  const sendData = () => {
    if (
      dataValue.firstName !== "" &&
      dataValue.lastName !== "" &&
      dataValue.age !== "" &&
      dataValue.address !== "" &&
      dataValue.gender !== "" &&
      dataValue.hobbies !== ""
    ) {
      axios
        .post(`https://62024b29b8735d00174cb98f.mockapi.io/User`, dataValue)
        .then((response) => {
          reDirect("/ReadData");
        });
    } else {
      alert("Please Enter Details...");
    }
  };
  return (
    <form>
      <div className="main-div">
        <div id="main-registration-container">
          <div id="register">
            <h2>ADD DATA</h2>
            <div className="user-box">
              <input
                type="text"
                name="firstName"
                required
                value={dataValue.firstName}
                onChange={changeField}
              />
              <label>FirstName</label>
              <div className="errors">{error.fnameErrorMsg}</div>
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
              <div className="errors">{error.lnameErrorMsg}</div>
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
              <div className="errors">{error.ageErrorMsg}</div>
            </div>
            <div className="user-box">
              <textarea
                name="address"
                required
                value={dataValue.address}
                onChange={changeField}
              ></textarea>
              <label>Address</label>
              <div className="errorAddress">{error.addressErrorMsg}</div>
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
                onChange={changeField}
              ></input>
              <label>Male</label>
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
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
                checked={dataValue.hobbies.play}
                onChange={(e) => changeField(e, true)}
              />
              <label htmlFor="play">Playing</label>
              <input
                type="checkbox"
                id="sing"
                name="sing"
                value="Singing"
                checked={dataValue.hobbies.sing}
                onChange={(e) => changeField(e, true)}
              ></input>
              <label htmlFor="sing">Singing</label>
              <input
                type="checkbox"
                id="dance"
                name="dance"
                value="Dancing"
                checked={dataValue.hobbies.dance}
                onChange={(e) => changeField(e, true)}
              ></input>
              <label htmlFor="dance">Dancing</label>
              <input
                type="checkbox"
                id="read"
                name="read"
                value="Reading"
                checked={dataValue.hobbies.read}
                onChange={(e) => changeField(e, true)}
              ></input>
              <label htmlFor="read">Reading</label>
            </div>
            <br />
            <div className="submit">
              <input
                type="submit"
                className="button"
                value="Add"
                onClick={sendData}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
