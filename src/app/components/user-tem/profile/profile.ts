import { Component } from '@angular/core';
import { UserService } from '../../../services/user-service';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {

  constructor(private userService: UserService) {}

  private userId: string = '1';
  // getProfileDetails(userId: string) {
  //   this.userService.getProfile(userId).subscribe(
  //     (response) => {
  //       console.log('Profile details:', response);
  //       // Handle the profile details as needed, e.g., display them in the template
  //     },
  //     (error) => {
  //       console.error('Error fetching profile details:', error);
  //       // Handle errors as needed, e.g., show an error message to the user
  //     } 
  //   )
      
  // }
}
