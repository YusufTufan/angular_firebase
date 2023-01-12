import { HotToastModule, HotToastService } from '@ngneat/hot-toast';
import { Sonuc } from '../models/sonuc';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MytoastService {

  constructor(
    private toast: HotToastService

  ) { }
  ToastUygula(sonuc: Sonuc) {

    if (sonuc.islem) {
      this.toast.success(sonuc.mesaj, {
        style: {
          border: '1px solid #0e7309',
          padding: '16px',
          color: '#0e7309',
        }
      });
    } else {
      this.toast.error(sonuc.mesaj, {
        style: {
          border: '1px solid #a30505',
          padding: '16px',
          color: '#a30505',
        }
      });
    }
  }
}