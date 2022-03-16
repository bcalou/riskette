import type { Hit } from './hit'
import type { Player } from './player';
import type { Section } from './section';

export class Game {
  protected history: Hit[] = [];

  constructor(protected sections: Section[], protected players: Player[]) {
    console.log("New game", this)
  }

  public getSections(): Section[] {
    return this.sections;
  }

  public getSectionIndex(section: Section): Section {
    return this.sections.indexOf(section);
  }

  public getSectionNeighbors(section: Section): [Section, Section] {
    const sectionIndex = this.getSectionIndex(section);
    const sectionsCount = this.sections.length;

    const leftNeighborIndex = sectionIndex === 0 ? sectionsCount - 1 : sectionIndex - 1;
    const rightNeighborIndex = sectionIndex === sectionsCount - 1 ? 0 : sectionIndex + 1;

    return [this.sections[leftNeighborIndex], this.sections[rightNeighborIndex]];
  }

  public hit(hit: Hit) {

  }
}
