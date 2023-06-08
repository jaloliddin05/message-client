import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly httpClient: HttpClient) {}

  login(data: any) {
    return this.httpClient.post(API_URL.LOGIN_URL, data);
  }

  getUserByName(name: string) {
    return this.httpClient.get(`${API_URL.USER_URL}/name?name=${name}`);
  }

  getUserById(id: string) {
    return this.httpClient.get(`${API_URL.USER_URL}/${id}`);
  }
}
