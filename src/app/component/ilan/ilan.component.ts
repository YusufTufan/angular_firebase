import { ActivatedRoute } from '@angular/router';
import { kategori } from './../../models/kategori';
import { Sonuc } from './../../models/sonuc';
import { MytoastService } from './../../services/mytoast.service';
import { ilan } from './../../models/ilan';
import { FbservisService } from './../../services/fbservis.service';
import { Component, OnInit } from '@angular/core';
import { Modal } from 'bootstrap';
import * as bootstrap from 'bootstrap';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-ilan',
  templateUrl: './ilan.component.html',
  styleUrls: ['./ilan.component.scss']
})
export class IlanComponent implements OnInit {
  ilanlar!: ilan[];
  kategoriler!: kategori[];
  modal!: Modal;
  modalBaslik: string = "";
  secIlan!: ilan;
  katId!: string;
  secKat: kategori = new kategori();
  sonuc: Sonuc = new Sonuc();
  frm: FormGroup = new FormGroup({
    id: new FormControl(),
    ilanadi: new FormControl(),
    ilanresmi: new FormControl(),
    ilanfiyat: new FormControl(),
    categoryId: new FormControl(),
    kaytarih: new FormControl(),
    duztarih: new FormControl(),
  });
  İlanListele: any;
  secilan: any;
  servis: any;
  constructor(
    public fbservis: FbservisService,
    public toast: MytoastService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((p: any) => {
      if (p.katId) {
        this.katId = p.katId;
        this.ilanListele();

      }
    });
    this.KategoriListele();
  }
  
  KatSec(katId: string) {
    this.katId = katId;
    this.ilanListele();

  }

  Ekle(el: HTMLElement) {
    this.frm.reset();
    this.frm.patchValue({
    });
    this.modal = new bootstrap.Modal(el);
    this.modalBaslik = "İlan Ekle";
    this.modal.show();
  }
  Duzenle(ilan: ilan, el: HTMLElement) {
    this.frm.patchValue(ilan);
    this.modalBaslik = "İlan Düzenle";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }
  Sil(ilan: ilan, el: HTMLElement) {
    this.secIlan =ilan ;
    this.modalBaslik = "İlan Sil";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }

  ilanListele() {
    this.fbservis.ilanListeleByKatId(this.katId).subscribe((d: ilan[]) => {
      this.ilanlar = d;
    });
  }
  KategoriListele() {
    this.fbservis.KategoriListele().subscribe(d => {
      this.kategoriler = d;
    });
  }
  IlanEkleDuzenle() {
    var ilan: ilan = this.frm.value
    var tarih = new Date();
    if (!ilan.ilanid) {
      var filtre = this.ilanlar.filter(s => s.ilanadi == ilan.ilanadi);
      if (filtre.length > 0) {
        this.sonuc.islem = false;
        this.sonuc.mesaj = "Girilen İlan Adı Kayıtlıdır!";
        this.toast.ToastUygula(this.sonuc);
      } else {
        ilan.kaytarih = tarih.getTime().toString();
        ilan.duztarih = tarih.getTime().toString();
        this.fbservis.ilanEkle(ilan).then(d => {
          this.sonuc.islem = true;
          this.sonuc.mesaj = "İlan Eklendi";
          this.toast.ToastUygula(this.sonuc);
          this.İlanListele();
          this.modal.toggle();
        });
      }
    } else {
      ilan.duztarih = tarih.getTime().toString();
      this.fbservis.ilanDuzenle(ilan).then(d => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "İlan Düzenlendi";
        this.toast.ToastUygula(this.sonuc);
        this.ilanListele();
        this.modal.toggle();
      });
    }

  }
  ilanSil() {
    this.fbservis.ilanSil(this.secilan.id).then(d => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "İlan Silindi";
      this.toast.ToastUygula(this.sonuc);
      this.İlanListele();
      this.modal.toggle();
    });
  }
}