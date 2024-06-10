import { Component } from '@angular/core';

@Component({
  selector: 'app-sandbox',
  standalone: true,
  imports: [],
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

  guess(choice: string) {
    if (this.round === this.totalRounds) {
      this.gameOver();
      return;
    }
    this.round++;
    let cpuChoice = this.getCpuChoice();
    this.userChoices.push(choice);
    this.cpuChoices.push(cpuChoice);
    this.scoreRound(choice, cpuChoice);
  }

  gameOver() {
    let winner = '';
    if (this.userScore > this.cpuScore) {
      winner = 'User';
    } else if (this.cpuScore > this.userScore) {
      winner = 'CPU';
    } else {
      winner = 'Draw';
    }
    alert('Game Over. Winner: ' + winner);
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
