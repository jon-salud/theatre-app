// src\components\Filters.tsx

import React from 'react';
import { hospitalData } from '../data/data';

interface FiltersProps {
  selectedHospital: string;
  selectedTheatre: string;
  selectedOperatingRoom: string;
  selectedSpecialty: string;
  selectedDoctor: string;
  setSelectedHospital: React.Dispatch<React.SetStateAction<string>>;
  setSelectedTheatre: React.Dispatch<React.SetStateAction<string>>;
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
  selectedHospital, selectedTheatre, selectedOperatingRoom, selectedSpecialty, selectedDoctor,
  setSelectedHospital, setSelectedTheatre, setSelectedOperatingRoom, setSelectedSpecialty,
  setSelectedDoctor, handleSearchChange, handleSpecialtyChange, handleDoctorSelect,
  doctorSearchResults, clearFilters
}) => (
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
      <label htmlFor="theatre-select">Theatre: </label>
      <select id="theatre-select" onChange={(e) => setSelectedTheatre(e.target.value)} value={selectedTheatre} disabled={!selectedHospital && !selectedDoctor && !selectedSpecialty}>
        <option value="">All</option>
        {selectedHospital && Object.keys(hospitalData[selectedHospital]).map(theatre => (
          <option key={theatre} value={theatre}>{theatre}</option>
        ))}
      </select>
    </div>
    <div className="filter-item">
      <label htmlFor="operating-room-select">Operating Room: </label>
      <select id="operating-room-select" onChange={(e) => setSelectedOperatingRoom(e.target.value)} value={selectedOperatingRoom} disabled={!selectedTheatre && !selectedDoctor && !selectedSpecialty}>
        <option value="">All</option>
        {selectedTheatre && Object.keys(hospitalData[selectedHospital][selectedTheatre]).map(room => (
          <option key={room} value={room}>{room}</option>
        ))}
      </select>
    </div>
    <div className="filter-item">
      <label htmlFor="specialty-select">Specialty: </label>
      <select id="specialty-select" onChange={handleSpecialtyChange} value={selectedSpecialty}>
        <option value="">All</option>
        {Object.keys(hospitalData).flatMap(hospital =>
          Object.keys(hospitalData[hospital]).flatMap(theatre =>
            Object.keys(hospitalData[hospital][theatre]).flatMap(operatingRoom =>
              Object.keys(hospitalData[hospital][theatre][operatingRoom])
            )
          )
        ).filter((value, index, self) => self.indexOf(value) === index).map(specialty => (
          <option key={specialty} value={specialty}>{specialty}</option>
        ))}
      </select>
    </div>
    <div className="filter-item">
      <label htmlFor="doctor-input">Doctor: </label>
      <input id="doctor-input" type="text" value={selectedDoctor} onChange={handleSearchChange} />
      {doctorSearchResults.length > 0 && (
        <ul className="doctor-search-results">
          {doctorSearchResults.map((doctor: string, index: number) => (
            <li key={index} onClick={() => handleDoctorSelect(doctor)}>
              {doctor}
            </li>
          ))}
        </ul>
      )}
    </div>
    <button className="clear-button" onClick={clearFilters}>Clear Filters</button>
  </div>
);

export default Filters;
