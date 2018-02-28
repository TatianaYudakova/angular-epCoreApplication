import { Category } from "./shared/category";
import { CATEGORIES } from "./shared/mock-categories";
import {Language} from "./shared/language";

export class CategoryService{

  getCategories(): Category[] {
    return CATEGORIES;
  }

  addCategory(name: string, language: Language){
    CATEGORIES.sort(function (a:Category, b: Category) {
      return a.id-b.id;
    });
    CATEGORIES.push(new Category(CATEGORIES[CATEGORIES.length-1].id+1, name, language.id));
  }

}
