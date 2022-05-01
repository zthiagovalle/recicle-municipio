import { Component, OnInit } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  msgPlaceHolder: string;

  constructor() { }

  ngOnInit(): void {
    this.msgPlaceHolder = 'Olá, tenho uma sugestão de um ponto de coleta de lixo para fazer, na rua Brasil Salomão, número 341 está coletando pilhas e plásticos';
  }

  public sendEmail(e: Event) {
    e.preventDefault();
    emailjs.sendForm('service_zrezpv5', 'template_oz6rxq1', e.target as HTMLFormElement, 'CMgrFtG25XhOyPQKp')
      .then((result: EmailJSResponseStatus) => {
        alert('E-mail enviado com sucesso, muito obrigado')
      }, (error: any) => {
        alert('Falha ao enviar e-mail, envie novamente')
      });
  }
}