import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConversorService, MoedaService } from '../services';
import { Moeda, Conversao, ConversaoResponse } from '../models';

@Component({
  selector: 'app-conversor',
  templateUrl: './conversor.component.html',
  styleUrls: ['./conversor.component.css']
})
export class ConversorComponent implements OnInit {

  moedas: Moeda[];
  conversao: Conversao;
  possuiErro: boolean;
  conversaoResponse: ConversaoResponse;

  

  @ViewChild("conversaoForm", {static: true})conversaoForm: NgForm;


  constructor(private moedaService: MoedaService,
    private conversorService: ConversorService) { }

  ngOnInit(): void {
    this.moedas = this.moedaService.listarTodas();
    this.init();
  }

  /**
   * Efetua a chamada dos valores predeterminados da conversão.
   */

  init(): void {
    this.conversao = new Conversao('EUR', 'BRL', null);
    this.possuiErro = false;
  }

  converter(): void {
    if(this.conversaoForm.form.valid){
      this.conversorService.converter(this.conversao).subscribe(
        response => this.conversaoResponse = response,
        error => this.possuiErro = true
      )
    }
  }

}
