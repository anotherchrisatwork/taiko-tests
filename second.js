const {
  openBrowser,
  write,
  into,
  closeBrowser,
  goto,
  text,
  textBox,
  click,
} = require('taiko')
const { expect } = require('chai')
const headless = false

describe('Getting Started with Mocha and Taiko', () => {
  before(async () => {
    await openBrowser({ headless: headless })
    await goto('http://localhost:4000/api/clean-database')
  })

  describe('Add one todo', () => {
    it('add the "Foo" todo, check that it shows up on the page', async () => {
      await goto('http://localhost:3000')
      // after DB reset, todo list is empty
      let txt = await text('0 / 0')
      expect(await txt.exists()).to.be.true
      // create a new todo
      await write('Foo', into(textBox()))
      await click('Save')
      // find its text on the page
      txt = await text('Foo')
      expect(await txt.exists()).to.be.true
      // text entry is now empty
      expect(await textBox().value()).to.eql('')
      // list has one element yet to be done
      txt = await text('1 / 1')
      expect(await txt.exists()).to.be.true
    })
  })

  after(async () => {
    await closeBrowser()
  })
})
