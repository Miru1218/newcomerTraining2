import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CRUDCategory } from '../crudcategory';

@Component({
  selector: 'app-reactive-forms-crud',
  templateUrl: './reactive-forms-crud.component.html',
  styleUrls: []
})

export class ReactiveFormsCrudComponent implements OnInit {
  public salary = ['10000', '20000', '30000', '40000', '50000'];
  public reactiveFormsCRUD!: FormGroup;
  public crudcategories: CRUDCategory[] = [];
  public isEditMode: boolean = false;
  public selectedCategoryIndex: number = -1;
  public isFormVisible: boolean = false;
  public searchText: string = '';
  public isDeleteDisabled: boolean = false;
  public isSaveButtonDisabled: boolean = false;


  constructor(public builder: FormBuilder) { }

  ngOnInit() {
    this.reactiveFormsCRUD = this.builder.group({
      'name': ['', Validators.required],
      'country': ['', Validators.required],
      'salary': ['', Validators.required],
      'email': ['', [Validators.required, Validators.email]],
    });

    this.crudcategories.push(
      new CRUDCategory(1, 'John', 'USA', '20000', 'john@example.com'),
      new CRUDCategory(2, 'Emily', 'Canada', '30000', 'emily@example.com'),
      new CRUDCategory(3, 'David', 'UK', '40000', 'david@example.com')
    );
  }

  onSubmit() {

    if (this.reactiveFormsCRUD.invalid) {
      return;
    }

    if (this.isEditMode) {
      this.crudcategories[this.selectedCategoryIndex] = this.reactiveFormsCRUD.value;
      this.isEditMode = false;
    } else {
      this.crudcategories.push(this.reactiveFormsCRUD.value);
    }
    this.reactiveFormsCRUD.reset();
  }

  editCategory(index: number) {
    this.isEditMode = true;
    this.isFormVisible = true;
    this.selectedCategoryIndex = index;
    this.reactiveFormsCRUD.patchValue(this.crudcategories[index]);
    this.isDeleteDisabled = true;
    this.isSaveButtonDisabled = false;
  }

  deleteCategory(index: number) {
    if (index === this.selectedCategoryIndex) {
      this.isFormVisible = false;
      this.selectedCategoryIndex = -1;
    }
    this.crudcategories.splice(index, 1);
  }

  getTotalDisplayedSalary(): number {
    let total = 0;
    for (let category of this.crudcategories) {
      if (category.name.toLowerCase().includes(this.searchText.toLowerCase())) {
        total += parseInt(category.salary);
      }
    }
    return total;
  }

  toggleFormVisibility() {
    this.isFormVisible = !this.isFormVisible;
    if (!this.isFormVisible) {
      this.reactiveFormsCRUD.reset();
      const salaryControl = this.reactiveFormsCRUD.get('salary');
      if (salaryControl) {
        salaryControl.setValue('');
      }
      this.isEditMode = false;
      this.isDeleteDisabled = false;
      this.isSaveButtonDisabled = false;
    }
  }

  addMode() {
    this.isFormVisible = true;
    this.reactiveFormsCRUD.reset();
    this.isEditMode = false;
    this.isDeleteDisabled = true;
  }

}
