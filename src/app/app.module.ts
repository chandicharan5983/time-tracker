import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TimerListComponent } from './timer-list/timer-list.component';
import { TimerContainerComponent } from './timer-container/timer-container.component';
import { CreateTimerFormComponent } from './create-timer-form/create-timer-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TimerListComponent,
    TimerContainerComponent,
    CreateTimerFormComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
