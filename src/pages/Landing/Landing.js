import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './Landing.css';
import logo from '../../assets/tesodev.png';
import mockData from '../../services/mockData';

function Landing() {
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [searchedName, setSearchedName] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    mockData.data.forEach((item) => {
      var year = item[3].slice(-4);
      let user = {
        fullName: item[0],
        country: item[4],
        city: item[5],
        email: item[2],
        date: year,
      };
      //const searched = [...searchedBooks, data];
      // setSearchedBooks(searched);
      /* setSearchedBooks((prevState) => [...prevState, data]); */
      setSearchedBooks((prevState) => [...prevState, user]);
      // console.log(item[0]);
    });
  }, []);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!searchInput) {
      return false;
    }
    searchedBooks.forEach((dat) => {
      if (dat.fullName.startsWith(searchInput) === true) {
        setSearchedName((prevState) => [...prevState, dat]);
        console.log('sa');
      } else {
        console.log('saa');
      }
    });

    /*  console.log(searchedBooks);
    searchedBooks.forEach((dat) => {
      console.log(typeof dat.fullName);
    }); */

    setSearchInput('');
  };

  return (
    <div className="Landing">
      <img className="LandLogo" src={logo} alt="tesodev" />
      <form onSubmit={handleFormSubmit}>
        <input
          className="LandInput"
          type="text"
          name="search"
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        />
        <input type="submit" value="Search" className="LandButton" />
      </form>
      <div className="SearchList">
        <div className="LandSearchedList">
          {searchedName
            .filter((i, index) => index < 3)
            .map((data, index) => {
              return (
                <div key={index}>
                  <div style={{ float: 'left' }}>
                    <label className="LandAdress">
                      {data.country} - {data.city}
                    </label>
                    <label className="LandEmail">Email: {data.email}</label>
                  </div>
                  <div style={{ float: 'left', clear: 'left' }}>
                    <label className="LandName">
                      {data.fullName} - {data.date}
                    </label>
                  </div>
                  <div className="LandLine"></div>
                </div>
              );
            })}
          {searchedName.length > 2 && (
            <Link
              to="/result"
              state={{ from: { searchedName } }}
              className="ShowButton"
            >
              Show more...
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Landing;
