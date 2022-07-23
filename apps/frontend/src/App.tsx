import "./App.module.css";

import { useEffect, useState } from "react";
import styled from "styled-components";

const OuterApp = styled.div`
  padding: 24px 48px;
`;

const Table = styled.table`
  border-collapse: collapse;
  text-align: center;
  width: 100%;

  color: #555;
  font-size: 24px;
  line-height: 1.5;
`;

const TableRow = styled.tr`
  :hover {
    background-color: #f5f5f5;
  }
`;

const TableData = styled.td`
  padding: 0 16px;
`;

type Fact = {
  info: string;
  source: string;
};

export default function App() {
  const [facts, setFacts] = useState<Fact[]>([]);
  const [listening, setListening] = useState(false);

  useEffect(() => {
    if (!listening) {
      const events = new EventSource("http://localhost:3000/events");

      events.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);

        setFacts((facts) => facts.concat(parsedData));
      };

      setListening(true);
    }
  }, [listening]);

  return (
    <OuterApp>
      <Table>
        <thead>
          <tr>
            <th>Fact</th>
            <th>Source</th>
          </tr>
        </thead>

        <tbody>
          {facts.map((fact, i) => (
            <TableRow key={i}>
              <TableData>{fact.info}</TableData>
              <TableData>{fact.source}</TableData>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </OuterApp>
  );
}
