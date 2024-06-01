import './modalPopup.css';
function ModalPopup({ propsItem, isOpen, closeModal }) {
    return (
        <>
            {isOpen &&
                   <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close-button" onClick={closeModal}>&times;</span>
                            <img className="image" src={propsItem.flag} alt={propsItem.flag} />
                            <p>Country Name: {propsItem.countryName}</p>
                            <p>Country Code two Digit:  {propsItem.twoCharacterCountryCode}</p>
                            <p>Country Code three Digit:  {propsItem.threeCharacterCountryCode}</p>
                            <p>Country Native Name:  {Object.keys(propsItem.nativeCountryName)[0]}</p>
                            <p>Alternative Country Name: {propsItem.alternativeCountryName[0]} </p>
                            <p>Country Code:  {propsItem.countryCallingCode.suffixes[0]}</p>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}


export default ModalPopup;
