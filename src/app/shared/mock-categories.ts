import { Category } from './category';

export const CATEGORIES: Category[] = [
  new Category(1, 'Тест1', 1, 1, [1,2,4],),
  new Category(2, 'Тест2', 1, 2, [1,3,4]),
  new Category(3, 'Тест3', 2, 3, [1,3,6]),
  new Category(4, 'Тест4', 3, 4, [1,3,2]),
  new Category(5, 'Тест5', 1, 5, [1]),
  new Category(6, 'Тест6', 3, 6, [3,4]),
  new Category(7, 'Тест7', 1, 6, [4]),
  new Category(8, 'Тест8', 1, 6, [1])
];
