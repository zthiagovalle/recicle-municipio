import { Component, OnInit } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public sendEmail(e: Event) {
    e.preventDefault();
    emailjs.sendForm('service_zrezpv5', 'template_oz6rxq1', e.target as HTMLFormElement, 'CMgrFtG25XhOyPQKp')
      .then((result: EmailJSResponseStatus) => {
        console.log(result.text);
      }, (error: any) => {
        console.log(error.text);
      });
  }
}