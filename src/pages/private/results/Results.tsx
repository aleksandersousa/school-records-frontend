import {
  ButtonDefault,
  DataTable,
  EditResultModal,
  NewResultModal,
  SearchBar,
} from '@/components';
import { DataTableRowStatus, DataTableRowText } from '@/components/table/styles';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { Result } from '@/models';
import { deleteResult, getResults } from '@/redux/thunks/results';
import { Icon } from '@iconify/react';
import { Tooltip } from '@mui/material';
import { GridCellParams, GridColDef } from '@mui/x-data-grid';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import { Filters, IconsWrapper, Title, Wrapper } from '../styles';

const Results: React.FC = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const { data: results, isLoading } = useAppSelector(state => state.results);

  const [selectedRow, setSelectedRow] = useState<Result | null>(null);

  const [searched, setSearched] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const filteredRows = results.filter(row => {
    return (
      row?.assign_result_date
        ?.toString()
        .toLowerCase()
        .includes(searched.toLowerCase()) ??
      row.college_subject?.name?.toLowerCase().includes(searched.toLowerCase()) ??
      row.student?.name?.toLowerCase().includes(searched.toLowerCase()) ??
      row.type_of_result?.description?.toLowerCase().includes(searched.toLowerCase())
    );
  });

  const columns: GridColDef[] = [
    {
      field: 'student',
      headerName: 'Aluno',
      minWidth: 200,
      flex: 1.1,
      renderCell: params => (
        <DataTableRowText>{params.row?.student?.name}</DataTableRowText>
      ),
    },
    {
      field: 'result',
      headerName: 'Resultado',
      minWidth: 200,
      flex: 1,
      renderCell: params => (
        <DataTableRowStatus
          bgColor={
            params.row?.type_of_result?.title === 'approved'
              ? theme.colors.success.medium
              : params.row?.type_of_result?.title === 'failed_for_lack'
              ? theme.colors.error.medium
              : theme.colors.error.dark
          }
          color={theme.colors.primary.white}
        >
          {params.row?.type_of_result?.description}
        </DataTableRowStatus>
      ),
    },
    {
      field: 'note',
      headerName: 'Nota',
      flex: 0.5,
      renderCell: params => <DataTableRowText>{params.row?.note}</DataTableRowText>,
    },
    {
      field: 'college_subject',
      headerName: 'Disciplina',
      minWidth: 200,
      flex: 1.2,
      renderCell: params => (
        <DataTableRowText>{params.row?.college_subject?.name}</DataTableRowText>
      ),
    },
    {
      field: 'assign_result_date',
      headerName: 'Data de lançamento',
      minWidth: 200,
      flex: 1,
      renderCell: params => (
        <DataTableRowText>
          {format(new Date(params.row?.assign_result_date as Date), 'dd/MM/yyyy')}
        </DataTableRowText>
      ),
    },
    {
      field: 'actions',
      headerName: 'Ações',
      flex: 0.5,
      sortable: false,
      filterable: false,
      hideable: false,
      renderCell: () => (
        <IconsWrapper>
          <Tooltip title="Editar">
            <Icon
              icon="mdi:pencil-circle"
              width={32}
              height={32}
              color={theme.colors.headsUp.dark}
              onClick={handleShowEditModal}
            />
          </Tooltip>
          <Tooltip title="Deletar">
            <Icon
              icon="mdi:delete-circle"
              width={32}
              height={32}
              color={theme.colors.error.dark}
              onClick={onDelete}
            />
          </Tooltip>
        </IconsWrapper>
      ),
    },
  ];

  const onSelectRow = (params: GridCellParams | undefined): void => {
    setSelectedRow(params?.row);
  };

  const onSearch = (searchedVal: string): void => {
    setSearched(searchedVal);
  };

  const onDelete = async (): Promise<void> => {
    setCanDelete(true);
  };

  const handleShowNewModal = (): void => {
    setShowNew(true);
  };
  const handleShowEditModal = (): void => {
    setShowEdit(true);
  };
  const handleCloseNewModal = (): void => {
    setShowNew(false);
  };
  const handleCloseEditModal = (): void => {
    setShowEdit(false);
  };

  useEffect(() => {
    void dispatch(getResults());
  }, []);

  useEffect(() => {
    if (canDelete) {
      void dispatch(deleteResult(selectedRow?.id as number));
    }
  }, [canDelete]);

  return (
    <Wrapper>
      <Title>Configurações dos resultados</Title>

      <Filters>
        <SearchBar
          placeholder="Pesquisar"
          value={searched}
          onChange={(searchVal): void => onSearch(searchVal as string)}
        />
        <ButtonDefault text="Lançar resultado" onClick={handleShowNewModal} />
      </Filters>

      <DataTable
        rows={filteredRows}
        columns={columns}
        loading={isLoading}
        onSelectRow={onSelectRow}
      />

      <NewResultModal show={showNew} onClose={handleCloseNewModal} />
      <EditResultModal
        show={showEdit}
        result={selectedRow}
        onClose={handleCloseEditModal}
      />
    </Wrapper>
  );
};

export default Results;
