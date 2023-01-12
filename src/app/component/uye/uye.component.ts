import { Uye } from './../../models/uye';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { Modal } from 'bootstrap';
import { Sonuc } from 'src/app/models/sonuc';
import { FbservisService } from 'src/app/services/fbservis.service';
import { MytoastService } from 'src/app/services/mytoast.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-uye',
  templateUrl: './uye.component.html',
  styleUrls: ['./uye.component.scss']
})
export class UyeComponent implements OnInit {
  uyeler!: Uye[];
  modal!: Modal;
  modalBaslik: string = "";
  secUye!: Uye;
  sonuc: Sonuc = new Sonuc();
  frm: FormGroup = new FormGroup({
    id: new FormControl(),
    adsoyad: new FormControl(),
    mail: new FormControl(),
    admin: new FormControl(),
    parola: new FormControl(),
    kaytarih: new FormControl(),
    duztarih: new FormControl(),
  });
  constructor(
    public fbservis: FbservisService,
    public toast: MytoastService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.UyeListele();

  }
  Ekle(el: HTMLElement) {
    this.frm.reset();
    this.frm.patchValue({ admin: 0 });
    this.modal = new bootstrap.Modal(el);
    this.modalBaslik = "Üye Ekle";
    this.modal.show();
  }
  Duzenle(uye: Uye, el: HTMLElement) {
    this.frm.patchValue(uye);
    this.modalBaslik = "Üye Düzenle";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }
  Sil(uye: Uye, el: HTMLElement) {
    this.secUye = uye;
    this.modalBaslik = "Üye Sil";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }

  UyeListele() {
    this.fbservis.UyeListele().subscribe(d => {
      this.uyeler = d;
    });
  }
  UyeEkleDuzenle() {
    var uye: Uye = this.frm.value
    var tarih = new Date();
    if (!uye.uid) {
      var filtre = this.uyeler.filter(s => s.email == uye.email);
      if (filtre.length > 0) {
        this.sonuc.islem = false;
        this.sonuc.mesaj = "Girilen E-Posta Adresi Kayıtlıdır!";
        this.toast.ToastUygula(this.sonuc);
      } else {
        uye.kaytarih = tarih.getTime().toString();
        uye.duztarih = tarih.getTime().toString();
        this.fbservis.UyeEkle(uye).subscribe(d => {
          this.sonuc.islem = true;
          this.sonuc.mesaj = "Uye Eklendi";
          this.toast.ToastUygula(this.sonuc);
          this.UyeListele();
          this.modal.toggle();
        });
      }
    } else {
      uye.duztarih = tarih.getTime().toString();
      this.fbservis.UyeDuzenle(uye).subscribe(d => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Üye Düzenlendi";
        this.toast.ToastUygula(this.sonuc);
        this.UyeListele();
        this.modal.toggle();
      });
    }

  }
  UyeSil() {
    this.fbservis.UyeSil(this.secUye).then (d => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Üye Silindi";
      this.toast.ToastUygula(this.sonuc);
      this.UyeListele();
      this.modal.toggle();
    });
  }
}