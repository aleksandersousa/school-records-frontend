import React, { useCallback } from 'react';
import { Body, Container, Footer, Header, Label, Text, Wrapper } from './styles';
import { ListProps } from './typing';

const List: React.FC<ListProps> = ({ results }) => {
  const getTotalHours = useCallback((): number => {
    const total = results.reduce(
      (prev, current): number =>
        Math.abs(prev) + Math.abs(Number(current.college_subject?.workload)),
      0
    );
    return total;
  }, [results]);

  const getAverage = useCallback((): number => {
    const average =
      results.reduce((a, b) => Math.abs(a) + Math.abs(Number(b.note)), 0) /
      results.length;
    return average;
  }, []);

  return (
    <Container>
      <Header>
        <Label width="70%">Nome da Disciplina</Label>
        <Label width="60%">Carga horária</Label>
        <Label width="60%">Resultado</Label>
        <Label width="8%">Nota</Label>
      </Header>

      <Body>
        {results?.map(result => (
          <Wrapper key={result.id}>
            <Text width="71%">{result.college_subject?.name}</Text>
            <Text width="60%"> {result.college_subject?.workload}</Text>
            <Text width="61%">{result.type_of_result?.description}</Text>
            <Text width="7%">{result.note}</Text>
          </Wrapper>
        ))}
      </Body>

      <Footer>
        <Label width="71%">Total/Média</Label>
        <Text width="61%">{getTotalHours()}</Text>
        <Text width="60%"></Text>
        <Text width="7%">{getAverage()}</Text>
      </Footer>
    </Container>
  );
};

export default List;
