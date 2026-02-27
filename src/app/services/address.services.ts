import { Injectable } from '@angular/core';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor() { }

  getAllAddress() {
    console.log("Returning mock comments!");
    return of([]); // returns Observable of mock comments
  }

  // getAddressById(id: string) {
  //   const result = AddressData.find(c => c.id === id);
  //   return of(result);
  // }
   
  // postAddress(payload: { 
  //     id: string,
  //     address1: string ,
  //     address2:string,
  //     city:string,
  //     state:string,
  //     country:string,
  //     zip:string,
  //     type:string,
  //     isDefault:boolean,
  //   }) {
  //   AddressData.push(payload); 
  //   return of(payload);
  // }
}
