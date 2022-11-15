import Course from './Course';

export default interface CollegeSubject {
  id?: number;
  code?: string;
  name?: string;
  workload?: number;
  course_id?: number;
  course?: Course;
}
