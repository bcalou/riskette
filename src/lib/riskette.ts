import { Area } from './area';
import { Game } from './game';
import type { Hit } from './hit';
import type { Player } from './player';
import type { Section } from './section';

const dartsPerTurn = 3;

export class Riskette extends Game {
  private sectionsOwners: {[key: Section]: Player | null} = {
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

  public dartsPlayedSinceBeginning = 0;

  private playersAtSea: Player[] = [];

  public hit(hit: Hit) {
    console.log("hit", hit);
    this.history.push(hit);
    this.computeState(hit);
    this.dartsPlayedSinceBeginning++;
    this.dartsPlayedSinceBeginning = this.dartsPlayedSinceBeginning;
  }

  public getSectionOwner(section: Section): Player | null {
    return this.sectionsOwners[section];
  }

  private computeState(hit: Hit) {
    const currentPlayer = this.getCurrentPlayer();

    switch (hit.area) {
      case Area.DoubleRing:
      case Area.OuterSimple:
      case Area.TrebleRing:
      case Area.InnerSimple:
        if (this.isPlayerSectionOwner(currentPlayer, hit.section)) {
          console.log("Self hit");
        } else if (this.canPlayerCaptureSection(currentPlayer, hit.section)) {
          console.log("capture");
          this.sectionsOwners[hit.section] = currentPlayer;
        } else {
          console.log("Too far!")
        }
        break;
      case Area.Bull:
      case Area.BullsEye:
        break;
      default:
        break;
    }

    console.log(this.sectionsOwners);
  }

  private canPlayerCaptureSection(attacker: Player, targetedSection: Section) {
    const targetedSectionOwner = this.sectionsOwners[targetedSection];
    const doesAttackerOwnTargetedSection = targetedSectionOwner === attacker;
    const attackerIsAtSea = this.playersAtSea.includes(attacker);
    const isTargetedSectionAdjacentToAttackerOwnedSections = 
    this.getSectionNeighbors(targetedSection)
      .filter(filteredSection => this.getPlayerSections(attacker).includes(filteredSection))
      .length > 0;
    const canPlayerCaptureSection = 
      !doesAttackerOwnTargetedSection
      &&
      (
        isTargetedSectionAdjacentToAttackerOwnedSections
        ||
        attackerIsAtSea
      )
      ;
      return canPlayerCaptureSection;
  }

  private isPlayerSectionOwner(player: Player, section: Section) {
    return this.getSectionOwner(section) === player;
  }

  public getCurrentPlayer() {
    return this.players[this.getCurrentTurn() % this.players.length];
  }

  private getPlayerSections(player: Player): Section[] {
    let playerOwnedSections: Section[] = [];
    this.sections.forEach(section => {
      const currentSectionOwner = this.sectionsOwners[section]
      if (currentSectionOwner === player) {
        playerOwnedSections.push(section);
      }
    });
    return playerOwnedSections;
  }

  /**
   * 
   * @returns the current dart number to throw. 0 being the first dart
   */
  private getCurrentTurnDartNumber() {
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
    return Math.floor(currentOverallDartNumber / dartsPerTurn);
  }
}