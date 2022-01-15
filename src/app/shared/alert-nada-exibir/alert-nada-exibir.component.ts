import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-alert-nada-exibir',
  templateUrl: './alert-nada-exibir.component.html',
  styleUrls: ['./alert-nada-exibir.component.css']
})
export class AlertNadaExibirComponent implements OnInit {

  @Input() mensagem: string;
  @Input() color: string;

  constructor() { }

  ngOnInit(): void {
  }

}
