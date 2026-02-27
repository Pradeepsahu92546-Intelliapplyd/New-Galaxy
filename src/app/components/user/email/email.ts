import { Component, ViewChild } from '@angular/core'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { icons } from '../../../shared/icons-provider';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { EmailInf } from '../../../models/interfaces/user-management.interface';
import { InputDialog } from '../../../shared/components/modal/dialog/Input-dialog-new/input-dialog';
import { Verification } from '../../../shared/components/modal/dialog/verification/verification';


@Component({
  selector: 'app-email',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    NzButtonModule,
    NzInputModule,
    NzIconModule,
    NzTagModule,
    InputDialog,
    Verification
  ],
  templateUrl: './email.html',
  styleUrl: './email.css'
})
export class Email {

  @ViewChild(InputDialog) eamilDialog!: InputDialog;
  @ViewChild(Verification) otpDialog!: InputDialog;


  emails: EmailInf[] = [
    { address: 'pratyush@gmail.com', isDefault: true, createdAt: '6 month ago', verified: true }
  ];


  currentStep: 'list' | 'add' | 'verify' = 'list';
  newEmail: string | undefined = '';
  otp: string = '';
  sentOtp: string = '';
  verifyingEmail: string = '';

  constructor(private msg: NzMessageService, private iconService: NzIconService) {
    this.iconService.addIcon(...icons);
  }

  // this is method is call by child 

  handelOnEmail(data: string | undefined) {
    this.newEmail = data
    console.log('Email received from child:', this.newEmail);
    if (!this.newEmail) {
      this.msg.error('Please enter a valid email address');
      return;
    }
    this.verifyingEmail = this.newEmail;
    this.sentOtp = '123456'; // dummy OTP
    this.currentStep = 'verify';
    this.msg.success(`OTP sent to ${this.newEmail}`);
    this.currentStep = 'verify';
    this.otpDialog.showModal()
  }

  // this is method is call by child 

  handelOnOtp(data: string | undefined) {
    console.log("otp receave form child is :", data, "old:", this.sentOtp)
    if (String(data) === this.sentOtp) {
      this.emails.push({
        address: this.verifyingEmail,
        isDefault: false,
        createdAt: 'Just now',
        verified: true
      });
      this.msg.success('Email verified successfully');
      this.currentStep = 'list';
    } else {
      this.msg.error('Invalid OTP');
    }
  }
  

  // Delete email
  deleteEmail(index: number) {
    this.emails.splice(index, 1);
    this.msg.success('Email deleted');
  }
}
