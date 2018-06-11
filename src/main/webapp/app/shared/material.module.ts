import { NgModule } from '@angular/core';

import {
MatButtonModule,
MatMenuModule,
MatToolbarModule,
MatIconModule,
MatCheckboxModule,
MatCardModule,
MatRadioModule,
MatDividerModule,
MatFormFieldModule,
MatInputModule} from '@angular/material';

import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCheckboxModule,
    MatCardModule,
    MatRadioModule,
    MatDividerModule,
    MatFormFieldModule,
    MatChipsModule,
    MatInputModule,
  ],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatRadioModule,
    MatDividerModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatChipsModule,
    MatInputModule,
  ]
})
export class MaterialModule {}
