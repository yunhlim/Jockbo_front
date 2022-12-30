import { useEffect, useState } from 'react';
import { JockBoItemInfo } from '../store/types';

interface props {
  items: JockBoItemInfo[];
}

export default function JockBoList({ items }: props) {
  const jockBoTableData = useState({});
  useEffect(() => {
    let num = 0;
    for (const item of items) {
      if (item.mySae in jockBoTableData) {
        // if (jockBoTableData[item.mySae].length())
      }
    }
  }, []);
  return (
    <table>
      <tbody>
        <tr>
          <td>The table body</td>
          <td>with two columns</td>
        </tr>
        <tr>
          <td>The table body</td>
          <td>with two columns</td>
        </tr>
      </tbody>
    </table>
  );
}
