interface Address {
  formattedAddress: string;
  zoneId: string;
}

export interface WorkerProfile {
  address: Address;
  email: string;
  firstName: string;
  lastName: string;
  maxJobDistance: number;
  phoneNumber: string;
  workerId: string;
}

export interface JobMatch {
  jobId: string;
  jobTitle: {
    name: string;
    imageUrl: string;
  };
  company: {
    name: string;
    address: Address;
    reportTo?: {
      name: string;
      phone?: string;
    };
  };
  wagePerHourInCents: number;
  milesToTravel: number;
  shifts: {
    startDate: string;
    endDate: string;
  }[];
  branch: string;
  branchPhoneNumber: string;
  requirements?: string[];
}

export interface JobActionResponse {
  success: boolean;
  message: string;
  errorCode: string;
}
