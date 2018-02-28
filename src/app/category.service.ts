import { Category } from "./shared/category";
import { CATEGORIES } from "./shared/mock-categories";
import {Language} from "./shared/language";
import {Person} from "./shared/person";

export class CategoryService{

  getCategories(): Category[] {
    return CATEGORIES;
  }

  addCategory(name: string, language: Language, isPublic: boolean, persons: number[]){
    CATEGORIES.sort(function (a:Category, b: Category) {
      return a.id-b.id;
    });
    CATEGORIES.push(new Category(CATEGORIES[CATEGORIES.length-1].id+1, name, language.id, isPublic, persons));
  }

}
