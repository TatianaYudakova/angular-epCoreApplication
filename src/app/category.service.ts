import { Category } from "./shared/category";
import { CATEGORIES } from "./shared/mock-categories";
import {Language} from "./shared/language";

export class CategoryService{

  getCategories(): Category[] {
    return CATEGORIES;
  }

  addCategory(name: string, language: Language){
    console.log(new Category(name, language.id));
    CATEGORIES.push(new Category(name, language.id));
    console.log(CATEGORIES);
  }

}
