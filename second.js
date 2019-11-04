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
const assert = require('assert')
const headless = false

describe('Getting Started with Mocha and Taiko', () => {
  before(async () => {
    await openBrowser({ headless: headless })
  })

  describe('Add one todo', () => {
    it('Goto getgauge github page', async () => {
      await goto('http://localhost:3000')
      await write('Foo', into(textBox()))
      await click('Save')
      assert.ok(await text('Foo').exists())
    })
  })

  after(async () => {
    await closeBrowser()
  })
})
