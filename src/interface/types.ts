// src\interface\types.ts

export interface HospitalData {
    [hospital: string]: TheatreData;
  }
  
  export interface TheatreData {
    [theatre: string]: OperatingRoomData;
  }
  
  export interface OperatingRoomData {
    [operatingRoom: string]: SpecialtyData;
  }
  
  export interface SpecialtyData {
    [specialty: string]: string[];
  }
  
  export interface Assignment {
    hospital: string;
    theatre: string;
    operatingRoom: string;
    specialty: string;
    doctors: string[];
  }
  