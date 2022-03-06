import type { Hit } from './hit'
import type { Player } from './player';

export class Game {
  protected history: Hit[] = [];

  constructor(protected sections: number[], protected players: Player[]) {
    console.log("New game", this)
  }

  public hit(hit: Hit) {

  }
}
