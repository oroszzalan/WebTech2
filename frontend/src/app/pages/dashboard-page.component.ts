import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AssetService } from '../services/asset.service';
import { CategoryService } from '../services/category.service';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  template: `
    <div class="container">
      <div class="card">
        <h1>Eszközök</h1>
        <div class="grid-2">
          <div>
            <label>Keresés</label>
            <input [(ngModel)]="search" (input)="loadAssets()" placeholder="Név, gyári szám, hely" />
          </div>
          <div>
            <label>Státusz</label>
            <select [(ngModel)]="status" (change)="loadAssets()">
              <option value="">Összes</option>
              <option value="available">Szabad</option>
              <option value="assigned">Kiadva</option>
              <option value="repair">Javítás alatt</option>
              <option value="retired">Selejtezett</option>
            </select>
          </div>
        </div>
      </div>

      <div class="card">
        <h2>{{ editingId ? 'Eszköz szerkesztése' : 'Új eszköz felvétele' }}</h2>
        <form [formGroup]="form" (ngSubmit)="save()">
          <div class="grid-2">
            <div>
              <label>Név</label>
              <input formControlName="name" />
            </div>
            <div>
              <label>Gyári szám</label>
              <input formControlName="serialNumber" />
            </div>
            <div>
              <label>Kategória</label>
              <select formControlName="category">
                <option value="">Válassz</option>
                <option *ngFor="let category of categories" [value]="category._id">{{ category.name }}</option>
              </select>
            </div>
            <div>
              <label>Beszerzés dátuma</label>
              <input type="date" formControlName="purchaseDate" />
            </div>
            <div>
              <label>Státusz</label>
              <select formControlName="status">
                <option value="available">Szabad</option>
                <option value="assigned">Kiadva</option>
                <option value="repair">Javítás alatt</option>
                <option value="retired">Selejtezett</option>
              </select>
            </div>
            <div>
              <label>Hely</label>
              <input formControlName="location" />
            </div>
          </div>
          <label>Leírás</label>
          <textarea rows="3" formControlName="description"></textarea>
          <div class="error" *ngIf="error">{{ error }}</div>
          <div class="flex">
            <button type="submit">Mentés</button>
            <button type="button" class="secondary" (click)="resetForm()">Mégse</button>
          </div>
        </form>
      </div>

      <div class="card">
        <table class="table">
          <thead>
            <tr>
              <th>Név</th>
              <th>Gyári szám</th>
              <th>Kategória</th>
              <th>Státusz</th>
              <th>Hely</th>
              <th>Művelet</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let asset of assets">
              <td>{{ asset.name }}</td>
              <td>{{ asset.serialNumber }}</td>
              <td>{{ asset.category?.name }}</td>
              <td><span class="badge {{ asset.status }}">{{ statusLabel(asset.status) }}</span></td>
              <td>{{ asset.location }}</td>
              <td>
                <div class="flex">
                  <button style="width:auto" class="secondary" (click)="edit(asset)">Szerkeszt</button>
                  <button style="width:auto" class="danger" (click)="remove(asset._id)">Töröl</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class DashboardPageComponent {
  private assetService = inject(AssetService);
  private categoryService = inject(CategoryService);
  private fb = inject(FormBuilder);

  assets: any[] = [];
  categories: any[] = [];
  editingId = '';
  error = '';
  search = '';
  status = '';

  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    serialNumber: ['', Validators.required],
    category: ['', Validators.required],
    purchaseDate: [''],
    status: ['available', Validators.required],
    location: [''],
    description: ['']
  });

  constructor() {
    this.loadCategories();
    this.loadAssets();
  }

  loadCategories() {
    this.categoryService.getAll().subscribe((data) => (this.categories = data));
  }

  loadAssets() {
    this.assetService.getAll({ search: this.search, status: this.status }).subscribe((data) => (this.assets = data));
  }

  save() {
    if (this.form.invalid) return;
    const payload = this.form.getRawValue();
    this.error = '';

    const request = this.editingId
      ? this.assetService.update(this.editingId, payload)
      : this.assetService.create(payload);

    request.subscribe({
      next: () => {
        this.resetForm();
        this.loadAssets();
      },
      error: (err) => (this.error = err.error?.message || 'Mentési hiba')
    });
  }

  edit(asset: any) {
    this.editingId = asset._id;
    this.form.patchValue({
      name: asset.name,
      serialNumber: asset.serialNumber,
      category: asset.category?._id,
      purchaseDate: asset.purchaseDate ? asset.purchaseDate.substring(0, 10) : '',
      status: asset.status,
      location: asset.location,
      description: asset.description
    });
  }

  remove(id: string) {
    if (!confirm('Biztosan törlöd az eszközt?')) return;
    this.assetService.delete(id).subscribe(() => this.loadAssets());
  }

  resetForm() {
    this.editingId = '';
    this.error = '';
    this.form.reset({
      name: '',
      serialNumber: '',
      category: '',
      purchaseDate: '',
      status: 'available',
      location: '',
      description: ''
    });
  }

  statusLabel(status: string) {
    return {
      available: 'Szabad',
      assigned: 'Kiadva',
      repair: 'Javítás alatt',
      retired: 'Selejtezett'
    }[status] || status;
  }
}
