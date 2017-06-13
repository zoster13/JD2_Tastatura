import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { CommentsService } from '../services/comments.service';
import {NgForm} from '@angular/forms';
import 'rxjs/add/operator/switchMap';

import {Comment} from '../models/Comment';

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})

export class CommentsComponent {

    comments: Comment[];
    writingComment: boolean;


    constructor(
  private commentsService: CommentsService,
  private route: ActivatedRoute,
  private location: Location
    ) 
    {
        this.writingComment = false;
    }

  ngOnInit(): void {
    this.route.params
    .switchMap((params: Params) => this.commentsService.getComments())
    .subscribe(comm => this.comments = comm);
  }

  goBack(): void {
    this.location.back();
  }

  writeComment(): void {
    this.writingComment = true;
  }

  onSubmit(comment: Comment, form: NgForm) {
      //pozvati dodavanje komentara
    }
}