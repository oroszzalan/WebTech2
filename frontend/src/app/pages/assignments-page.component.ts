import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AssignmentService } from '../services/assignment.service';
import { AssetService } from '../services/asset.service';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container">
      <div class="card">
        <h1>Eszköz kiadása</h1>
        <form [formGroup]="form" (ngSubmit)="save()">
          <div class="grid-2">
            <div>
              <label>Eszköz</label>
              <select formControlName="asset">
                <option value="">Válassz eszközt</option>
                <option *ngFor="let asset of availableAssets" [value]="asset._id">
                  {{ asset.name }} - {{ asset.serialNumber }}
                </option>
              </select>
            </div>
            <div>
              <label>Név</label>
              <input formControlName="assigneeName" />
            </div>
            <div>
              <label>Email</label>
              <input formControlName="assigneeEmail" />
            </div>
            <div>
              <label>Megjegyzés</label>
              <input formControlName="note" />
            </div>
          </div>
          <div class="error" *ngIf="error">{{ error }}</div>
          <button type="submit">Kiadás rögzítése</button>
        </form>
      </div>

      <div class="card">
        <h2>Kiadási lista</h2>
        <table class="table">
          <thead>
            <tr>
              <th>Eszköz</th>
              <th>Felhasználó</th>
              <th>Email</th>
              <th>Kiadva</th>
              <th>Visszahozva</th>
              <th>Művelet</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of assignments">
              <td>{{ item.asset?.name }}</td>
              <td>{{ item.assigneeName }}</td>
              <td>{{ item.assigneeEmail }}</td>
              <td>{{ item.assignedAt | date:'yyyy-MM-dd HH:mm' }}</td>
              <td>{{ item.returnedAt ? (item.returnedAt | date:'yyyy-MM-dd HH:mm') : '—' }}</td>
              <td>
                <button
                  style="width:auto"
                  class="success"
                  [disabled]="item.returnedAt"
                  (click)="returnItem(item._id)">
                  Visszavétel
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class AssignmentsPageComponent {
  private fb = inject(FormBuilder);
  private assignmentService = inject(AssignmentService);
  private assetService = inject(AssetService);

  assignments: any[] = [];
  availableAssets: any[] = [];
  error = '';

  form = this.fb.nonNullable.group({
    asset: ['', Validators.required],
    assigneeName: ['', Validators.required],
    assigneeEmail: ['', [Validators.required, Validators.email]],
    note: ['']
  });

  constructor() {
    this.load();
  }

  load() {
    this.assignmentService.getAll().subscribe((data) => (this.assignments = data));
    this.assetService.getAll({ status: 'available' }).subscribe((data) => (this.availableAssets = data));
  }

  save() {
    if (this.form.invalid) return;
    this.error = '';

    this.assignmentService.create(this.form.getRawValue()).subscribe({
      next: () => {
        this.form.reset({ asset: '', assigneeName: '', assigneeEmail: '', note: '' });
        this.load();
      },
      error: (err) => (this.error = err.error?.message || 'Mentési hiba')
    });
  }

  returnItem(id: string) {
    this.assignmentService.returnItem(id).subscribe(() => this.load());
  }
}
