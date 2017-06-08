import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  ime = 'Aleksandra';
  prezime = 'Misic';
  voce = [
    {"id" : "1", "naziv": "jabuka", "boja": "crvena"},
    {"id" : "2", "naziv": "limun", "boja": "zuta"},
    {"id" : "3", "naziv": "kruska", "boja": "zuta"}
  ]
}
