import { Component } from '@angular/core';
import {AbsenceService} from './services/absence.service';
import {User} from './common/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Absence from work';
  loggedInUser: User;

  constructor(absenceService: AbsenceService) {
    this.loggedInUser = absenceService.getUser();
  }
}
