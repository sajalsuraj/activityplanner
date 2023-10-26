import { memo } from "react";

function List({ listData }) {
  return (
    <ul>
      {listData &&
        listData.map((item, idx) => <li key={item.idx}>{item.name}</li>)}
    </ul>
  );
}

export default memo(List);
