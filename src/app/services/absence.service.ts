import {Injectable} from '@angular/core';
import {AbsenceModel} from '../common/absence.model';
import {absenceList, loggedInUser} from '../common/static-data';
import {Observable} from 'rxjs';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {

  constructor() {
    // initiating static data (setting id-s)
    absenceList.forEach( absenceData => {
      if (absenceData.employeeName === loggedInUser.name){
        absenceData.id = loggedInUser.id;
      } else {
        absenceData.id = Math.floor(Math.random() * 100000);
      }
    });
  }

  getAbsencesForUser(id: number): Observable<AbsenceModel[]> {
    // todo id filter
    return of(absenceList);
  }
}
