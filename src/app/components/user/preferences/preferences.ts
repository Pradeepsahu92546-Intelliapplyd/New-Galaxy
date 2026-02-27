import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzButtonModule } from 'ng-zorro-antd/button';
@Component({
  selector: 'app-preferences',
imports: [
    FormsModule,
    NzCardModule,
    NzSelectModule,
    NzSwitchModule,
    NzButtonModule,
      ],
  templateUrl: './preferences.html',
  styleUrl: './preferences.css'
})
export class Preferences {
  theme = 'light';
  language = 'en';
  reports = false;
  promotion = false;
}
