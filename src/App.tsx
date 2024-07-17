import React, { useState, useMemo, useCallback } from 'react';
import { hospitalData } from './data';
import { Assignment } from './types';
import './App.css';
import Filters from './Filters';

const App: React.FC = () => {
  const [selectedHospital, setSelectedHospital] = useState<string>('');
  const [selectedTheater, setSelectedTheater] = useState<string>('');
  const [selectedOperatingRoom, setSelectedOperatingRoom] = useState<string>('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('');
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');
  const [doctorSearchResults, setDoctorSearchResults] = useState<string[]>([]);

  // Memoize the filterData function with useCallback to prevent unnecessary re-creations
  const filterData = useCallback((doctor: string, specialty: string) => {
    const result: Assignment[] = [];
    Object.entries(hospitalData).forEach(([hospital, theaters]) => {
      if (!selectedHospital || selectedHospital === hospital) {
        Object.entries(theaters).forEach(([theater, operatingRooms]) => {
          if (!selectedTheater || selectedTheater === theater) {
            Object.entries(operatingRooms).forEach(([operatingRoom, specialties]) => {
              if (!selectedOperatingRoom || selectedOperatingRoom === operatingRoom) {
                Object.entries(specialties).forEach(([spec, doctors]) => {
                  if ((!specialty || spec === specialty) && (!doctor || doctors.includes(doctor))) {
                    result.push({ hospital, theater, operatingRoom, specialty: spec, doctors });
                  }
                });
              }
            });
          }
        });
      }
    });
    return result;
  }, [selectedHospital, selectedTheater, selectedOperatingRoom]);

  const clearFilters = () => {
    setSelectedHospital('');
    setSelectedTheater('');
    setSelectedOperatingRoom('');
    setSelectedSpecialty('');
    setSelectedDoctor('');
    setDoctorSearchResults([]);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSelectedDoctor(query);
    setSelectedHospital(''); // Clear hospital
    setSelectedTheater(''); // Clear theater
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
    setSelectedTheater(''); // Clear theater
    setSelectedOperatingRoom(''); // Clear operating room
  };

  const filteredAssignments = useMemo(() => {
    return filterData(selectedDoctor, selectedSpecialty);
  }, [filterData, selectedDoctor, selectedSpecialty]);

  return (
    <div className="app-container">
      <h1>Hospital Assignments</h1>
      <Filters 
        selectedHospital={selectedHospital}
        selectedTheater={selectedTheater}
        selectedOperatingRoom={selectedOperatingRoom}
        selectedSpecialty={selectedSpecialty}
        selectedDoctor={selectedDoctor}
        setSelectedHospital={setSelectedHospital}
        setSelectedTheater={setSelectedTheater}
        setSelectedOperatingRoom={setSelectedOperatingRoom}
        setSelectedSpecialty={setSelectedSpecialty}
        setSelectedDoctor={setSelectedDoctor}
        handleSearchChange={handleSearchChange}
        handleSpecialtyChange={handleSpecialtyChange} // Add this line
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
        <th>Theater</th>
        <th>Operating Room</th>
        <th>Specialty</th>
        <th>Doctors</th>
      </tr>
    </thead>
    <tbody>
      {assignments.map((assignment, index) => (
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
);

export default App;
