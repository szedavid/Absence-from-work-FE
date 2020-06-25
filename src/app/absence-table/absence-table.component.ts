import {AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {AbsenceTableDataSource} from './absence-table-datasource';
import {AbsenceModel, Reason} from '../common/absence.model';
import {AbsenceService} from '../services/absence.service';

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

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['dateStart', 'dateEnd', 'reason', 'comment'];

  constructor(private absenceService: AbsenceService) {
  }

  ngOnInit() {
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
}
