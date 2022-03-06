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

  public hit(hit: Hit) {
    this.history.push(hit);
  }

  public getOwner(section: number): Player | null {
    return this.territories[section];
  }
}

