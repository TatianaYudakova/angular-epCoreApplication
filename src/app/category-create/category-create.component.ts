import { Component, OnInit, Input } from '@angular/core';
import {NgModel} from "@angular/forms";

import { Category } from "../shared/category";
import {Person} from "../shared/person";
import {PERSONS} from "../shared/mock-persons";
import {Language} from "../shared/language";
import {LANGUAGES} from "../shared/mock-languages";
import { CategoryService } from "../category.service";

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css'],
  providers: [CategoryService]
})
export class CategoryCreateComponent implements OnInit {

  constructor(private categoryService: CategoryService) { }

  @Input() addCat: boolean;

  languages = LANGUAGES;
  persons = PERSONS;

  nameCAT = '';
  languageCAT: Language;
  isPublic = false;
  persons_id: number[] = [];
  selectedPerson: Person[] = [];
  category: Category;

  items: Category[] = [];

  addCategory(): void {
    if(this.isPublic == true){
      this.persons_id = [];
      for(let i = 0; i < PERSONS.length; i++){
        this.persons_id.push(PERSONS[i].id);
      }
    } else {
      for(let i = 0; i < this.selectedPerson.length; i++){
        this.persons_id.push(this.selectedPerson[i].id);
      }
    }
    this.categoryService.addCategory(this.nameCAT, this.languageCAT, this.isPublic, this.persons_id);
  }

  addPerson(person: Person): void {
    if(!this.selectedPerson.includes(person)) {
      this.selectedPerson.push(person);
    }
  }

  removeCategory(): void {
    this.categoryService.deleteCategory(this.category);
  }

  close(): void {
    this.addCat = false;
    this.nameCAT = '';
    this.isPublic = false;
    this.persons_id = [];
    this.selectedPerson = [];
    this.category = null;
    this.languageCAT = null;
  }

  ngOnInit() {
    this.items = this.categoryService.getCategories();
  }

}
