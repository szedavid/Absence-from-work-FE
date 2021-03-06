import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import {AbsenceModel} from '../common/absence.model';
import {AbsenceService} from '../services/absence.service';

/**
 * Data source for the AbsenceTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class AbsenceTableDataSource extends DataSource<AbsenceModel> {
  data: AbsenceModel[];
  paginator: MatPaginator;
  sort: MatSort;

  constructor(private absenceService: AbsenceService, selectedYear: number, selectedMonth: number) {
    super();
    this.loadData(selectedYear, selectedMonth);
  }

  public loadData(year: number, month: number){
    this.absenceService.getAbsencesForCurrentUser(year, month).subscribe(
      (absences: AbsenceModel[]) => {
        this.data = absences;
      }
    );
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<AbsenceModel[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: AbsenceModel[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: AbsenceModel[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'employeeName': return compare(a.employee.name, b.employee.name, isAsc);
        case 'dateStart': return compare(+a.dateStart, +b.dateStart, isAsc);
        case 'dateEnd': return compare(+a.dateStart, +b.dateStart, isAsc);
        case 'reason': return compare(+a.reason, +b.reason, isAsc);
        case 'approved': return compare(+a.approved, +b.approved, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
