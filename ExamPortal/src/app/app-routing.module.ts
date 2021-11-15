import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/AuthGuard';
import  {LoginComponent} from './login/login.component'
import  {SignUpComponent} from './sign-up/sign-up.component'

const routes: Routes = [
	{path :'login',component:LoginComponent},
	{path :'signup',component:SignUpComponent},
	{path:'home',loadChildren :()=>import('./student/student.module').then(m=>m.StudentModule),canActivate:[AuthGuard]},
	{path:'proffesior',loadChildren :()=>import('./proffesior/proffesior.module').then(m=>m.ProffesiorModule),canActivate:[AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
