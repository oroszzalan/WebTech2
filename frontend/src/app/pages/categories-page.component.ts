import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../services/category.service';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container">
      <div class="card">
        <h1>Kategóriák</h1>
        <form [formGroup]="form" (ngSubmit)="save()">
          <div class="grid-2">
            <div>
              <label>Név</label>
              <input formControlName="name" />
            </div>
            <div>
              <label>Leírás</label>
              <input formControlName="description" />
            </div>
          </div>
          <div class="error" *ngIf="error">{{ error }}</div>
          <div class="flex">
            <button type="submit">{{ editingId ? 'Mentés' : 'Új kategória' }}</button>
            <button type="button" class="secondary" (click)="resetForm()">Mégse</button>
          </div>
        </form>
      </div>

      <div class="card">
        <table class="table">
          <thead>
            <tr>
              <th>Név</th>
              <th>Leírás</th>
              <th>Művelet</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let category of categories">
              <td>{{ category.name }}</td>
              <td>{{ category.description }}</td>
              <td>
                <div class="flex">
                  <button style="width:auto" class="secondary" (click)="edit(category)">Szerkeszt</button>
                  <button style="width:auto" class="danger" (click)="remove(category._id)">Töröl</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class CategoriesPageComponent {
  private fb = inject(FormBuilder);
  private categoryService = inject(CategoryService);

  categories: any[] = [];
  editingId = '';
  error = '';

  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    description: ['']
  });

  constructor() {
    this.load();
  }

  load() {
    this.categoryService.getAll().subscribe((data) => (this.categories = data));
  }

  save() {
    if (this.form.invalid) return;
    const request = this.editingId
      ? this.categoryService.update(this.editingId, this.form.getRawValue())
      : this.categoryService.create(this.form.getRawValue());

    request.subscribe({
      next: () => {
        this.resetForm();
        this.load();
      },
      error: (err) => (this.error = err.error?.message || 'Mentési hiba')
    });
  }

  edit(category: any) {
    this.editingId = category._id;
    this.form.patchValue(category);
  }

  remove(id: string) {
    if (!confirm('Biztosan törlöd a kategóriát?')) return;
    this.categoryService.delete(id).subscribe(() => this.load());
  }

  resetForm() {
    this.editingId = '';
    this.error = '';
    this.form.reset({ name: '', description: '' });
  }
}
