import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AbsenceService} from '../services/absence.service';
import {User} from '../common/user.model';
import {AbsenceModel} from '../common/absence.model';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-absence-dialog',
  templateUrl: './absence-dialog.component.html',
  styleUrls: ['./absence-dialog.component.scss']
})
export class AbsenceDialogComponent implements OnInit {
  public loggedInUser: User;
  public absence: AbsenceModel;

  dateEndFC = new FormControl('', [Validators.required, Validators.min(this.absence?.dateStart ? this.absence.dateStart : 0)]);

  constructor(
    public dialogRef: MatDialogRef<AbsenceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private absenceService: AbsenceService
  ) {
  }

  ngOnInit(): void {
    this.loggedInUser = this.absenceService.getUser();
    if (this.data){
      this.absence = this.data;
    } else {
      this.absence = new AbsenceModel(this.loggedInUser);
    }
  }

  getErrorMessage() {
    if (this.dateEndFC.hasError('required')) {
      return 'Ending date is required!';
    }

    if (this.dateEndFC.hasError('required')) {
      return 'Ending date is required!';
    }

    return this.dateEndFC.hasError('min') ? 'Ending date cannot be before start date!' : '';
  }

  onSubmit() {
    // TODO
    this.onClose();
  }

  onClose() {
    // todo
    this.dialogRef.close();
  }
}
