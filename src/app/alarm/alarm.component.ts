import { Component } from '@angular/core';

@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.scss']
})
export class AlarmComponent {
  comment = ""
  //Current Time Varible Declaration
  weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  day: number | any
  hh: number | any
  mm: number | any
  ss: number | any
  zone = ""

  //Set Alarm Varible Declaration
  h = "00"
  m = "00"
  ampm = "PM"

  alarmSet: any
  snooze: any
  audio = new Audio("../assets/Morning Alarm.mp3")

  ngOnInit(): void {
    this.audio.load()
    setInterval(this.renderTime, 1000);
  }
  //Current Time Display
  renderTime = () => {
    const currentDate = new Date();
    let day = currentDate.getDay()
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let seconds = currentDate.getSeconds();
    this.day = this.weekDays[day]
    this.zone = hours >= 12 ? "PM" : "AM";
    if (hours > 12) {
      this.hh = hours % 12;
      this.hh = this.hh ? this.hh : 12
      this.hh = this.hh < 10 ? '0' + this.hh : this.hh
    } else {
      this.hh = hours < 10 ? '0' + hours : hours
    }
    this.mm = minutes < 10 ? '0' + minutes : minutes
    this.ss = seconds < 10 ? '0' + seconds : seconds
  }
  //Set Alarm
  interval(currentDate: Date) {
    this.comment = 'Alarm set : ' + this.h + ':' + this.m + ' ' + this.ampm
    const hour = currentDate.getHours()
    if (this.h == this.hh && this.m == this.mm && this.ampm == this.zone) {
      this.audio.play()
    }
  }

  setAlarm() {
    this.alarmSet = setInterval(() => {
      const date = new Date()
      this.interval(date)
    }, 1000)
  }

  snoozeAlarm() {
    let sh = parseInt(this.h);
    let sm = parseInt(this.m);
    if (sm != 0 || sh != 0) { // 06:55
      let snoozmin = 5;
      if (this.mm < 50) { // 55 
        clearInterval(this.alarmSet)
        this.audio.pause();
        this.comment = "Alarm snoozed for 05 minutes from now";
        sm += snoozmin; // 
        this.hh = this.hh; // 06
      }
      else if (sm >= 50) { // 06:55,   55 >= 50 true
        clearInterval(this.alarmSet)
        this.audio.pause();
        this.comment = "Alarm snoozed for 10 minutes from now";
        snoozmin = (sm + snoozmin) - 60; // (55 + 10) - 60 = 5 
        if (snoozmin == 0) { //false
          sm = 0;
        }
        sh = sh + 1;
      }
      this.snooze = setInterval(() => {
        if (sh == this.hh && sm == this.mm) {
          this.audio.play();
          clearInterval(this.snooze);
        }
        console.log(this.snooze);
      }, 1000);
    }
  }
  dismissAlarm() {
    this.cleartextbox();
    if (this.h == "00" && this.m == "00")
      clearInterval(this.alarmSet);
    clearInterval(this.snooze);
    this.audio.pause();
    this.cleartextbox();
  }
  cleartextbox() {
    this.h = "00";
    this.m = "00";
    this.ampm = "PM";
    this.comment = "";
  }
}
