export interface EditTableRowProps {
  options?: Array<{ key: string; component: JSX.Element }>;
  hideOption?: string;
  onClickMenuItem: (e: string) => void;
}
