import { Category } from "../shared/category";
import { CATEGORIES } from "../shared/mock-categories";

export class CategoryService{

  private index: number;

  getCategories(): Category[] {
    return CATEGORIES;
  }

  addCategory(id: number, name: string, language_id: number, isPublic: boolean, persons: number[]) {
    if (id == 0) {
      CATEGORIES.sort(function (a: Category, b: Category) {
        return a.id - b.id;
      });
      CATEGORIES.push(new Category(CATEGORIES[CATEGORIES.length - 1].id + 1, name, language_id, isPublic, persons));
    } else {
        this.index = CATEGORIES.findIndex(category => {return category.id == id});
        CATEGORIES[this.index] = new Category(id, name, language_id, isPublic, persons, CATEGORIES[this.index].id_doc);
      }
    }

  deleteCategory(category: Category){
    if(CATEGORIES.includes(category)) {
      CATEGORIES.splice(CATEGORIES.indexOf(category), 1);
    }
  }

}
