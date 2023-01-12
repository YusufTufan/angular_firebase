import { HotToastService } from '@ngneat/hot-toast';
import { Gorev } from '../../models/gorev';
import { FbservisService } from './../../services/fbservis.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-gorevler',
  templateUrl: './gorevler.component.html',
  styleUrls: ['./gorevler.component.css']
})
export class GorevlerComponent implements OnInit {
  mevcutGorevler: Gorev[] = [];
  eskiGorevler: Gorev[] = [];
  frm: FormGroup = new FormGroup({
    baslik: new FormControl(),
    aciklama: new FormControl(),
    tamam: new FormControl()
  });
  constructor(
    public fbservis: FbservisService,
    public htoast: HotToastService
  ) { }

  ngOnInit() {
    this.GorevListele();
    this.fbservis.aktifUye.subscribe(d => {
      console.log(d);
    });
  }
  GorevListele() {
    this.fbservis.GorevListele().subscribe(d => {
      this.mevcutGorevler = d.filter(s => s.tamam == false || s.tamam == null);
      this.eskiGorevler = d.filter(s => s.tamam == true);
    });
  }
  Kaydet() {
    // console.log(this.frm.value);
    this.fbservis.GorevEkle(this.frm.value)
      .pipe(
        this.htoast.observe({
          success: 'Görev Eklendi',
          loading: 'Görev Ekleniyor...',
          error: ({ message }) => `${message}`
        })
      )
      .subscribe();
  }
  Sil(gorev: Gorev) {
    this.fbservis.GorevSil(gorev).then(() => {

    });
  }
  TamamIptal(gorev: Gorev, d: boolean) {
    gorev.tamam = d;
    this.fbservis.GorevDuzenle(gorev).then(() => {

    });
  }
}