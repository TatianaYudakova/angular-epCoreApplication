import { Component, OnInit } from '@angular/core';
import {NgModel} from "@angular/forms";

import { Category } from "../shared/category";
import {CATEGORIES} from "../shared/mock-categories";
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

  addCat: false;
  languages = LANGUAGES;
  persons = PERSONS;

  nameCAT = '';
  languageCAT: Language;
  isPublic = false;
  persons_id: number[] = [];
  selectedPerson: Person[] = [];

  items: Category[] = [];

  addCategory(): void {
    if(this.isPublic == true){
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
    this.selectedPerson.push(person);
    console.log(person);
  }

  ngOnInit() {
    this.items = this.categoryService.getCategories();
  }

}
