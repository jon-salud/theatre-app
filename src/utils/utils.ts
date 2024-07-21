// src\utils\utils.ts

import { hospitalData } from '../data/data';
import { Assignment } from '../interface/types';

export const filterHospitalData = (
  selectedHospital: string,
  selectedTheatre: string,
  selectedOperatingRoom: string,
  selectedSpecialty: string,
  doctor: string
): Assignment[] => {
  const result: Assignment[] = [];
  Object.entries(hospitalData).forEach(([hospital, theatres]) => {
    if (!selectedHospital || selectedHospital === hospital) {
      Object.entries(theatres).forEach(([theatre, operatingRooms]) => {
        if (!selectedTheatre || selectedTheatre === theatre) {
          Object.entries(operatingRooms).forEach(([operatingRoom, specialties]) => {
            if (!selectedOperatingRoom || selectedOperatingRoom === operatingRoom) {
              Object.entries(specialties).forEach(([spec, doctors]) => {
                if ((!selectedSpecialty || spec === selectedSpecialty) && (!doctor || doctors.includes(doctor))) {
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
};
