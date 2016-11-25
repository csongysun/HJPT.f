import { HjptFPage } from './app.po';

describe('hjpt-f App', function() {
  let page: HjptFPage;

  beforeEach(() => {
    page = new HjptFPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
