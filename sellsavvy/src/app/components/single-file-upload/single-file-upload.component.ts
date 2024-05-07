import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'single-file-upload',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './single-file-upload.component.html',
  styleUrl: './single-file-upload.component.scss',
})
export class SingleFileUploadComponent {
  status: 'initial' | 'uploading' | 'success' | 'fail' = 'initial';
  file: File | null = null;

  @Input() chooseFileMessage = 'Choose a file';

  @Output() upload = new EventEmitter<FormData>();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  onChange(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.status = 'initial';
      this.file = file;
    }
  }

  onUpload() {
    if (this.file) {
      const formData = new FormData();
      formData.append('image', this.file, this.file.name);
      this.upload.emit(formData);
    }
  }
}
