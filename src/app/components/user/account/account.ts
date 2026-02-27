import { Component, OnInit } from '@angular/core'
import { AccountManagement } from '../account-management/account-management';
import { EmailError } from '../../../../stories/login.stories';
import { Email } from '../email/email';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user-service';


@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    Email,
    AccountManagement,
    NzCardModule,
    NzSelectModule,
    NzSwitchModule,
    FormsModule,
  ],
  templateUrl: './account.html',
  styleUrl: './account.css'
})
export class Account implements OnInit {
  constructor(private userService: UserService) {}

  accountType : string = '';
  userType : string = '';

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.userService.getProfile().subscribe({
      next: (response) => {
        // Accessing the 'data' property from your mock structure
        const userData = response.data;


      this.accountType = userData.acc_type;
      this.userType = userData.utype;


        console.log('Profile loaded successfully:', userData);
      },
      error: (err) => {
        console.error('Error fetching profile', err);
      }
    });

 
  }
}
