import { Result } from '@/models';
import { ModalProps } from '../typing';

export interface EditResultModalProps extends ModalProps {
  result: Result | null;
}
