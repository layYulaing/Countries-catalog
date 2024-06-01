import './App.css';
import React, { useState, useEffect } from 'react';
import ModalPopup from "../src/component/modalPopup"
function App() {
    const [countryData, setCountryData] = useState([]);
    const [query, setQuery] = useState("");
    const [filteredItems, setFilteredItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [isOpenModal, setOpenModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);


    useEffect(() => {
        let tempData = [];
        fetch('https://restcountries.com/v3.1/all')
            .then(response => response.json())
            .then((data) => {
                data.forEach((item, index) => {
                    const { name, flags, cca2, cca3, idd, altSpellings } = item;
                    tempData.push({
                        id: index + 1,
                        countryName: name.common,
                        flag: flags.png,
                        twoCharacterCountryCode: cca2,
                        threeCharacterCountryCode: cca3,
                        nativeCountryName: name.nativeName,
                        alternativeCountryName: altSpellings,
                        countryCallingCode: idd
                    });
                });
                setCountryData(tempData);
            });
    }, []);

    useEffect(() => {
        const dataSort = [...countryData].sort((a, b) => a.countryName.localeCompare(b.countryName));
        const lowerCaseQuery = query.toLowerCase();
        const filtered = dataSort.filter(item => item.countryName.toLowerCase().includes(lowerCaseQuery));
        setFilteredItems(filtered);
        setCurrentPage(1);
    }, [countryData, query]);

    const calculateTotalPages = () => {
        return Math.ceil(filteredItems.length / itemsPerPage);
    };

    const displayedItems = () => {
        const startingIndex = (currentPage - 1) * itemsPerPage;
        const endingIndex = startingIndex + itemsPerPage;
        return filteredItems.slice(startingIndex, endingIndex);
    };

    const handleNextPage = () => {
        if (currentPage < calculateTotalPages()) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const openModalDetail = (item) => {
        setSelectedItem(item);
        setOpenModal(true);
    };

    return (
        <>
            <div className="search-bar-wrapper">
                <input
                    type="text"
                    name="searchBar"
                    className="input-bar"
                    maxLength={30}
                    placeholder='Search..'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>
         <div className='container'>
            
         <div className="list-wrapper">
      
                {displayedItems().map((item) => (
                 <div className='row'> 
                      <div className='col-3'>
                      <div className='card'>
                         <div key={item.id} className="list-item">
                        <div className="list-picture">
                            <img src={item.flag} alt={item.countryName} />
                        </div>
                        <div className="list-name">
                            <p onClick={() => openModalDetail(item)}>{item.countryName}</p>
                        </div>
                       </div>
                      </div>
                      </div>
                 </div>
                ))}
                     <ModalPopup
                        propsItem={selectedItem}
                        isOpen={isOpenModal}
                        closeModal={() => setOpenModal(false)}
                    />
                   <div className="pagination">
                    <button className='btn-prev' onClick={handlePrevPage}><img src="/src/assets/back-icon.svg" alt="back-icon" /></button>
                    {[...Array(calculateTotalPages()).keys()].map(page => (
                        <span key={page} className={`paginate ${page + 1 === currentPage ? 'paginate-active' : ''}`} onClick={() => setCurrentPage(page + 1)}>{page + 1}</span>
                    ))}
                    <button className='btn-next' onClick={handleNextPage}><img src="/src/assets/next-icon.svg" alt="next-icon" /></button>
                </div>
            </div>

         </div>
        </>
    );
}

export default App;
