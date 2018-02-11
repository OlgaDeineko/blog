import { SimpleblogPage } from './app.po';

describe('simpleblog App', () => {
  let page: SimpleblogPage;

  beforeEach(() => {
    page = new SimpleblogPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
