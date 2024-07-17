import React, { useState, useMemo, useCallback } from 'react';
import { hospitalData } from './data';
import { Assignment } from './types';
import './App.css';
import Filters from './Filters';

const App: React.FC = () => {
  const [selectedHospital, setSelectedHospital] = useState<string>('');
  const [selectedTheatre, setSelectedTheatre] = useState<string>('');
  const [selectedOperatingRoom, setSelectedOperatingRoom] = useState<string>('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('');
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');
  const [doctorSearchResults, setDoctorSearchResults] = useState<string[]>([]);

  // Memoize the filterData function with useCallback to prevent unnecessary re-creations
  const filterData = useCallback((doctor: string, specialty: string) => {
    const result: Assignment[] = [];
    Object.entries(hospitalData).forEach(([hospital, theatres]) => {
      if (!selectedHospital || selectedHospital === hospital) {
        Object.entries(theatres).forEach(([theatre, operatingRooms]) => {
          if (!selectedTheatre || selectedTheatre === theatre) {
            Object.entries(operatingRooms).forEach(([operatingRoom, specialties]) => {
              if (!selectedOperatingRoom || selectedOperatingRoom === operatingRoom) {
                Object.entries(specialties).forEach(([spec, doctors]) => {
                  if ((!specialty || spec === specialty) && (!doctor || doctors.includes(doctor))) {
                    result.push({ hospital, theatre, operatingRoom, specialty: spec, doctors });
                  }
                });
              }
            });
          }
        });
      }
    });
    return result;
  }, [selectedHospital, selectedTheatre, selectedOperatingRoom]);

  const clearFilters = () => {
    setSelectedHospital('');
    setSelectedTheatre('');
    setSelectedOperatingRoom('');
    setSelectedSpecialty('');
    setSelectedDoctor('');
    setDoctorSearchResults([]);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSelectedDoctor(query);
    setSelectedHospital(''); // Clear hospital
    setSelectedTheatre(''); // Clear theatre
    setSelectedOperatingRoom(''); // Clear operating room

    if (query) {
      const results = new Set<string>();
      filterData('', '').forEach(({ doctors }) => {
        doctors.forEach(doctor => {
          if (doctor.toLowerCase().includes(query.toLowerCase())) {
            results.add(doctor);
          }
        });
      });
      setDoctorSearchResults(Array.from(results));
    } else {
      setDoctorSearchResults([]);
    }
  };

  const handleSpecialtyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSpecialty(event.target.value);
    setSelectedHospital(''); // Clear hospital
    setSelectedTheatre(''); // Clear theatre
    setSelectedOperatingRoom(''); // Clear operating room
  };

  const handleDoctorSelect = (doctor: string) => {
    setSelectedDoctor(doctor);
    setDoctorSearchResults([]); // Clear search results to hide dropdown
  };

  const filteredAssignments = useMemo(() => {
    return filterData(selectedDoctor, selectedSpecialty);
  }, [filterData, selectedDoctor, selectedSpecialty]);

  return (
    <div className="app-container">
      <h1>Hospital Assignments</h1>
      <Filters 
        selectedHospital={selectedHospital}
        selectedTheatre={selectedTheatre}
        selectedOperatingRoom={selectedOperatingRoom}
        selectedSpecialty={selectedSpecialty}
        selectedDoctor={selectedDoctor}
        setSelectedHospital={setSelectedHospital}
        setselectedTheatre={setSelectedTheatre}
        setSelectedOperatingRoom={setSelectedOperatingRoom}
        setSelectedSpecialty={setSelectedSpecialty}
        setSelectedDoctor={setSelectedDoctor}
        handleSearchChange={handleSearchChange}
        handleSpecialtyChange={handleSpecialtyChange}
        handleDoctorSelect={handleDoctorSelect} // Pass this handler
        doctorSearchResults={doctorSearchResults}
        clearFilters={clearFilters}
      />
      <AssignmentsTable assignments={filteredAssignments} />
    </div>
  );
};

const AssignmentsTable: React.FC<{ assignments: Assignment[] }> = ({ assignments }) => (
  <table className="assignments-table">
    <thead>
      <tr>
        <th>Hospital</th>
        <th>Theatre</th>
        <th>Operating Room</th>
        <th>Specialty</th>
        <th>Doctors</th>
      </tr>
    </thead>
    <tbody>
      {assignments.map((assignment, index) => (
        <tr key={index}>
          <td>{assignment.hospital}</td>
          <td>{assignment.theatre}</td>
          <td>{assignment.operatingRoom}</td>
          <td>{assignment.specialty}</td>
          <td>{assignment.doctors.join(', ')}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default App;
