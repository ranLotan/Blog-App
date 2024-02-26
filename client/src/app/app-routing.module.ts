import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './_components/register/register.component';
import { BlogsComponent } from './_components/blogs/blogs.component';


const routes: Routes = [
  {path: 'blogs', component: BlogsComponent},
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
