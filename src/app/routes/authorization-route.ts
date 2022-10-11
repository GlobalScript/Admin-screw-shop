import { LoginComponent } from "../authorization/login/login.component";
import { RegistrationComponent } from "../authorization/registration/registration.component";

export const authorizationRoute = [
    {path: 'login', component: LoginComponent},
    {path: 'registration', component: RegistrationComponent},
];