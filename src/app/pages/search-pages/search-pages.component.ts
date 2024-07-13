import { Component, inject } from '@angular/core';
import { ProfileService } from '../../data/service/profile.service';
import { Profile } from '../../data/interface/profile.interface';
import { ProfileCardComponent } from "../../common-ui/profile-card/profile-card.component";

@Component({
  selector: 'app-search-pages',
  standalone: true,
  imports: [ProfileCardComponent],
  templateUrl: './search-pages.component.html',
  styleUrl: './search-pages.component.scss'
})
export class SearchPagesComponent {
  profileService = inject(ProfileService)
  profiles: Profile[] = []

  constructor() {
    this.profileService.getTestAccounts().subscribe(val => {
      this.profiles = val
    })
  }
}
