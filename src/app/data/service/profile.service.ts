import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Profile } from '../interface/profile.interface';
import { Pageble } from '../interface/pageble.interface';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  http = inject(HttpClient);
  baseApiUrl = 'https://icherniakov.ru/yt-course/';

  me = signal<Profile | null>(null)
  filteredProfiles = signal<Profile[]>([])

  //GET REQUEST

  getTestAccounts() {
    return this.http.get<Profile[]>(`${this.baseApiUrl}account/test_accounts`);
  }

  getMe() {
    return this.http.get<Profile>(`${this.baseApiUrl}account/me`)
    .pipe(
      tap(res => this.me.set(res))
    )
  }

  getAccount(id: string) {
    return this.http.get<Profile>(`${this.baseApiUrl}account/${id}`)
  }

  getSubscribersShortList(subsAmount = 3) {
    return this.http.get<Pageble<Profile>>(`${this.baseApiUrl}account/subscribers/?page=1&size=50`)
    .pipe(
      map(res => res.items.slice(0, subsAmount))
    )
  }

  filterProfiles(params: Record<string, any>) {


    return this.http.get<Pageble<Profile>>(
      `${this.baseApiUrl}account/accounts`, {params}
    ).pipe(
      tap(res => {
        this.filteredProfiles.set(res.items)
      })
    )
  }

  //POST REQUEST

  subscribeAccount (id: number) {
    return this.http.post(`${this.baseApiUrl}account/subscribe/${id}`, id)
  }

  uploadAvatar(file: File) {
    const fd = new FormData()
    fd.append('image', file)
    return this.http.post(`${this.baseApiUrl}account/upload_image`, fd)
  }

  createPost (title: string, content: string, authorId: number) {
    const postContent = {title: title, content: content, authorId: authorId}
    return this.http.post(`${this.baseApiUrl}post/${postContent}`, postContent)
  }


  //PATCH REQUEST

  patchProfile (profile: Partial<Profile>) {
    return this.http.patch<Profile>(
      `${this.baseApiUrl}account/me`, 
      profile
    )
  }

  //DELETE REQUEST

  deleteAccount () {
    return this.http.delete(`${this.baseApiUrl}account/me`)
  }

  
}
