import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';
const GIPHY_API_KEY = 'XGdOKhdSGXLug9tEJGFXYdZA49GQWObS';

@Injectable({ providedIn: 'root' })
export class GifsService {
  public gifList: Gif[] = [];
  private _tagHistory: string[] = [];
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
    console.log({ tagHistory: this._tagHistory });
  }

  get tagHistory() {
    return [...this._tagHistory];
  }

  searchTag(tag: string): void {
    if (tag.trim().length === 0) return;
    this.organizaHistory(tag);

    const params = new HttpParams()
      .set('api_key', GIPHY_API_KEY)
      .set('q', tag)
      .set('limit', '10');

    this.http
      .get<SearchResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe((response) => {
        this.gifList = response.data;
        console.log({ gifs: this.gifList });
      });
  }

  private organizaHistory(tag: string) {
    tag = tag.toLowerCase();

    if (this._tagHistory.includes(tag)) {
      this._tagHistory = this._tagHistory.filter(
        (oldTag) => oldTag.toLowerCase() !== tag
      );
    }
    this._tagHistory.unshift(tag);
    this._tagHistory = this._tagHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage():void {
    localStorage.setItem('tagHistory', JSON.stringify(this._tagHistory));
  }

  private loadLocalStorage():void {
    if (!localStorage.getItem('tagHistory')) return;

    const tagHistory = localStorage.getItem('tagHistory');
    this._tagHistory = tagHistory ? JSON.parse(tagHistory) : [];
    if(this._tagHistory.length === 0) return;
    this.searchTag(this._tagHistory[0]);
  }
}
