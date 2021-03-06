import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AbsenceService} from '../services/absence.service';
import {User} from '../common/user.model';
import {AbsenceModel, Reason} from '../common/absence.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-absence-dialog',
  templateUrl: './absence-dialog.component.html',
  styleUrls: ['./absence-dialog.component.scss']
})
export class AbsenceDialogComponent implements OnInit {
  public loggedInUser: User;
  public absence: AbsenceModel;

  reasons: any;

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AbsenceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private absenceService: AbsenceService
  ) {
  }

  ngOnInit(): void {
    this.loggedInUser = this.absenceService.getUser();
    if (this.data) {
      this.absence = this.data;
    } else {
      this.absence = new AbsenceModel(this.loggedInUser);
    }

    this.reasons = Reason;

    this.inintForm();
  }

  getReasons(): Array<string> {
    const keys = Object.keys(this.reasons);
    return keys.slice(keys.length / 2);
  }

  onSubmit() {
    this.setAbsenceFromForm();
    this.absenceService.addOrUpdateAbsence(this.absence);
    this.onClose();
  }

  onClose() {
    this.dialogRef.close();
  }

  inintForm() {
    this.form = new FormGroup({
      dateStart: new FormControl(new Date(this.absence.dateStart), Validators.required),
      dateEnd: new FormControl(new Date(this.absence.dateEnd), Validators.required, /*this.dateEndValidator*/),
      reason: new FormControl(this.absence.reason, Validators.required),
      comment: new FormControl(this.absence.comment, Validators.maxLength(500))
    });
  }

  isEndDateValid(): boolean {
    const dStart = this.form.get('dateStart').value;
    const dEnd = this.form.get('dateEnd').value;
    return dStart <= dEnd;
  }

  setAbsenceFromForm() {
    this.absence.dateStart = this.form.get('dateStart').value;
    this.absence.dateEnd = this.form.get('dateEnd').value;
    this.absence.reason = this.form.get('reason').value;
    this.absence.comment = this.form.get('comment').value;
  }
}
