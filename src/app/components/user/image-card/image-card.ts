import { Component, NgZone, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { icons } from '../../../shared/icons-provider';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { UserService } from '../../../services/user-service';

@Component({
  selector: 'app-image-card',
  standalone: true,
  imports: [
    CommonModule,
    NzButtonModule,
    NzCardModule,
    NzAvatarModule,
    NzIconModule,
    NzUploadModule,
  ],
  templateUrl: './image-card.html',
  styleUrls: ['./image-card.css'],
})
export class ImageCard implements OnInit {
  firstName: string = '';
  lastName: string = '';
  email: string = ' ';
  // default avatar
  profileImg: string =
    'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80';

  isUploading = false;

  // fields for handling file upload
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;

  constructor(
    private userService: UserService,
    private iconService: NzIconService,
    private messageService: NzMessageService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
  ) {
    this.iconService.addIcon(...icons);
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.userService.getProfile().subscribe({
      next: (response) => {
        const userData = response.data;
        this.firstName = userData.fname;
        this.lastName = userData.lname;
        this.email = userData.email;
        this.profileImg = userData.pic || this.profileImg;

        console.log('Profile loaded successfully:', userData);
      },
      error: (err) => {
        console.error('Error fetching profile', err);
      },
    });
  }

  // Upload handlers
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.selectedFile = file;

      // generate preview
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
        this.profileImg = reader.result as string;
        this.onUpload(); // Automatically upload after selection
      };
      reader.readAsDataURL(file);
    }
  }

  /** upload previously selected file using FormData */
  onUpload(): void {
    if (!this.selectedFile) {
      return;
    }
    this.isUploading = true;
    const formData = new FormData();
    formData.append('profile_pic', this.selectedFile, this.selectedFile.name);

    console.log('Uploading file:', formData.get('profile_pic'));
    this.userService.uploadProfileImage(formData).subscribe({
      next: () => {
        this.messageService.success('Upload successful');
        this.isUploading = false;
        this.selectedFile = null;
        this.cdr.markForCheck();
      },
      error: () => {
        this.messageService.error('Upload failed');
        this.isUploading = false;
        this.cdr.markForCheck();
      },
    });
  }
}
