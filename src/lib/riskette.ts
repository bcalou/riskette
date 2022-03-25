import { Area } from './area';
import { Game } from './game';
import type { Hit } from './hit';
import type { Player } from './player';
import type { Section } from './section';

const dartsPerTurn = 3;

export class Riskette extends Game {
  private sectionsOwners: {[key: Section]: Player | null} = {
    20: this.players[2],
    1: null,
    18: this.players[0],
    4: this.players[2],
    13: this.players[2],
    6: null,
    10: this.players[3],
    15: null,
    2: this.players[0],
    17: this.players[3],
    3: this.players[1],
    19: this.players[1],
    7: this.players[3],
    16: this.players[1],
    8: this.players[0],
    11: null,
    14: null,
    9: null,
    12: this.players[3],
    5: this.players[2],
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

  public canCurrentPlayerCaptureSection(targetedSection: Section) {
    return this.canPlayerCaptureSection(this.getCurrentPlayer(), targetedSection);
  }

  private canPlayerCaptureSection(attacker: Player, targetedSection: Section) {
    const targetedSectionOwner = this.sectionsOwners[targetedSection];
    const doesAttackerOwnTargetedSection = targetedSectionOwner === attacker;
    const attackerIsAtSea = this.playersAtSea.includes(attacker);
    const canPlayerCaptureSection = 
      !doesAttackerOwnTargetedSection
      &&
      !this.isSectionOwnedByCurrentPlayerTeamate(targetedSection)
      &&
      (
        this.canCurrentPlayerReachSection(targetedSection)
        ||
        attackerIsAtSea
      )
      ;
      return canPlayerCaptureSection;
  }

  private isPlayerSectionOwner(player: Player, section: Section) {
    return this.getSectionOwner(section) === player;
  }

  private canCurrentPlayerReachSection(targetSection: Section): boolean {
    return this.canPlayerReachSection(this.getCurrentPlayer(), targetSection);
  }

  private canPlayerReachSection(player: Player, targetSection: Section): boolean {
    const playerSections = this.sections.filter((section) => {return this.sectionsOwners[section] === player});

    let canReachSection = false;

    playerSections.every(section => {
      if(this.canSectionReachSection(section, targetSection)) {
        canReachSection = true;
        return false;
      }else{
        return true;
      }
    });

    return canReachSection;
  }

  private canSectionReachSection(sourceSection: Section, targetSection: Section) {
    function canReachTargetSection(path: Section[], targetSection: Section) {
      let doesAPathExists = true;
      path.every(section => {
        //stop when reaching target section
        if(section === targetSection){
          return false
        }

        const doesTeamOwnSection = this.sectionsOwners[section] !== null && this.sectionsOwners[sourceSection].team === this.sectionsOwners[section].team;
        if(!doesTeamOwnSection) {
          doesAPathExists = false;
          return false;
        }else{
          return true;
        }
  
        
        
      });

      return doesAPathExists;
    }

    const sourceSectionIndex = this.sections.indexOf(sourceSection);
    const clockwisePathSections = 
      this.sections.slice(sourceSectionIndex, this.sections.length)
        .concat(
          this.sections.slice(0, sourceSectionIndex)
        );

    let doesAClockWisePathExists = canReachTargetSection.call(this, clockwisePathSections, targetSection);

    const antiClockWiseSections = this.sections.slice().reverse();
    const sourceSectionAntiClockWiseIndex = antiClockWiseSections.indexOf(sourceSection);
    const antiClockWisePathSection = 
    antiClockWiseSections.slice(sourceSectionAntiClockWiseIndex, this.sections.length)
        .concat(
          antiClockWiseSections.slice(0, sourceSectionAntiClockWiseIndex)
        );

    let doesAnAntiClockWisePathExists = canReachTargetSection.call(this, antiClockWisePathSection, targetSection);

    return doesAClockWisePathExists || doesAnAntiClockWisePathExists;
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

  private isSectionOwnedByCurrentPlayerTeamate (section: Section){
    
    return this.sectionsOwners[section] !== null && this.sectionsOwners[section].team === this.getCurrentPlayer().team;
  }
}