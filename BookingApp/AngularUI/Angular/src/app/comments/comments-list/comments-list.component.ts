import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {CommentsService} from '../../services/comments.service';
import {Comment} from '../../models/Comment';
import {AppUser} from '../../models/AppUser';
import {Accommodation} from '../../models/Accommodation';

@Component({
  selector: 'comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.css'],
})

export class CommentsListComponent implements OnInit {

  comments: Comment[] = [];
  comment: Comment;
  temp: any;

  uriParts: string[];
  caption: string;
  accomid: number = 0;

  isAdd: boolean = false;

  constructor(private commentsService:CommentsService,
  private router: Router,
  private route: ActivatedRoute) {
    this.comment = new Comment();
  }

  getAllComments() : void {
    this.commentsService.getAllComments()
      .then(comments => this.comments = comments);
  }

  ngOnInit() : void {

    this.uriParts =  this.router.url.split('/');

    if(this.uriParts[this.uriParts.length - 2] === 'commentlist'){
        this.route.params
        .switchMap((params: Params) => this.commentsService.getComments(+params['id']))
        .subscribe(comments => this.comments = comments);

        this.accomid = +(this.uriParts[this.uriParts.length - 1]);

        this.caption = "Comments of selected accommodation:";
        this.isAdd = true;
    }
     else{
       this.caption = "";
       this.isAdd = false;
       this.getAllComments();
     }
  }

 onSubmit(comment: any, form: NgForm):void{
      this.comment = new Comment();
      this.comment.text = comment.Text;
      this.comment.grade = comment.Grade;
      this.comment.accommodation = new Accommodation();
      this.comment.accommodation.id = this.accomid;
      this.comment.user = new AppUser();
      this.comment.user.username = JSON.parse(localStorage.getItem('currentUser'))['username'];

      this.commentsService.create(this.comment);
      
      form.resetForm();
}
}