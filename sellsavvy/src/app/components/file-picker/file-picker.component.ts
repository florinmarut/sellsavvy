import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'file-picker',
  templateUrl: './file-picker.component.html',
  styleUrls: ['./file-picker.component.scss'],
  imports: [CommonModule],
  standalone: true,
})
export class FilePickerComponent {
  @Input() maxFiles: number = 1;
  @Input() fileFilter: string = '';
  @Output() filesSelected = new EventEmitter<File[]>();

  selectedFiles: File[] = [];

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      let files = Array.from(input.files);
      if (this.fileFilter) {
        const filterRegex = new RegExp(this.fileFilter);
        files = files.filter((file) => filterRegex.test(file.name));
      }
      if (files.length > this.maxFiles) {
        files = files.slice(0, this.maxFiles);
      }
      this.selectedFiles = files;
      this.filesSelected.emit(this.selectedFiles);
    }
  }

  removeFile(index: number) {
    this.selectedFiles.splice(index, 1);
    this.filesSelected.emit(this.selectedFiles);
  }
}
