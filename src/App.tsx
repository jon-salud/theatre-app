import React, { useState, useEffect } from 'react';
import { hospitalData } from './data';
import { Assignment } from './types';
import './App.css';

const App: React.FC = () => {
  const [selectedHospital, setSelectedHospital] = useState<string>('');
  const [selectedTheater, setSelectedTheater] = useState<string>('');
  const [selectedOperatingRoom, setSelectedOperatingRoom] = useState<string>('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('');
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');
  const [filteredAssignments, setFilteredAssignments] = useState<Assignment[]>([]);
  const [doctorSearchResults, setDoctorSearchResults] = useState<string[]>([]);

  const getAssignmentsByDoctor = (doctor: string): Assignment[] => {
    const result: Assignment[] = [];
    for (const hospital in hospitalData) {
      for (const theater in hospitalData[hospital]) {
        for (const operatingRoom in hospitalData[hospital][theater]) {
          for (const specialty in hospitalData[hospital][theater][operatingRoom]) {
            if (hospitalData[hospital][theater][operatingRoom][specialty].includes(doctor)) {
              result.push({ hospital, theater, operatingRoom, specialty, doctors: hospitalData[hospital][theater][operatingRoom][specialty] });
            }
          }
        }
      }
    }
    return result;
  };

  const getAssignmentsBySpecialty = (specialty: string): Assignment[] => {
    const result: Assignment[] = [];
    for (const hospital in hospitalData) {
      for (const theater in hospitalData[hospital]) {
        for (const operatingRoom in hospitalData[hospital][theater]) {
          if (hospitalData[hospital][theater][operatingRoom][specialty]) {
            result.push({ hospital, theater, operatingRoom, specialty, doctors: hospitalData[hospital][theater][operatingRoom][specialty] });
          }
        }
      }
    }
    return result;
  };

  const clearFilters = () => {
    setSelectedHospital('');
    setSelectedTheater('');
    setSelectedOperatingRoom('');
    setSelectedSpecialty('');
    setSelectedDoctor('');
    setDoctorSearchResults([]);
  };

  const handleHospitalChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedHospital(event.target.value);
    setSelectedTheater('');
    setSelectedOperatingRoom('');
    setSelectedSpecialty('');
    setSelectedDoctor('');
    setDoctorSearchResults([]);
  };

  const handleTheaterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTheater(event.target.value);
    setSelectedOperatingRoom('');
    setSelectedSpecialty('');
    setSelectedDoctor('');
    setDoctorSearchResults([]);
  };

  const handleOperatingRoomChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOperatingRoom(event.target.value);
    setSelectedSpecialty('');
    setSelectedDoctor('');
    setDoctorSearchResults([]);
  };

  const handleSpecialtyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSpecialty(event.target.value);
    setSelectedDoctor('');
    setDoctorSearchResults([]);
  };

  const handleDoctorSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSelectedDoctor(query);

    if (query) {
      const results = new Set<string>();
      for (const hospital in hospitalData) {
        if (!selectedHospital || selectedHospital === hospital) {
          for (const theater in hospitalData[hospital]) {
            if (!selectedTheater || selectedTheater === theater) {
              for (const operatingRoom in hospitalData[hospital][theater]) {
                if (!selectedOperatingRoom || selectedOperatingRoom === operatingRoom) {
                  for (const specialty in hospitalData[hospital][theater][operatingRoom]) {
                    if (!selectedSpecialty || selectedSpecialty === specialty) {
                      const doctors = hospitalData[hospital][theater][operatingRoom][specialty];
                      doctors.forEach(doctor => {
                        if (doctor.toLowerCase().includes(query.toLowerCase())) {
                          results.add(doctor);
                        }
                      });
                    }
                  }
                }
              }
            }
          }
        }
      }
      setDoctorSearchResults(Array.from(results));
    } else {
      setDoctorSearchResults([]);
    }
  };

  const handleDoctorSelect = (doctor: string) => {
    setSelectedDoctor(doctor);
    setDoctorSearchResults([]);
  };

  useEffect(() => {
    let assignments: Assignment[] = [];
    if (selectedDoctor) {
      assignments = getAssignmentsByDoctor(selectedDoctor);
    } else if (selectedSpecialty) {
      assignments = getAssignmentsBySpecialty(selectedSpecialty);
    } else {
      for (const hospital in hospitalData) {
        if (!selectedHospital || selectedHospital === hospital) {
          for (const theater in hospitalData[hospital]) {
            if (!selectedTheater || selectedTheater === theater) {
              for (const operatingRoom in hospitalData[hospital][theater]) {
                if (!selectedOperatingRoom || selectedOperatingRoom === operatingRoom) {
                  for (const specialty in hospitalData[hospital][theater][operatingRoom]) {
                    if (!selectedSpecialty || selectedSpecialty === specialty) {
                      assignments.push({
                        hospital,
                        theater,
                        operatingRoom,
                        specialty,
                        doctors: hospitalData[hospital][theater][operatingRoom][specialty]
                      });
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    setFilteredAssignments(assignments);
  }, [selectedHospital, selectedTheater, selectedOperatingRoom, selectedSpecialty, selectedDoctor]);

  return (
    <div className="app-container">
      <h1>Hospital Assignments</h1>
      <div className="filters">
        <div className="filter-item">
          <label htmlFor="hospital-select">Hospital: </label>
          <select id="hospital-select" onChange={handleHospitalChange} value={selectedHospital}>
            <option value="">All</option>
            {Object.keys(hospitalData).map(hospital => (
              <option key={hospital} value={hospital}>{hospital}</option>
            ))}
          </select>
        </div>
        <div className="filter-item">
          <label htmlFor="theater-select">Theater: </label>
          <select id="theater-select" onChange={handleTheaterChange} value={selectedTheater} disabled={!selectedHospital && !selectedDoctor && !selectedSpecialty}>
            <option value="">All</option>
            {selectedHospital && Object.keys(hospitalData[selectedHospital]).map(theater => (
              <option key={theater} value={theater}>{theater}</option>
            ))}
          </select>
        </div>
        <div className="filter-item">
          <label htmlFor="operating-room-select">Operating Room: </label>
          <select id="operating-room-select" onChange={handleOperatingRoomChange} value={selectedOperatingRoom} disabled={!selectedTheater && !selectedDoctor && !selectedSpecialty}>
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
          <input id="doctor-input" type="text" value={selectedDoctor} onChange={handleDoctorSearch} />
          {doctorSearchResults.length > 0 && (
            <ul className="doctor-search-results">
              {doctorSearchResults.map((doctor, index) => (
                <li key={index} onClick={() => handleDoctorSelect(doctor)}>
                  {doctor}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button className="clear-button" onClick={clearFilters}>Clear Filters</button>
      </div>
      <table className="assignments-table">
        <thead>
          <tr>
            <th>Hospital</th>
            <th>Theater</th>
            <th>Operating Room</th>
            <th>Specialty</th>
            <th>Doctors</th>
          </tr>
        </thead>
        <tbody>
          {filteredAssignments.map((assignment, index) => (
            <tr key={index}>
              <td>{assignment.hospital}</td>
              <td>{assignment.theater}</td>
              <td>{assignment.operatingRoom}</td>
              <td>{assignment.specialty}</td>
              <td>{assignment.doctors.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
