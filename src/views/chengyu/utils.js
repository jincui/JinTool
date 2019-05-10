
/* eslint-disable */

import json from './chengyu.json';
// export function readFile() {
//   const reader = new FileReader();
//   reader.onload = (evt) => {
//     console.log(evt);
//   }
//   reader.readAsText(new File('test', './chengyu.txt'));
// }

export function getData() {
  
  return json.data;
}

