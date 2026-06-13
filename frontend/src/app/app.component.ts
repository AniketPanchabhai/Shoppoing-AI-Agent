import { Component, OnInit } from '@angular/core';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  messages: any[] = [];
  userInput: string = '';
  isLoading: boolean = false;
  selectedFile: File | null = null;
  selectedProducts: any[] = [];
  showOrderConfirmation: boolean = false;
  orderConfirmation: any = null;
  context: any = {};

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.messages$.subscribe(msgs => {
      this.messages = msgs;
      this.scrollToBottom();
    });
  }

  /**
   * Send message to agent
   */
  sendMessage(): void {
    if (!this.userInput.trim()) {
      return;
    }

    const userMessage = this.userInput;
    this.userInput = '';
    this.isLoading = true;

    // Add user message to UI
    this.chatService.addMessage('user', userMessage);

    // Send to backend
    this.chatService.sendMessage(userMessage, this.context).subscribe(
      (response: any) => {
        this.isLoading = false;

        // Add agent response
        this.chatService.addMessage('assistant', response.message);

        // Update context
        this.context = response.context || this.context;

        // Handle product recommendations
        if (response.productRecommendations) {
          this.selectedProducts = response.productRecommendations;
        }

        // Handle order confirmation
        if (response.type === 'order-confirmation') {
          this.orderConfirmation = response.orderData;
          this.showOrderConfirmation = true;
          setTimeout(() => this.showOrderConfirmation = false, 5000);
        }

        this.scrollToBottom();
      },
      (error: any) => {
        this.isLoading = false;
        console.error('Error:', error);
        this.chatService.addMessage('assistant', 'Sorry, an error occurred. Please try again.');
      }
    );
  }

  /**
   * Handle file selection
   */
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.uploadImage();
    }
  }

  /**
   * Upload image to agent
   */
  uploadImage(): void {
    if (!this.selectedFile) {
      return;
    }

    this.isLoading = true;
    const userMessage = `I'm uploading an image to find similar products`;
    this.chatService.addMessage('user', userMessage);

    this.chatService.uploadImage(this.selectedFile, 'Find products similar to this image').subscribe(
      (response: any) => {
        this.isLoading = false;
        this.chatService.addMessage('assistant', response.message);
        
        if (response.productRecommendations) {
          this.selectedProducts = response.productRecommendations;
        }

        this.selectedFile = null;
        this.scrollToBottom();
      },
      (error: any) => {
        this.isLoading = false;
        console.error('Error uploading image:', error);
        this.chatService.addMessage('assistant', 'Error processing image. Please try again.');
      }
    );
  }

  /**
   * Handle product selection (e.g., clicking on a product card)
   */
  selectProduct(productId: number): void {
    const product = this.selectedProducts.find(p => p.id === productId);
    if (product) {
      this.userInput = `I want to buy the ${product.name}`;
      this.sendMessage();
    }
  }

  /**
   * Reset conversation
   */
  resetConversation(): void {
    this.chatService.clearMessages();
    this.chatService.resetConversation().subscribe(
      () => {
        this.messages = [];
        this.selectedProducts = [];
        this.context = {};
      }
    );
  }

  /**
   * Scroll to bottom of chat
   */
  scrollToBottom(): void {
    setTimeout(() => {
      const chatContainer = document.querySelector('.chat-messages');
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }, 100);
  }

  /**
   * Close order confirmation popup
   */
  closeOrderConfirmation(): void {
    this.showOrderConfirmation = false;
  }
}
