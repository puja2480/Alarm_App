import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlarmComponent } from './alarm/alarm.component';
import { TimerComponent } from './timer/timer.component';

const routes: Routes = [
  { path: "", component:AlarmComponent},
  { path:"timer", component:TimerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
