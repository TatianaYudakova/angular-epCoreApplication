import { AccessLevel } from './accessLevel';

export const ACCESSLEVELS: AccessLevel[] = [
  {id: 1, acess: false, id_persons: [1,3,4]},
  {id: 2, acess: false, id_persons: [1]},
  {id: 3, acess: false, id_persons: [3,4]},
  {id: 4, acess: false, id_persons: [1,4]},
  {id: 5, acess: false, id_persons: [1,3]},
  {id: 6, acess: true, id_persons: [1,2,3,4,5,6,7,8]}
];
