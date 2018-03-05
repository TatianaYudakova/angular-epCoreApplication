import { Category } from './category';

export const CATEGORIES: Category[] = [
  new Category(1, 'Тест1', 1, true, [1,2,3,4,5,6,7,8] ,[1,2,4],),
  new Category(2, 'Тест2', 1, false, [2,4,6],[1,3,4]),
  new Category(3, 'Тест3', 2, false, [1],[1,3,6]),
  new Category(4, 'Тест4', 3, false, [7],[1,3,2]),
  new Category(5, 'Тест5', 1, false, [1,4,6],[1]),
  new Category(6, 'Тест6', 3, false, [4],[3,4]),
  new Category(7, 'Тест7', 1, false, [7,8],[4]),
  new Category(8, 'Тест8', 1, false, [1,2,3,4],[1])
];
