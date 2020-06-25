import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-absence-dialog',
  templateUrl: './absence-dialog.component.html',
  styleUrls: ['./absence-dialog.component.scss']
})
export class AbsenceDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AbsenceDialogComponent>
  ) {
  }

  ngOnInit(): void {
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
