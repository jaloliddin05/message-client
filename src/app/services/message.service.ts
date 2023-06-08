import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private readonly httpClient: HttpClient) {}

  getMessages(query: any) {
    return this.httpClient.get(API_URL.MESSAGE_URL, { params: query });
  }

  getOne(id: string) {
    return this.httpClient.get(`${API_URL.MESSAGE_URL}/${id}`);
  }

  getInBoxUnViewedMessagesCount(id: string) {
    return this.httpClient.get(`${API_URL.MESSAGE_URL}/count-inbox/${id}`);
  }

  changeOne(id: string, data: any) {
    return this.httpClient.patch(`${API_URL.MESSAGE_URL}/${id}`, data);
  }

  deleteOne(id: string) {
    return this.httpClient.delete(`${API_URL.MESSAGE_URL}/${id}`);
  }

  create(data: any) {
    return this.httpClient.post(API_URL.MESSAGE_URL, data);
  }
}
