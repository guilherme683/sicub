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
MatInputModule} from '@angular/material';

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
    MatInputModule,
  ]
})
export class MaterialModule {}
