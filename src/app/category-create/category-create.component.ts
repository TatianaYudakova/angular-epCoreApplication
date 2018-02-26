import { Component, OnInit } from '@angular/core';
import { Category } from "../shared/category";
import {CATEGORIES} from "../shared/mock-categories";
import {Person} from "../shared/person";
import {PERSONS} from "../shared/mock-persons";
import {Language} from "../shared/language";
import {LANGUAGES} from "../shared/mock-languages";
import {AccessLevel} from "../shared/accessLevel";
import {ACCESSLEVELS} from "../shared/mock-accessLevels";

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {

  constructor() { }

  addCat: false;

  languages = LANGUAGES;
  persons = PERSONS;
  accesslevels = ACCESSLEVELS;

  category: Category;

  ngOnInit() {
  }

  //saveCategory(name: NgModel): void {
  //}

}
