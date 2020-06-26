import {AbsenceModel, Reason} from './absence.model';
import {User} from './user.model';

// this file is used instead of a backend application

export const loggedInUser = new User(1, 'David Diligent');

export let absences: AbsenceModel[] = [
  new AbsenceModel(
    loggedInUser,
    new Date(2015, 1, 1),
    new Date(),
    Reason['Non paid leave'],
    'Developing a board game.'
  ),

  new AbsenceModel(
    loggedInUser,
    new Date(2018, 5, 1),
    new Date(),
    Reason['Non paid leave'],
    'Figuring out how to write really long comments like this to test some functions in my Angular application.'
  ),

  new AbsenceModel(
    loggedInUser,
    new Date(2019, 4, 1),
    new Date(),
    Reason.Holiday
  ),

  new AbsenceModel(
    loggedInUser,
    new Date(2020, 1, 1),
    new Date(),
    Reason['Non paid leave'],
    'Rescuing animals in Australia.'
  ),

  new AbsenceModel(
    loggedInUser,
    new Date(2020, 8, 1),
    new Date(),
    Reason['Business Travel'],
    'Meeting with Elon at Gigafactory 1 in Nevada.'
  ),

  new AbsenceModel(
    loggedInUser,
    new Date(2020, 1, 1),
    new Date(),
    Reason['Non paid leave']
  ),

  // others (tose will neve be shown in this demo application due to login emulation)

  new AbsenceModel(
    new User(101, 'Thomas A. Anderson'),
    new Date(2020, 1, 1),
    new Date(),
    Reason.Holiday
  ),

  new AbsenceModel(
    new User(102, 'Captain Ahab'),
    new Date(2020, 1, 1),
    new Date(),
    Reason['Business Travel']
  ),

  new AbsenceModel(
    new User(103, 'Mr. Hyde'),
    new Date(2020, 1, 1),
    new Date(),
    Reason['Non paid leave']
  ),

  new AbsenceModel(
    new User(104, 'John Doe'),
    new Date(2020, 1, 1),
    new Date(),
    Reason['Business Travel']
  ),

  new AbsenceModel(
    new User(105, 'Agent Smith'),
    new Date(2020, 1, 1),
    new Date(),
    Reason.Holiday
  )
];


