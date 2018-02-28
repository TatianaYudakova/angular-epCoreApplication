import {Language} from "./language";

export class Category {
  id: number;
  name: string;
  id_doc: number[];
  id_language: number;
  id_access: number;

  constructor(id: number, name: string, id_language: number = 1, id_access: number = 6, id_doc: number[] = []){
    this.name = name;
    this.id_language = id_language;
    this.id_doc = id_doc;
    this.id = id;
    this.id_access = id_access;
  }

}
