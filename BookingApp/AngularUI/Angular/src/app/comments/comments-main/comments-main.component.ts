import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'comments-main',
  templateUrl: './comments-main.component.html',
  styleUrls: ['./comments-main.component.css'],
})

export class CommentsMainComponent {

  constructor(private router: Router) {
    
  }
}