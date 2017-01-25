import { GameMemoryPage } from './app.po';

describe('game-memory App', function() {
  let page: GameMemoryPage;

  beforeEach(() => {
    page = new GameMemoryPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
