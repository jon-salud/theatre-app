export interface HospitalData {
    [hospital: string]: TheaterData;
  }
  
  export interface TheaterData {
    [theater: string]: OperatingRoomData;
  }
  
  export interface OperatingRoomData {
    [operatingRoom: string]: SpecialtyData;
  }
  
  export interface SpecialtyData {
    [specialty: string]: string[];
  }
  
  export interface Assignment {
    hospital: string;
    theater: string;
    operatingRoom: string;
    specialty: string;
    doctors: string[];
  }
  