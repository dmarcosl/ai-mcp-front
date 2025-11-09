import {AfterViewChecked, Component, ElementRef, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '../../modules/material/material-module';
import {UiSpecService} from '../../services/ui-spec/ui-spec.service';
import {AgentService} from '../../services/agent/agent.service';
import {finalize} from 'rxjs/operators';


interface ChatMessage {
  from: 'user' | 'ai';
  text: string;
}

@Component({
  selector: 'app-chat-panel',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule],
  templateUrl: './chat-panel.html'
})
export class ChatPanel implements AfterViewChecked {
  input = '';
  history: { from: 'user' | 'ai'; text: string }[] = [];
  pending = false;

  @ViewChild('bottom') bottomRef?: ElementRef;

  constructor(
    private ui: UiSpecService,
    private agent: AgentService
  ) {
  }

  ngAfterViewChecked() {
    this.bottomRef?.nativeElement.scrollIntoView({behavior: 'smooth'});
  }

  send() {
    const text = this.input.trim();
    if (!text || this.pending) return;

    this.history.push({from: 'user', text});
    this.input = '';
    this.pending = true;

    this.agent.chat(text)
      .pipe(finalize(() => this.pending = false))
      .subscribe({
        next: (resp) => {
          if (resp.assistantText) this.history.push({from: 'ai', text: resp.assistantText});
          if (resp.uiSpec) this.ui.set(resp.uiSpec);
        },
        error: () => {
          this.history.push({from: 'ai', text: 'Backend down. Try again.'});
        }
      });
  }
}
