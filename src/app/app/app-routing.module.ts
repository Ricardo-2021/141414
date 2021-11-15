import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { HomeComponent } from './pages/home/home.component';
import { CreatePropertyComponent } from './pages/create-property/create-property.component';
import { UpdatePropertyComponent } from './pages/update-property/update-property.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'cadastro', component: SignUpComponent },
  {path: 'cadastroImoveis', component: CreatePropertyComponent},
  {path: 'editar/:id', component: UpdatePropertyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
