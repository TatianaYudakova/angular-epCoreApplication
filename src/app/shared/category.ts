import {Language} from "./language";

export class Category {
  id: number;
  name: string;
  id_doc: number[];
  id_language: number;
  isPublic: boolean;
  id_persons: number[];

  constructor(id: number, name: string, id_language: number = 1, isPublic: boolean = true, id_persons: number[], id_doc: number[] = []){
    this.id = id;
    this.name = name;
    this.id_language = id_language;
    this.isPublic = isPublic;
    this.id_persons = id_persons;
    this.id_doc = id_doc;
  }

}
