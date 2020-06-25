import {AbsenceModel, Reason} from './absence.model';
import {User} from './user.model';

// this file is used instead of a backend application

export const loggedInUser = new User(1, 'David Diligent');

export const absenceList: AbsenceModel[] = [
  new AbsenceModel(
    loggedInUser,
    Date.now() - 10000000,
    Date.now() - 500000,
    Reason['Non paid leave'],
    'Developing a board game.'
  ),

  new AbsenceModel(
    loggedInUser,
    Date.now() - 10000000000,
    Date.now() - 1000000000,
    Reason['Non paid leave'],
    'Figuring out how to write really long comments like this to test some functions in my Angular application.'
  ),

  new AbsenceModel(
    loggedInUser,
    Date.now() - 10000000,
    Date.now(),
    Reason.Holiday
  ),

  new AbsenceModel(
    loggedInUser,
    Date.now() - 20000000,
    Date.now(),
    Reason['Non paid leave'],
    'Rescuing animals in Australia.'
  ),

  new AbsenceModel(
    loggedInUser,
    Date.now() - 30000000,
    Date.now(),
    Reason['Business Travel'],
    'Meeting with Elon at Gigafactory 1 in Nevada.'
  ),

// others

  new AbsenceModel(
    loggedInUser,
    Date.now() - 10000000,
    Date.now() - 5000000,
    Reason['Non paid leave']
  ),

  new AbsenceModel(
    new User(101, 'Thomas A. Anderson'),
    Date.now() - 1000000,
    Date.now(),
    Reason.Holiday
    ),

  new AbsenceModel(
    new User(102, 'Captain Ahab'),
    Date.now() - 10000000,
    Date.now(),
    Reason['Business Travel']
  ),

  new AbsenceModel(
    new User(103, 'Mr. Hyde'),
    Date.now() - 10000000,
    Date.now(),
    Reason['Non paid leave']
  ),

  new AbsenceModel(
    new User(104, 'John Doe'),
    Date.now() - 10000000,
    Date.now(),
    Reason['Business Travel']
  ),

  new AbsenceModel(
    new User(105, 'Agent Smith'),
    Date.now() - 10000000,
    Date.now(),
    Reason.Holiday
  )
];


