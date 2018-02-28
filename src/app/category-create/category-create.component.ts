import { Component, OnInit } from '@angular/core';
import {NgModel} from "@angular/forms";

import { Category } from "../shared/category";
import {CATEGORIES} from "../shared/mock-categories";
import {Person} from "../shared/person";
import {PERSONS} from "../shared/mock-persons";
import {Language} from "../shared/language";
import {LANGUAGES} from "../shared/mock-languages";
import {AccessLevel} from "../shared/accessLevel";
import {ACCESSLEVELS} from "../shared/mock-accessLevels";
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

  cat: Category;

  items: Category[] = [];

  addCategory(): void {
    this.categoryService.addCategory(this.nameCAT, this.languages[0]);
  }

  ngOnInit() {
    this.items = this.categoryService.getCategories();
  }

}
