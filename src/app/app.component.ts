import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'fotos-firebase-app';

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private titleService: Title) { }

  ngOnInit() {

   //** FUNCIONES PARA EVITAR QUE SE ABRAR IMÁGENES EN EL NAVEGADOR ** */
   window.addEventListener("dragover", e => {
      e && e.preventDefault();
      e && e.stopPropagation();
    }, false);
    window.addEventListener("drop", e => {
      e && e.preventDefault();
      e && e.stopPropagation();
    }, false);

   //********************************** */

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {

         var rt = this.getChild(this.activatedRoute);

         rt.data.subscribe(data => {
            console.log(data);
            this.titleService.setTitle(data.titulo)
         })
      });
   }

   getChild(activatedRoute: ActivatedRoute) {
    if (activatedRoute.firstChild) {
         return this.getChild(activatedRoute.firstChild);
    } else {
        return activatedRoute;
    }
   }
   
   public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
   }
}