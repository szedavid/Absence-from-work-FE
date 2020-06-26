import {AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {AbsenceTableDataSource} from './absence-table-datasource';
import {AbsenceModel, Reason} from '../common/absence.model';
import {AbsenceService} from '../services/absence.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AbsenceDialogComponent} from '../absence-dialog/absence-dialog.component';

@Component({
  selector: 'app-absence-table',
  templateUrl: './absence-table.component.html',
  styleUrls: ['./absence-table.component.scss'],
  // Need to remove view encapsulation so that the custom tooltip style defined in
  // `absence-table.component.css` will not be scoped to this component's view.
  encapsulation: ViewEncapsulation.None
})

export class AbsenceTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<AbsenceModel>;
  dataSource: AbsenceTableDataSource;
  years: number[] = [];
  months: number[] = [];
  selectedYear: number;
  selectedMonth: number;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
    // employeeName column is not necessary due to the emulated login handling, but it is required in the specification
  displayedColumns = ['employeeName', 'dateStart', 'dateEnd', 'reason', 'comment', 'approved', 'action'];

  constructor(
    private absenceService: AbsenceService,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.years.push(null);
    for (let i = 2000; i <= 2050; i++) {
      this.years.push(i);
    }
    this.selectedYear = new Date().getFullYear();

    this.months.push(null);
    for (let i = 1; i <= 12; i++) {
      this.months.push(i);
    }
    this.selectedMonth = new Date().getMonth() + 1; // starts from 0

    this.dataSource = new AbsenceTableDataSource(this.absenceService);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  getReasonText(reasonId: number): string {
    return Reason[reasonId];
  }

  onCreateOrUpdate(absence: AbsenceModel) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = absence;
    this.dialog.open(AbsenceDialogComponent, dialogConfig);
  }

  onDelete(row: any) {
    // todo
  }
}
