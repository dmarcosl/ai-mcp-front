import {Component, signal} from '@angular/core';
import {MaterialModule} from './modules/material/material-module';
import {ChatPanel} from './components/chat-panel/chat-panel';
import {RenderPanel} from './components/render-panel/render-panel';

@Component({
  selector: 'app-root',
  imports: [MaterialModule, ChatPanel, RenderPanel, ChatPanel],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ai-mcp-front');
}
