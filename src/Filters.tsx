import React, { useState, useEffect, useRef } from 'react';
import { hospitalData } from './data'; // Ensure to import hospitalData

// Define the types for the props
interface FiltersProps {
  selectedHospital: string;
  selectedTheater: string;
  selectedOperatingRoom: string;
  selectedSpecialty: string;
  selectedDoctor: string;
  setSelectedHospital: React.Dispatch<React.SetStateAction<string>>;
  setSelectedTheater: React.Dispatch<React.SetStateAction<string>>;
  setSelectedOperatingRoom: React.Dispatch<React.SetStateAction<string>>;
  setSelectedSpecialty: React.Dispatch<React.SetStateAction<string>>;
  setSelectedDoctor: React.Dispatch<React.SetStateAction<string>>;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSpecialtyChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleDoctorSelect: (doctor: string) => void;
  doctorSearchResults: string[];
  clearFilters: () => void;
}

const Filters: React.FC<FiltersProps> = ({
  selectedHospital, selectedTheater, selectedOperatingRoom, selectedSpecialty, selectedDoctor,
  setSelectedHospital, setSelectedTheater, setSelectedOperatingRoom, setSelectedSpecialty,
  setSelectedDoctor, handleSearchChange, handleSpecialtyChange, handleDoctorSelect,
  doctorSearchResults, clearFilters
}) => {
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const focusedItemRef = useRef<HTMLLIElement | null>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (doctorSearchResults.length > 0) {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setFocusedIndex((prevIndex) => (prevIndex + 1) % doctorSearchResults.length);
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        setFocusedIndex((prevIndex) => (prevIndex === 0 ? doctorSearchResults.length - 1 : prevIndex - 1));
      } else if (event.key === 'Enter' || event.key === 'Tab') {
        event.preventDefault();
        if (focusedIndex >= 0) {
          handleDoctorSelect(doctorSearchResults[focusedIndex]);
          setFocusedIndex(-1);
        }
      }
    }
  };

  const handleDoctorClick = (doctor: string) => {
    handleDoctorSelect(doctor);
    setFocusedIndex(-1);
  };

  useEffect(() => {
    if (focusedItemRef.current) {
      focusedItemRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  }, [focusedIndex]);

  return (
    <div className="filters">
      <div className="filter-item">
        <label htmlFor="hospital-select">Hospital: </label>
        <select id="hospital-select" onChange={(e) => setSelectedHospital(e.target.value)} value={selectedHospital}>
          <option value="">All</option>
          {Object.keys(hospitalData).map(hospital => (
            <option key={hospital} value={hospital}>{hospital}</option>
          ))}
        </select>
      </div>
      <div className="filter-item">
        <label htmlFor="theater-select">Theater: </label>
        <select id="theater-select" onChange={(e) => setSelectedTheater(e.target.value)} value={selectedTheater} disabled={!selectedHospital && !selectedDoctor && !selectedSpecialty}>
          <option value="">All</option>
          {selectedHospital && Object.keys(hospitalData[selectedHospital]).map(theater => (
            <option key={theater} value={theater}>{theater}</option>
          ))}
        </select>
      </div>
      <div className="filter-item">
        <label htmlFor="operating-room-select">Operating Room: </label>
        <select id="operating-room-select" onChange={(e) => setSelectedOperatingRoom(e.target.value)} value={selectedOperatingRoom} disabled={!selectedTheater && !selectedDoctor && !selectedSpecialty}>
          <option value="">All</option>
          {selectedTheater && Object.keys(hospitalData[selectedHospital][selectedTheater]).map(room => (
            <option key={room} value={room}>{room}</option>
          ))}
        </select>
      </div>
      <div className="filter-item">
        <label htmlFor="specialty-select">Specialty: </label>
        <select id="specialty-select" onChange={handleSpecialtyChange} value={selectedSpecialty}>
          <option value="">All</option>
          {Object.keys(hospitalData).flatMap(hospital => 
            Object.keys(hospitalData[hospital]).flatMap(theater => 
              Object.keys(hospitalData[hospital][theater]).flatMap(operatingRoom => 
                Object.keys(hospitalData[hospital][theater][operatingRoom])
              )
            )
          ).filter((value, index, self) => self.indexOf(value) === index).map(specialty => (
            <option key={specialty} value={specialty}>{specialty}</option>
          ))}
        </select>
      </div>
      <div className="filter-item">
        <label htmlFor="doctor-input">Doctor: </label>
        <input
          id="doctor-input"
          type="text"
          value={selectedDoctor}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
        />
        {doctorSearchResults.length > 0 && (
          <ul className="doctor-search-results">
            {doctorSearchResults.map((doctor: string, index: number) => (
              <li
                key={index}
                className={focusedIndex === index ? 'focused' : ''}
                ref={focusedIndex === index ? focusedItemRef : null}
                onClick={() => handleDoctorClick(doctor)}
              >
                {doctor}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button className="clear-button" onClick={clearFilters}>Clear Filters</button>
    </div>
  );
};

export default Filters;
