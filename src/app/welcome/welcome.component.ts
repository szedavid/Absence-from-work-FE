import { Component, OnInit } from '@angular/core';
import {AbsenceService} from '../services/absence.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(public absenceService: AbsenceService) { }

  ngOnInit(): void {
  }

}
