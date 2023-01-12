import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { switchMap } from 'rxjs';
import { FbservisService } from 'src/app/services/fbservis.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  constructor(
    public fbServis: FbservisService,
    public htoast: HotToastService,
    public router: Router
  ) { }

  ngOnInit() {
  }
  UyeOl(adsoyad: string, email: string, parola: string) {
    this.fbServis.
      KayitOl(email, parola)
      .pipe(
        switchMap(({ user: { uid } }) =>
          this.fbServis.UyeEkle({ uid, email, displayName: adsoyad })
        ),
        this.htoast.observe({
          success: 'Tebrikler Kayıt Yapıldı',
          loading: 'Kayıt Yapılıyor...',
          error: ({ message }) => `${message}`,
        })
      )
      .subscribe(() => {
        this.router.navigate(['']);
      });
  }

}