import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'http://localhost:5000/api/chat';
  private messagesSubject = new BehaviorSubject<any[]>([]);
  public messages$ = this.messagesSubject.asObservable();

  constructor(private http: HttpClient) { }

  /**
   * Send a chat message to the agent
   */
  sendMessage(message: string, context?: any): Observable<any> {
    const payload = {
      message: message,
      context: context || {}
    };

    return this.http.post<any>(`${this.apiUrl}/message`, payload);
  }

  /**
   * Upload an image to the agent
   */
  uploadImage(file: File, message?: string): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);
    if (message) {
      formData.append('message', message);
    }

    return this.http.post<any>(`${this.apiUrl}/image`, formData);
  }

  /**
   * Get conversation history
   */
  getHistory(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/history`);
  }

  /**
   * Reset conversation
   */
  resetConversation(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/reset`, {});
  }

  /**
   * Add message to local store
   */
  addMessage(role: string, content: string): void {
    const messages = this.messagesSubject.value;
    messages.push({
      role: role,
      content: content,
      timestamp: new Date()
    });
    this.messagesSubject.next(messages);
  }

  /**
   * Clear messages
   */
  clearMessages(): void {
    this.messagesSubject.next([]);
  }
}
