import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {AccountService} from '../../services/account.service';
import {LoginArg} from '../../configs/types';
import {UserService} from '../../services/user.service';
import {AuthKey} from '../../configs/constant';
import {WindowService} from '../../services/window.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  formValues: LoginArg = {
    name: '',
    password: ''
  };

  constructor(private router: Router, private windowServe: WindowService, private accountServe: AccountService, private userServe: UserService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.accountServe.login(form.value).subscribe(({ user, token }) => {
        this.windowServe.setStorage(AuthKey, token);
        this.userServe.setUser(user);
        this.windowServe.alert('登陆成功');
        const to = this.accountServe.redirectTo || '/home/heroes';
        this.router.navigateByUrl(to).then(() => {
          this.accountServe.redirectTo = '';
        });
      });
    }
  }
}
