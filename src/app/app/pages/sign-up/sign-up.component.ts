import { Component, ViewChild } from '@angular/core';
import { NewUser } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { ErrorMsgComponent } from 'src/app/shared/error-msg/error-msg.component';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  @ViewChild(ErrorMsgComponent) errorMsgComponent!: ErrorMsgComponent;
  public user: NewUser = {} as NewUser;
  public load: boolean = false;

  constructor(private userService: UserService, private router: Router) { }

  putMaskOnCpf(cpf: string | undefined): void {
    if (cpf) {
      this.user.cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '\$1.\$2.\$3\-\$4');
    }
  }

  onSubmit(): void {
    this.addUser(this.user);
  }

  addUser(user: NewUser): void {
    this.load = true;
    this.userService.addNewUser(user)
      .subscribe(
        (result) => {           
          this.load = false;
          this.errorMsgComponent.setSuccess('Usuário cadastrado com sucesso');         
          setTimeout(() =>{this.router.navigateByUrl('/login');}, 2500);
          
         },
        (error) => {
          if (error.status === 409) {
            this.errorMsgComponent.setError('E-Mail ou CPF já cadastrados');
            this.load = false;
          } else {
            this.errorMsgComponent.setError('Falha inesperada ao cadastrar novo usuário');
            this.load = false;
          }
        }
      );
    
  }
}
