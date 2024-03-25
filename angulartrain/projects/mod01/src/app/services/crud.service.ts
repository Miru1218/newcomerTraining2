import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CRUDCategory } from '../crudcategory';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  public crudcategories: CRUDCategory[] = [
    new CRUDCategory(1, 'John', 'USA', '20000', 'john@example.com'),
    new CRUDCategory(2, 'Emily', 'Canada', '30000', 'emily@example.com'),
    new CRUDCategory(3, 'David', 'UK', '40000', 'david@example.com')
  ];

  private crudCategoriesSubject: BehaviorSubject<CRUDCategory[]> = new BehaviorSubject<CRUDCategory[]>(this.crudcategories);

  constructor() { }

  getCrudCategories(): Observable<CRUDCategory[]> {
    return this.crudCategoriesSubject.asObservable();
  }

  addCrudCategory(category: CRUDCategory): void {
    this.crudcategories.push(category);
    this.crudCategoriesSubject.next(this.crudcategories);
  }

  updateCrudCategory(index: number, category: CRUDCategory): void {
    this.crudcategories[index] = category;
    this.crudCategoriesSubject.next(this.crudcategories);
  }

  deleteCrudCategory(index: number): void {
    this.crudcategories.splice(index, 1);
    this.crudCategoriesSubject.next(this.crudcategories);
  }
}
