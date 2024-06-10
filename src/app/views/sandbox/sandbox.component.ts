import { Component } from '@angular/core';
import { NavComponent } from '../../components/nav/nav.component';
import { ResultOverlayComponent } from '../../components/result-overlay/result-overlay.component';
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-sandbox',
  standalone: true,
  imports: [NavComponent, ResultOverlayComponent, CommonModule],
  templateUrl: './sandbox.component.html',
  styleUrl: './sandbox.component.scss',
})
export class SandboxComponent {
  round = 0;
  totalRounds = 20;
  userChoices: string[] = [];
  cpuChoices: string[] = [];
  userScore = 0;
  cpuScore = 0;
  isGameOver = false;
  winner = '';

  /*
  TODO
  - Reset game when over
  - Have better win/lose/draw screen, modal?
  - Hook gameboy favicon up
  - Mobile, ensure scrolling game stays focused to the right, to avoid scrolling with finger every turn
  - Custom round limit
  - Adjust difficulty/predictability

  STRETCH
  - Add more bots to play
  - Add option to program custom pattern
  */

  guess(choice: string) {
    this.round++;
    let cpuChoice = this.getCpuChoice();
    this.userChoices.push(choice);
    this.cpuChoices.push(cpuChoice);
    this.scoreRound(choice, cpuChoice);
    if (this.round === this.totalRounds) {
      this.gameOver();
      return;
    }
  }

  gameOver() {
    if (this.userScore > this.cpuScore) {
      this.winner = 'User';
    } else if (this.cpuScore > this.userScore) {
      this.winner = 'CPU';
    } else {
      this.winner = 'Draw';
    }
    this.isGameOver = true;
  }

  getCpuChoice(): string {
    return this.strat1(Math.random());
  }

  scoreRound(userChoice: string, cpuChoice: string) {
    if (userChoice === '🟢' && cpuChoice === '🟢') {
      this.userScore += 30;
      this.cpuScore += 30;
    } else if (userChoice === '🟢' && cpuChoice === '🔴') {
      this.cpuScore += 50;
    } else if (userChoice === '🔴' && cpuChoice === '🟢') {
      this.userScore += 50;
    } else if (userChoice === '🔴' && cpuChoice === '🔴') {
      this.userScore += 10;
      this.cpuScore += 10;
    }
  }

  reset() {
    this.isGameOver = false;
    this.round = 0;
    this.userChoices = [];
    this.cpuChoices = [];
    this.userScore = 0;
    this.cpuScore = 0;
  }

  strat1(rando: number) {
    // 75% chance to defect on first turn
    if (this.round === 1) {
      return rando > 0.25 ? '🔴' : '🟢';
    }
    // 95% chance to defect on final turn
    else if (this.round === this.totalRounds) {
      return rando > 0.05 ? '🔴' : '🟢';
    }
    // Always defects once after user defects, tit-for-tat
    else if (this.userChoices[this.userChoices.length - 1] === '🔴') {
      return '🔴';
    }
    // else 25% chance to defect
    else {
      return rando > 0.75 ? '🔴' : '🟢';
    }
  }
}
