import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Property } from 'src/app/interfaces/property';
import { PropertyService } from 'src/app/services/property.service';
import { SharedService } from 'src/app/services/shared.service';
import { ErrorMsgComponent } from 'src/app/shared/error-msg/error-msg.component';

@Component({
  selector: 'app-create-property',
  templateUrl: './create-property.component.html',
  styleUrls: ['./create-property.component.css']
})
export class CreatePropertyComponent {
  @ViewChild(ErrorMsgComponent) errorMsgComponent!: ErrorMsgComponent;
  public title: string = 'Cadastro de Imóveis';
  public load: boolean = false;


  constructor(private propertyService: PropertyService, private router: Router, private sharedService: SharedService) { }

  createProperty(property: Property) {
    this.load = true;
    this.propertyService.addProperty(property)
      .subscribe(
        (result) => {
          this.load = false;
          this.errorMsgComponent.setSuccess('Imóvel cadastrado com sucesso');
          setTimeout(() => { this.router.navigateByUrl('/'); }, 2500);
        },
        (error) => {
          if (error.status == 401) {
            this.load = false;
            this.errorMsgComponent.setError('Autenticação expirou, faça login novamente');
            this.sharedService.cleanCokie();
            setTimeout(() => { this.router.navigateByUrl('/login'); }, 2500);
          } else {
            this.load = false;
            this.errorMsgComponent.setError('Erro inesperado ao cadastrar imóvel');
          }
        }
      );
  }
}
