import { Game } from './game';
import type { Hit } from './hit';
import type { Player } from './player';

const dartsPerTurn = 3;

export class Riskette extends Game {
  private territories: {[key: number]: Player | null} = {
    20: null,
    1: this.players[0],
    18: this.players[0],
    4: this.players[0],
    13: null,
    6: null,
    10: null,
    15: null,
    2: this.players[1],
    17: null,
    3: null,
    19: this.players[1],
    7: null,
    16: this.players[1],
    8: null,
    11: null,
    14: null,
    9: null,
    12: null,
    5: null,
  };

  private dartsPlayedSinceBeginning = 0;

  public hit(hit: Hit) {
    this.history.push(hit);
  }

  private computeState(newHit: Hit) {

  }

  public getOwner(section: number): Player | null {
    return this.territories[section];
  }

  public getCurrentPlayer() {
    return this.players[this.getCurrentTurn()];
  }

  /**
   * 
   * @returns the current dart number to throw. 0 being the first dart
   */
  public getCurrentTurnDartNumber() {
    const firstDartNumberForThisTurn = this.getCurrentTurn() * dartsPerTurn;
    return this.dartsPlayedSinceBeginning - firstDartNumberForThisTurn;
  }

  public getCurrentTurnRemainingDarts() {
    return dartsPerTurn - this.getCurrentTurnDartNumber();
  }

  /* Note: turn c'est ptet pas assez clair comme terme, je sais même pas si c'ets correct en anglais */
  /**
   * 
   * @returns current turn. turn 0 being the first turn
   */
  private getCurrentTurn() {
    const currentOverallDartNumber = this.dartsPlayedSinceBeginning;
    return Math.floor(currentOverallDartNumber/dartsPerTurn);
  }
}