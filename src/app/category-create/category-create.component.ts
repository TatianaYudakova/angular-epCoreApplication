import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
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
  @Input() cat: Category; //works
  @Output() onChanged = new EventEmitter<boolean>();

  languages = LANGUAGES;
  persons = PERSONS;


  nameCAT = '';
  languageCAT: Language;
  isPublic = false;
  persons_id: number[] = [];
  selectedPerson: Person[] = [];

  items: Category[] = [];

  saveCategory(): void {
    if (this.isPublic == true) {
      this.persons_id = [];
      for (let i = 0; i < PERSONS.length; i++) {
        this.persons_id.push(PERSONS[i].id);
      }
    } else {
      for (let i = 0; i < this.selectedPerson.length; i++) {
        this.persons_id.push(this.selectedPerson[i].id);
      }
    }
    if(this.cat.id == null) {
      this.categoryService.addCategory(0, this.nameCAT, this.languageCAT.id, this.isPublic, this.persons_id);
    } else {
      this.categoryService.addCategory(this.cat.id, this.nameCAT, this.languageCAT.id, this.isPublic, this.persons_id);
    }
  }

  addPerson(person: Person): void {
    if(!this.selectedPerson.includes(person)) {
      this.selectedPerson.push(person);
    }
  }

  removeCategory(): void {
    this.categoryService.deleteCategory(this.cat);
  }

  change(increased:any) {
    this.addCat = false;
    this.onChanged.emit(true);
  }

  onChangedCategory() {
    this.nameCAT = this.cat.name;
    for(let i = 0; i < LANGUAGES.length; i++){
      if(LANGUAGES[i].id == this.cat.id_language){
        this.languageCAT = LANGUAGES[i];
        break;
      }
    }
    this.isPublic = this.cat.isPublic;
    this.persons_id = this.cat.id_persons;
    this.selectedPerson = PERSONS.filter(person => {
      for(let i = 0; i < this.cat.id_persons.length; i++){
        return person.id == this.cat.id_persons[i];
      }
    });
    console.log("Я работаю");
  }

  ngOnInit() {
    this.items = this.categoryService.getCategories();
  }

}
