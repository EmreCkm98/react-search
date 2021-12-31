import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import './Result.css';
import logo from '../../assets/tesodev.png';
import Pagination from '../../helpers/Pagination';

function Result() {
  const [searchedAllName, setSearchedAllName] = useState([]);

  const location = useLocation();
  const { from } = location.state;
  console.log(from.searchedName[0]);

  useEffect(() => {
    from.searchedName.forEach((item) => {
      setSearchedAllName((prevState) => [...prevState, item]);
      console.log(item);
    });
  }, [from.searchedName]);

  const handlerOrder = () => {
    var e = document.getElementById('order');
    var strOrder = e.options[e.selectedIndex].text;
    console.log(strOrder);
    const sorted = [...searchedAllName];
    console.log(sorted);
    if (strOrder === 'Name ascending') {
      sorted.sort((a, b) => {
        var nameA = a.fullName.toUpperCase(); // ignore upper and lowercase
        var nameB = b.fullName.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      });
      setSearchedAllName(sorted);
    } else if (strOrder === 'Name descending') {
      //sorted.sort((a, b) => a.fullName - b.fullName).reverse();
      sorted
        .sort((a, b) => {
          var nameA = a.fullName.toUpperCase(); // ignore upper and lowercase
          var nameB = b.fullName.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          // names must be equal
          return 0;
        })
        .reverse();
      setSearchedAllName(sorted);
    } else if (strOrder === 'Year ascending') {
      sorted.sort((a, b) => a.date - b.date);
      setSearchedAllName(sorted);
    } else if (strOrder === 'Year descending') {
      sorted.sort((a, b) => a.date - b.date).reverse();
      setSearchedAllName(sorted);
    }
  };

  return (
    <div>
      <div>
        <img className="Logo" src={logo} alt="tesodev" />
        <form>
          <input className="Input" type="text" name="search" />
          <input type="submit" value="Search" className="Button" />
        </form>
      </div>
      <div style={{ position: 'absolute', left: '800px', top: '100px' }}>
        <select id="order" onChange={handlerOrder}>
          <option value="Rede" selected="selected">
            Order By
          </option>
          <option value="NameAsc">Name ascending</option>
          <option value="NameDsc">Name descending</option>
          <option value="YearAsc">Year ascending</option>
          <option value="YearDsc">Year descending</option>
        </select>
      </div>
      <div className="ResultSearchList">
        <div className="SearchedList">
          <Pagination data={searchedAllName} pageLimit={5} dataLimit={10} />
        </div>
      </div>
    </div>
  );
}

export default Result;
