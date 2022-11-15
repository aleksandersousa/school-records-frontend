import CollegeSubject from './CollegeSubject';
import Student from './Student';
import TypeOfResult from './TypeOfResult';

export default interface Result {
  id?: number;
  note?: number;
  assign_result_date?: Date;
  type_of_result_id?: number;
  college_subject_id?: number;
  student_id?: number;
  type_of_result?: TypeOfResult;
  college_subject?: CollegeSubject;
  student?: Student;
}
