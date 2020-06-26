import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {AbsenceTableDataSource} from './absence-table-datasource';
import {AbsenceModel, Reason} from '../common/absence.model';
import {AbsenceService} from '../services/absence.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AbsenceDialogComponent} from '../absence-dialog/absence-dialog.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-absence-table',
  templateUrl: './absence-table.component.html',
  styleUrls: ['./absence-table.component.scss'],
  // Need to remove view encapsulation so that the custom tooltip style defined in
  // `absence-table.component.css` will not be scoped to this component's view.
  encapsulation: ViewEncapsulation.None
})

export class AbsenceTableComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<AbsenceModel>;
  dataSource: AbsenceTableDataSource;
  years: number[] = [];
  months: number[] = [];
  selectedYear: number;
  selectedMonth: number;

  subscriptionUpdate: Subscription;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
    // employeeName column is not necessary due to the emulated login handling, but it is required in the specification
  displayedColumns = ['employeeName', 'dateStart', 'dateEnd', 'reason', 'comment', 'approved', 'action'];

  constructor(
    private absenceService: AbsenceService,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    for (let i = 2000; i <= 2050; i++) {
      this.years.push(i);
    }
    this.selectedYear = new Date().getFullYear();

    for (let i = 1; i <= 12; i++) {
      this.months.push(i);
    }
    this.selectedMonth = new Date().getMonth() + 1; // starts from 0

    this.dataSource = new AbsenceTableDataSource(this.absenceService, this.selectedYear, this.selectedMonth - 1);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;

    this.subscriptionUpdate = this.absenceService.getMessageUpdate().subscribe(
      () => {
        this.dataSource.loadData(this.selectedYear, this.selectedMonth - 1);
        this.paginator.page.emit();
      }
    );
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

  onDelete(absence: AbsenceModel) {
    if (confirm('Are you sure, you want to delete this record?')) {
      this.absenceService.deleteAbsence(absence);
      this.dataSource.loadData(this.selectedYear, this.selectedMonth - 1);
    }
  }

  onChangeYear(yearNew) {
    this.dataSource.loadData(yearNew, this.selectedMonth - 1);
    this.paginator.page.emit();
  }

  onChangeMonth(monthNew) {
    this.dataSource.loadData(this.selectedYear, monthNew - 1);
    this.paginator.page.emit();
  }

  ngOnDestroy(): void {
    if (this.subscriptionUpdate) {
      this.subscriptionUpdate.unsubscribe();
    }
  }
}
