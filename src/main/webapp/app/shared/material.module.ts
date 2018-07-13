import { NgModule } from '@angular/core';

import {
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatSidenavModule,
    MatListModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
} from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
    imports: [
        MatButtonModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatDialogModule,
        MatInputModule,
        MatCheckboxModule,
        MatDividerModule,
        MatSidenavModule,
        MatListModule,
        MatExpansionModule,
        MatGridListModule,
        MatTableModule,
        MatSortModule,
        MatProgressSpinnerModule,
        MatChipsModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatSelectModule,
        MatPaginatorModule
    ],
    exports : [
        MatButtonModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatDialogModule,
        MatInputModule,
        MatCheckboxModule,
        MatDividerModule,
        MatSidenavModule,
        MatListModule,
        MatExpansionModule,
        MatGridListModule,
        MatTableModule,
        MatSortModule,
        MatProgressSpinnerModule,
        MatChipsModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatSelectModule,
        MatPaginatorModule
    ],
})
export class MaterialModule {}
