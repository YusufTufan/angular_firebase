import { HotToastService } from '@ngneat/hot-toast';
import { FbservisService } from './../../services/fbservis.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    public fbServis: FbservisService,
    public htoast: HotToastService,
    public router: Router
  ) { }

  ngOnInit() {
  }
  OturumAc(mail: string, parola: string) {
    this.fbServis.OturumAc(mail, parola)
      .pipe(
        this.htoast.observe({
          success: 'Oturum Açıldı',
          loading: 'Oturum Açılıyor...',
          error: ({ message }) => `${message}`
        })
      )
      .subscribe(() => {
        this.router.navigate(['']);
      });
  }
}