import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Container,
  Desc,
  Header,
  HeaderInfo,
  HeaderRow,
  Label,
  Name,
  Subtitle,
  Title,
} from './styles';
import noAvatar from '@/assets/no_avatar.png';
import { List } from '@/components';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { getResultsByStudent } from '@/redux/thunks/results';
import { useParams } from 'react-router-dom';
import { Student } from '@/models';

const SchoolRecords: React.FC = () => {
  const dispatch = useAppDispatch();

  const { resultsByStudent } = useAppSelector(state => state.results);
  const { id } = useParams();

  const [student, setStudent] = useState<Student | undefined>(undefined);

  useEffect(() => {
    void dispatch(getResultsByStudent(Number(id)));
  }, []);

  useEffect(() => {
    if (resultsByStudent && resultsByStudent.length > 0) {
      setStudent(resultsByStudent[0]?.student);
    }
  }, [resultsByStudent]);

  return (
    <Container>
      <Title>Histórico escolar</Title>

      <Header>
        <Avatar src={noAvatar} />

        <HeaderInfo>
          <Name>{student?.name}</Name>
          <HeaderRow>
            <Label>Matrícula:</Label>
            <Desc>{student?.registration_number}</Desc>
          </HeaderRow>
        </HeaderInfo>
      </Header>

      <Subtitle>Curso: {student?.course?.name}</Subtitle>

      <List results={resultsByStudent} />
    </Container>
  );
};

export default SchoolRecords;
