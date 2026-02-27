export interface UserProfileResponse {
  fname: string;
  uname: string;
  email: string;
  phone: string;
  utype: string;
  acc_type: string;
  lst_login: string;    // ISO Date string
  acc_created: string;  // ISO Date string
  lname: string;
  dob: string;          // Format: 'YYYY-MM-DD'
  pic?: string | null;
  loc?: string | null;
}


export interface AddressInf {
    id:string,
    address1: string;
    address2: string;
    city: string;
    state: string;
    country: string;
    zip: string;
    type: string;
    isDefault: boolean;
}

export interface EmailInf {
    address: string;
    isDefault: boolean;
    createdAt: string;
    verified: boolean;
}

export interface DeviceInf{
    name:string;
    time:string;
    icon:string
}



