import { GifsService } from './../../../services/gifs.service';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Buscar:</h5>
    <input
      class="form-control"
      type="text"
      placeholder="Buscar GIF's..."
      (keyup.enter)="searchTag()"
      #txtTagInput
    />
  `,
  standalone: false,
})
export class SearchBoxComponent {
  constructor(private gifsService: GifsService) {}
@ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  searchTag() {
    const newTag = this.tagInput.nativeElement.value;
    this.gifsService.searchTag(newTag);
    this.tagInput.nativeElement.value = '';
  }
}
