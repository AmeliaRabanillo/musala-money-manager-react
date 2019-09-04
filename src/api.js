import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:3001/'
});

// export default class api {
//   constructor(props) {
//     this.api = axios.create({
//       baseURL: 'http://localhost:3001/'
//     });
//   }

//   getAllOperations() {
//     this.api.get('operations').then(op => { return op.data; })
//   }


// }

