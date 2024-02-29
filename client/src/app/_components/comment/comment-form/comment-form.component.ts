import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-comment-form', 
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {
  @Input() submitLabel!: string;
  @Input() initialText: string = '';

  @Output()
  handleSubmit = new EventEmitter<string>();

  public form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      text: [this.initialText, Validators.required],
    });
  }

  public clear(){
    this.form.get('text')?.setValue("");
  }

  onSubmit(): void {
    this.handleSubmit.emit(this.form.value.text);
    this.form.reset();
  }
}
