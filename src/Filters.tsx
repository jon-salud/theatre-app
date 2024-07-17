import React from 'react';
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
  setSelectedDoctor: React.Dispatch<React.SetStateAction<string>>; // Add this line
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSpecialtyChange: (event: React.ChangeEvent<HTMLSelectElement>) => void; // Add this line
  doctorSearchResults: string[];
  clearFilters: () => void;
}

const Filters: React.FC<FiltersProps> = ({
  selectedHospital, selectedTheater, selectedOperatingRoom, selectedSpecialty, selectedDoctor,
  setSelectedHospital, setSelectedTheater, setSelectedOperatingRoom, setSelectedSpecialty,
  setSelectedDoctor, handleSearchChange, handleSpecialtyChange, // Add this line
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
      <input id="doctor-input" type="text" value={selectedDoctor} onChange={handleSearchChange} />
      {doctorSearchResults.length > 0 && (
        <ul className="doctor-search-results">
          {doctorSearchResults.map((doctor: string, index: number) => (
            <li key={index} onClick={() => setSelectedDoctor(doctor)}>
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
