import { Component, ViewChild } from '@angular/core'
import { FormsModule } from '@angular/forms';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Confirmation } from '../../../shared/components/modal/dialog/confirmation/confirmation';
import { NzNotificationService } from 'ng-zorro-antd/notification';
@Component({
  selector: 'app-account-management',
  imports: [Confirmation,
    FormsModule,
    NzCardModule,
    NzSelectModule,
    NzSwitchModule,
    NzButtonModule,],
  templateUrl: './account-management.html',
  styleUrl: './account-management.css'
})
export class AccountManagement {
  @ViewChild('deleteConfirm') deleteConfirm!: Confirmation;
  @ViewChild('deactivateConfirm') deactivateConfirm!: Confirmation;
  constructor(private notification: NzNotificationService) {}
deleteAccount(){
    console.log("Account deleted successfully")
    setTimeout(() => {
      this.notification.success(
        'Sent',
        'Password reset link sent to your registered email id successfully'
      );
    }, 1500);
  }
  deactivateAccount(){
    console.log("Account deactivated successfully")
  }
  triggerDelete(){
        this.deleteConfirm.showConfirm();
  }
  triggerDeactivate(){
        this.deactivateConfirm.showConfirm();
  }
  
}
