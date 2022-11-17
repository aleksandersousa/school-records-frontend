/* eslint-disable @typescript-eslint/no-explicit-any */
import { GridCellParams, GridColDef, GridRowParams } from '@mui/x-data-grid';

export interface DataTableProps {
  columns: GridColDef[];
  rows: any[];
  isCheckbox?: boolean;
  serverSide?: boolean;
  disableSelectionOnClick?: boolean;
  loading?: boolean;
  height?: string;
  initialNumberRowPerPage?: number;
  searchQuery?: string;
  onSelectRow?: (args?: GridCellParams) => void;
  onSelectedRows?: (args?: unknown) => unknown;
  isRowSelectable?: (args?: GridRowParams) => boolean;
  fetchDataError?: () => void;
  fetchData?: (
    page: number,
    pageSize: number,
    setPageState: React.Dispatch<React.SetStateAction<PageState>>,
    errorCallback?: () => void,
    searchQuery?: string
  ) => Promise<void>;
}

export interface ContainerProps {
  height: string;
}

export interface PageState {
  isLoading: boolean;
  data: any[];
  total: number;
  page: number;
  pageSize: number;
}
