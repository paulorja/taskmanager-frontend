import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { DragDropModule } from '@angular/cdk/drag-drop'
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule, MAT_DATE_LOCALE } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KanbanComponent } from './kanban/kanban.component';
import { CardComponent } from './card/card.component';
import { CardDialogComponent } from './card-dialog/card-dialog.component';
import { CardListComponent } from './card-list/card-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { LoadingSnackbarComponent } from './loading-snackbar/loading-snackbar.component';

@NgModule({
  declarations: [
    AppComponent,
    KanbanComponent,
    CardComponent,
    CardDialogComponent,
    CardListComponent,
    NavbarComponent,
    ConfirmDialogComponent,
    LoadingSnackbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DragDropModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatProgressBarModule
  ],
  providers: [
    MatDatepickerModule,
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  ],
  entryComponents: [
    LoadingSnackbarComponent,
    CardDialogComponent,
    ConfirmDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
