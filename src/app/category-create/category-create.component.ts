import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {NgModel} from "@angular/forms";

import { Category } from "../shared/category";
import {Person} from "../shared/person";
import {PERSONS} from "../shared/mock-persons";
import {Language} from "../shared/language";
import {LANGUAGES} from "../shared/mock-languages";
import { CategoryService } from "../category.service";
import {CATEGORIES} from "../shared/mock-categories";
import {NgxSmartModalService} from "ngx-smart-modal";

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css'],
  providers: [CategoryService]
})
export class CategoryCreateComponent implements OnInit {

  constructor(private categoryService: CategoryService) { }

  @Input() isAddCategory: boolean;
  @Output() onChanged = new EventEmitter<boolean>();

  private _category: Category;

  @Input() set category(value: Category) {
    this._category = value;
    this.nameCategory = value.name;
    this.languageCategory = LANGUAGES.find(l => {
      return l.id == value.id_language;
    });
    this.isPublic = value.isPublic;
    this.persons_id = value.id_persons;
    this.selectedPersons = PERSONS.filter(p => {
      for(let i = 0; i < value.id_persons.length; i++){
        return p.id == value.id_persons[i];
      }
    });
  }

  get category(): Category {
    return this._category;
  }

  languages = LANGUAGES;
  persons = PERSONS;


  nameCategory = '';
  languageCategory: Language;
  isPublic = false;
  persons_id: number[] = [];
  selectedPersons: Person[];

  items: Category[] = [];

  saveCategory(): void {

    if (this.isPublic == true) {
      this.persons_id = [];
      for (let i = 0; i < PERSONS.length; i++) {
        this.persons_id.push(PERSONS[i].id);
      }
    }

    if(this.category.id == null) {
      this.categoryService.addCategory(0, this.nameCategory, this.languageCategory.id, this.isPublic, this.persons_id);
    } else {
      this.categoryService.addCategory(this.category.id, this.nameCategory, this.languageCategory.id, this.isPublic, this.persons_id);
    }
  }

  addPerson(person_id: number): void {
      if (!this.persons_id.includes(person_id)) {
        this.persons_id.push(person_id);
      }
  }

  deleteCategory(): void {
    console.log(this.category);
    this.categoryService.deleteCategory(this.category);
  }

  close(increased:any) {
    this.isAddCategory = false;
    this.onChanged.emit(true);

    this.nameCategory = this.category.name;
    this.languageCategory = LANGUAGES.find(l => {
      return l.id == this.category.id_language
    });
    this.isPublic = this.category.isPublic;
    this.persons_id = this.category.id_persons;
    this.selectedPersons = PERSONS.filter(p => {
      for(let i = 0; i < this.category.id_persons.length; i++){
        return p.id == this.category.id_persons[i];
      }
    });
  }

  ngOnInit() {
    this.items = this.categoryService.getCategories();
  }

}
