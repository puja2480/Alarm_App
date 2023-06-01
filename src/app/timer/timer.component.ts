import { Component } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent {
  hh = '00';
  mm = '00';
  ss = '00';
  
  h: number | any;
  m: number | any;
  s: number | any;

  isPaused = false
  startTimer: any
  
  ngOnInit() { 
    this.h = '00'
    this.m = '00'
    this.s = '00'
  }
 
  start() {
    this.h = parseInt(this.hh);
    this.m = parseInt(this.mm);
    this.s = parseInt(this.ss);
    this.startTimer = setInterval(() => {
      if (this.s >= 0) { 
        if (this.h == 0 && this.m == 0 && this.s == 0) {
          clearInterval(this.startTimer)
          return
        }
        this.s = this.s < 10 ? '0' + this.s : this.s;
        if (this.s == '00') {
          this.stopTimer()
          if (this.m != '00') {
            this.m = this.m - 1;
            this.m = this.m < 10 ? '0' + this.m : this.m;
            this.s = 60;
          }else if (this.m == '00' && this.h != '00') {
            this.h = this.h - 1
            this.h = this.h < 10 ? '0' + this.h : this.h;
            this.s = 59;
            this.m = 59;
          }else if (this.h == '00'){
            this.s = 60;
            this.m = 60;
          }
        }
      }
      this.s = this.s - 1;
    }, 1000)
  }

  stopTimer() {
    if (this.h == 0 && this.m == 0 && this.s == 0) {
      clearInterval(this.startTimer) 
    }
  }
  resume(){
    if(!this.isPaused){ 
      this.pause()
      this.isPaused = true
    }else{
      this.isPaused = false
      this.startTimer = setInterval(() => {
        if (this.s >= 0) {
          if (this.h == 0 && this.m == 0 && this.s == 0) {
            clearInterval(this.startTimer)
            return
          }
          this.s = this.s < 10 ? '0' + this.s : this.s;
          if (this.s == '00') {
            this.stopTimer()
            if (this.m != '00') {
              this.m = this.m - 1;
              this.m = this.m < 10 ? '0' + this.m : this.m;
              this.s = 60;
            }else if (this.m == '00' && this.h != '00') {
              this.h = this.h - 1
              this.h = this.h < 10 ? '0' + this.h : this.h;
              this.s = 59;
              this.m = 59;
            }else if (this.h == '00'){
              this.s = 60;
              this.m = 60;
            }
          }
        }
        this.s = this.s - 1;
      }, 1000)
    }
  }
  pause(): void {
    clearInterval(this.startTimer)
    // this.isPaused = true
  }
  clear() {
    // if (this.h != 0 || this.m != 0 || this.s != 0) {
      clearInterval(this.startTimer)
      this.hh = "00";
      this.mm = "00";
      this.ss = "00";

      this.h = "00";
      this.m = "00";
      this.s = "00";
    // }
  }
}
