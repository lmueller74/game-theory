import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-result-overlay',
  standalone: true,
  imports: [],
  templateUrl: './result-overlay.component.html',
  styleUrl: './result-overlay.component.scss'
})
export class ResultOverlayComponent {
  @Input() winner = ''
  @Input() userScore = 0
  @Input() cpuScore = 0
  @Output() resetEmitter = new EventEmitter()

  reset() {
    this.resetEmitter.emit()
  }
}
