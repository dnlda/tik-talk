import { Component, inject, Input } from '@angular/core';
import { Profile } from '../../data/interface/profile.interface';
import { ImgUrlPipe } from '../../helpers/pipes/img-url.pipe';
import { ProfileService } from '../../data/service/profile.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [ImgUrlPipe],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss'
})
export class ProfileCardComponent {
  @Input() profile!: Profile;
  profileService = inject(ProfileService)

  onSubscribe() {
    console.log(this.profile)
    firstValueFrom(this.profileService.subscribeAccount(this.profile.id))
  }
}
