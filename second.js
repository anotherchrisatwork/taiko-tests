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
    it('after DB reset, todo list is empty', async () => {
      await goto('http://localhost:3000')
      let txt = await text('0 / 0')
      expect(await txt.exists()).to.be.true
    })

    it('create a new todo', async () => {
      await write('Foo', into(textBox()))
      await click('Save')
    })

    it('new todo text found on page', async () => {
      txt = await text('Foo')
      expect(await txt.exists()).to.be.true
    })

    it('text entry is now empty', async () => {
      expect(await textBox().value()).to.eql('')
    })

    it('list has one element yet to be done', async () => {
      txt = await text('1 / 1')
      expect(await txt.exists()).to.be.true
    })
  })

  after(async () => {
    await closeBrowser()
  })
})
