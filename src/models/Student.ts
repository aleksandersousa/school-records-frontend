import Course from './Course';

export default interface Student {
  id?: number;
  name?: string;
  cpf?: string;
  registration_number?: string;
  course_id?: number;
  course?: Course;
}
