import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-inicio',
  templateUrl: 'inicio.page.html',
  styleUrls: ['inicio.page.scss']
})
export class InicioPage {

  constructor(public fbAuth: AuthService) {

  }

  opciones = {
    slidesPerView: 1,
    freeMode: false
  };

  login(event) {

  }

}
