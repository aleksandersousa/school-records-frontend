import { Course } from '@/models';
import { ModalProps } from '../typing';

export interface EditCourseModalProps extends ModalProps {
  course: Course | null;
}
