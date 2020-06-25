import {AbsenceModel, Reason} from './absence.model';
import {User} from './user.model';

// this file is used instead of a backend application

export const loggedInUser = new User(1, 'David Diligent');

export const absenceList: AbsenceModel[] = [

  new AbsenceModel(
    'David Diligent',
    Date.now() - 1000000,
    Date.now() - 5000,
    Reason['Non paid leave']
  ),

  new AbsenceModel(
    'David Diligent',
    Date.now() - 1000000,
    Date.now(),
    Reason.Holiday
  ),

  new AbsenceModel(
    'David Diligent',
    Date.now() - 2000000,
    Date.now(),
    Reason['Non paid leave']
  ),

  new AbsenceModel(
    'David Diligent',
    Date.now() - 3000000,
    Date.now(),
    Reason['Business Travel']
  ),

// others

  new AbsenceModel(
    'Dr. Jekyll',
    Date.now() - 100000,
    Date.now(),
    Reason['Non paid leave']
  ),

  new AbsenceModel(
    'Thomas A. Anderson',
    Date.now() - 100000,
    Date.now(),
    Reason.Holiday
    ),

  new AbsenceModel(
    'Captain Ahab',
    Date.now() - 100000,
    Date.now(),
    Reason['Business Travel']
  ),

  new AbsenceModel(
    'Mr. Hyde',
    Date.now() - 100000,
    Date.now(),
    Reason['Non paid leave']
  ),

  new AbsenceModel(
    'John Doe',
    Date.now() - 100000,
    Date.now(),
    Reason['Business Travel']
  ),

  new AbsenceModel(
    'Agent Smith',
    Date.now() - 100000,
    Date.now(),
    Reason.Holiday
  )
];


