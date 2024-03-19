// reactive-forms-crud.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CRUDCategory } from '../crudcategory';

@Component({
  selector: 'app-reactive-forms-crud',
  templateUrl: './reactive-forms-crud.component.html',
  styleUrls: []
})
export class ReactiveFormsCrudComponent {
  public salary = ['10000', '20000', '30000', '40000', '50000'];
  public reactiveFormsCRUD: FormGroup;
  public crudcategories: CRUDCategory[] = [];
  public crudcategory: CRUDCategory;
  public isEditMode: boolean = false;
  public selectedCategoryIndex: number = -1;
  public isFormVisible: boolean = false;

  constructor(public builder: FormBuilder) {
    this.crudcategory = new CRUDCategory(0, '', '', '', '');

    this.reactiveFormsCRUD = this.builder.group({
      'name': ['', Validators.required],
      'country': ['', Validators.required],
      'salary': ['', Validators.required],
      'email': ['', [Validators.required, Validators.email]]
    });

    this.crudcategories.push(
      new CRUDCategory(1, 'John', 'USA', '20000', 'john@example.com'),
      new CRUDCategory(2, 'Emily', 'Canada', '30000', 'emily@example.com'),
      new CRUDCategory(3, 'David', 'UK', '40000', 'david@example.com')
    );
  }

  onSubmit() {
    if (this.reactiveFormsCRUD.valid) {
      if (this.isEditMode) {
        this.crudcategories[this.selectedCategoryIndex] = this.reactiveFormsCRUD.value;
        this.isEditMode = false;
      } else {
        this.crudcategories.push(this.reactiveFormsCRUD.value);
      }
      this.reactiveFormsCRUD.reset();
    }
  }

  editCategory(index: number) {
    this.isEditMode = true;
    this.selectedCategoryIndex = index;
    this.reactiveFormsCRUD.patchValue(this.crudcategories[index]);
  }

  deleteCategory(index: number) {
    this.crudcategories.splice(index, 1);
  }
  getTotalSalary(): number {
    let total = 0;
    for (let category of this.crudcategories) {
      total += parseInt(category.salary);
    }
    return total;
  }

  toggleFormVisibility() {
    this.isFormVisible = !this.isFormVisible;
  }
}
