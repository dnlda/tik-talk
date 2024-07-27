import { Component, inject } from '@angular/core';
import { SubscriberCardComponent } from './subscriber-card/subscriber-card.component';
import { ProfileService } from '../../data/service/profile.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ImgUrlPipe } from '../../helpers/pipes/img-url.pipe';
import { AsyncPipe } from '@angular/common';
import { JsonPipe } from '@angular/common';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SubscriberCardComponent, RouterLink, ImgUrlPipe, AsyncPipe, JsonPipe, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
profileService = inject(ProfileService)

subscribers$ = this.profileService.getSubscribersShortList()

me = this.profileService.me


  menuItems = [
    { id: 1, label: 'Моя страница', icon: 'home', link: `profile/me` },
    { id: 2, label: 'Чаты', icon: 'chat', link: 'chats' },
    { id: 3, label: 'Поиск', icon: 'search', link: 'search' },
  ];

  ngOnInit() {
    firstValueFrom(this.profileService.getMe())
  }
}
