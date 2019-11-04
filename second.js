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
const headless = process.env.HEADLESS === 'true'

// -------------------------------------------------------------
const FindTextOnPage = async (textToFindOnPage) => {
  let txt = await text(textToFindOnPage)
  expect(await txt.exists()).to.be.true
}

const pause = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), 5000)
  })
}

// -------------------------------------------------------------
describe('Adding todos - one', async () => {
  before(async () => {
    await openBrowser({ headless: headless })
    await goto('http://localhost:4000/api/clean-database')
  })

  describe('Add one todo', () => {
    it('after DB reset, todo list is empty', async () => {
      await goto('http://localhost:3000')
      await FindTextOnPage('0 / 0')
    })

    it('create a new todo', async () => {
      await write('Foo', into(textBox()))
      await click('Save')
    })

    it('new todo text found on page', async () => {
      await FindTextOnPage('Foo')
    })

    it('text entry is now empty', async () => {
      expect(await textBox().value()).to.eql('')
    })

    it('list has one element yet to be done', async () => {
      await FindTextOnPage('1 / 1')
    })
  })

  after(async () => {
    await closeBrowser()
  })
})

// -------------------------------------------------------------
describe('Adding todos - two', async () => {
  before(async () => {
    await openBrowser({ headless: headless })
    await goto('http://localhost:4000/api/clean-database')
  })

  describe('Add two todos', () => {
    it('after DB reset, todo list is empty', async () => {
      await goto('http://localhost:3000')
      await FindTextOnPage('0 / 0')
    })

    it('create two new todos', async () => {
      await write('Foo', into(textBox()))
      await click('Save')
      await write('Bar', into(textBox()))
      await click('Save')
    })

    it('new todos texts found on page', async () => {
      await FindTextOnPage('Foo')
      await FindTextOnPage('Bar')
    })

    it('text entry is now empty', async () => {
      expect(await textBox().value()).to.eql('')
    })

    it('list has two elements yet to be done', async () => {
      await FindTextOnPage('2 / 2')
    })
  })

  after(async () => {
    await closeBrowser()
  })
})

// -------------------------------------------------------------
describe('Deleting a todo', async () => {
  before(async () => {
    await openBrowser({ headless: headless })
    await goto('http://localhost:4000/api/clean-database')
  })

  describe('Add one todo', () => {
    it('after DB reset, todo list is empty', async () => {
      await goto('http://localhost:3000')
      await FindTextOnPage('0 / 0')
    })

    it('create a new todo', async () => {
      await write('Foo', into(textBox()))
      await click('Save')
    })

    it('new todo text found on page', async () => {
      await FindTextOnPage('Foo')
    })

    it('delete the todo', async () => {
      await click('X')
    })

    it('list has no elements yet to be done', async () => {
      await FindTextOnPage('0 / 0')
    })
  })

  after(async () => {
    await closeBrowser()
  })
})
