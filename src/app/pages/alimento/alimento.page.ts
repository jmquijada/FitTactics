import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {IAlimento} from '../../interfaces/interfaces';
import {ActionSheetController, AlertController} from '@ionic/angular';
import {DataLocalService} from '../../services/data-local.service';

@Component({
    selector: 'app-alimento',
    templateUrl: './alimento.page.html',
    styleUrls: ['./alimento.page.scss'],
})
export class AlimentoPage implements OnInit {

    idAlimento: number;
    alimento: IAlimento;
    enFavoritos = false;

    // tslint:disable-next-line:max-line-length
    constructor(private actionSheetCtrl: ActionSheetController,
                private datalocalService: DataLocalService,
                private route: ActivatedRoute,
                private router: Router,
                private title: Title,
                private alertCtrl: AlertController) {
    }

    // Obtiene del padre los datos para cada alimento individualmente
    ngOnInit() {
        this.idAlimento = this.route.snapshot.params['id'];

        // El 0 último está ahí porque esto retorna un array de 1 posición y queremos coger solamente el objeto
        this.alimento = this.route.snapshot.data['alimento'][0];
        console.log(this.alimento);
        if (!this.alimento) {
            this.noExisteAlimento();
        }
    }

    // lanza el menú de opciones, para agregar a favorito
    async lanzarMenu() {

        let guardarBorrarBtn;

        if (this.enFavoritos) {
            guardarBorrarBtn = {
                text: 'Borrar Favorito',
                icon: 'trash',
                cssClass: 'action-dark',
                handler: () => {
                    console.log('Borrar de favoritos');
                    this.datalocalService.borrarAlimento(this.alimento);
                }
            };
        } else {
            guardarBorrarBtn = {
                text: 'Favorito',
                icon: 'star',
                cssClass: 'action-dark',
                handler: () => {
                    console.log('Favorito');
                    this.enFavoritos = true;
                    this.datalocalService.guardarAlimento(this.alimento);
                }
            };
        }
        const actionSheet = await this.actionSheetCtrl.create({
            buttons: [
                guardarBorrarBtn,
                {
                    text: 'Cancelar',
                    icon: 'close',
                    cssClass: 'action-dark',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }]
        });
        await actionSheet.present();
    }

    // En caso de que el alimento a buscar no exista
    async noExisteAlimento() {
        const alert = await this.alertCtrl.create({
            header: 'Alimento no Encontrado',
            message: 'Está intentando acceder a un alimento que no existe',
            buttons: [
                {
                    text: 'Volver',
                    handler: () => {
                        this.router.navigate(['/main/tabs/tab2']);
                    }
                }
            ]
        });

        await alert.present();
    }
}
