import { Component, inject } from '@angular/core';
import { ProfileService } from '../../data/service/profile.service';
import { ProfileCardComponent } from "../../common-ui/profile-card/profile-card.component";
import { ProfileFiltersComponent } from "./profile-filters/profile-filters.component";

@Component({
  selector: 'app-search-pages',
  standalone: true,
  imports: [ProfileCardComponent, ProfileFiltersComponent],
  templateUrl: './search-pages.component.html',
  styleUrl: './search-pages.component.scss'
})
export class SearchPagesComponent {
  profileService = inject(ProfileService)
  profiles = this.profileService.filteredProfiles

  constructor() {
    
  }
}
