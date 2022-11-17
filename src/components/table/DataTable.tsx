/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { DataGrid, GridCellParams, gridClasses, ptBR } from '@mui/x-data-grid';
import { alpha, styled } from '@mui/material/styles';
import { useTheme } from 'styled-components';
import { Container } from './styles';
import { DataTableProps, PageState } from './typing';

const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: '#f8f8f8',
    '&:hover, &.Mui-hovered': {
      backgroundColor: '#f4f4f4',
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&.Mui-selected': {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity
      ),
    },
  },
}));

const DataTable: React.FC<DataTableProps> = ({
  columns,
  rows,
  isCheckbox,
  loading,
  serverSide,
  disableSelectionOnClick = true,
  height,
  initialNumberRowPerPage,
  searchQuery,
  onSelectRow,
  onSelectedRows,
  isRowSelectable,
  fetchDataError,
  fetchData,
}) => {
  const theme = useTheme();

  const [pageState, setPageState] = useState<PageState>({
    isLoading: false,
    data: [],
    total: 0,
    page: 1,
    pageSize: 10,
  });

  // for server side pagination
  useEffect(() => {
    if (serverSide && fetchData && fetchDataError) {
      fetchData(
        pageState.page,
        pageState.pageSize,
        setPageState,
        fetchDataError,
        searchQuery
      ).catch(() => fetchDataError());
    }
  }, [pageState.page, pageState.pageSize, searchQuery]);

  useEffect(() => {
    initialNumberRowPerPage &&
      setPageState(old => ({ ...old, pageSize: initialNumberRowPerPage }));
  }, []);

  return (
    <Container className="dataTable" height={height as string}>
      <StripedDataGrid
        pagination
        disableSelectionOnClick={disableSelectionOnClick}
        paginationMode={serverSide ? 'server' : 'client'}
        rowCount={serverSide ? pageState.total : undefined}
        page={pageState.page - 1}
        pageSize={pageState.pageSize}
        loading={serverSide ? pageState.isLoading : loading}
        checkboxSelection={isCheckbox}
        rows={serverSide ? pageState.data : rows}
        columns={columns}
        onPageChange={(newPage): void =>
          setPageState(old => ({ ...old, page: newPage + 1 }))
        }
        onPageSizeChange={(newPageSize): void =>
          setPageState(old => ({ ...old, pageSize: newPageSize }))
        }
        rowsPerPageOptions={[6, 8, 10, 15]}
        getRowClassName={(params): string =>
          params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
        }
        localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
        isRowSelectable={isRowSelectable}
        onCellClick={(params: GridCellParams): void => {
          if (params.field !== '__check__' && onSelectRow) {
            onSelectRow(params);
          }
        }}
        initialState={{
          sorting: {
            sortModel: [{ field: 'created_at', sort: 'desc' }],
          },
        }}
        onSelectionModelChange={(ids): void => {
          if (onSelectedRows) {
            const selectedRowData = rows.filter(row => ids.includes(row.id));
            onSelectedRows(selectedRowData);
          }
        }}
        sx={{
          backgroundColor: theme.colors.primary.white,
          '&>.MuiDataGrid-main': {
            '& div div div div >.MuiDataGrid-cell': {
              borderBottom: 'none',
            },
          },
          '.MuiDataGrid-columnSeparator': {
            display: 'none',
          },
          '&.MuiDataGrid-root': {
            borderRadius: theme.tipography.borderRadius,
            boxShadow: `0px 4px 4px rgba(0, 0, 0, 0.25)`,
            border: `1px solid ${theme.colors.secondary.medium}`,
            '.MuiDataGrid-cell:focus-within': {
              outline: 'none !important',
            },
          },
        }}
      />
    </Container>
  );
};

export default DataTable;
