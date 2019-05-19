import styled from 'styled-components';

const Table = styled.table`
  border-spacing: 0;
  width: 100%;
  border: 1px solid #ededed;
  thead {
    font-size: 10px;
  }
  td,
  th {
    border-bottom: 1px solid #ededed;
    border-right: 1px solid #ededed;
    padding: 5px;
    position: relative;
    &:last-child {
      border-right: none;
      width: 150px;
      button {
        width: 100%;
      }
    }
    label {
      padding: 10px 5px;
      display: block;
    }
  }
  tr {
    &:hover {
      background: #ededed;
    }
  }
`;

export default Table;