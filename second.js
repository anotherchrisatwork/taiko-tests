const {
  openBrowser,
  write,
  into,
  closeBrowser,
  goto,
  text,
  textBox,
  click,
  evaluate,
  $,
} = require('taiko')
const { expect } = require('chai')
const headless = process.env.HEADLESS === 'true'

// -------------------------------------------------------------
const FindTextOnPage = async (textToFindOnPage) => {
  const txt = await text(textToFindOnPage)
  expect(await txt.exists()).to.be.true
}

const pause = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), 5000)
  })
}

// -------------------------------------------------------------
describe('Todos tests', async () => {
  before(async () => {
    await openBrowser({ headless: headless })
  })

  // -------------------------------------------------------------
  describe('Adding todos - one', async () => {
    before(async () => {
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
  })

  // -------------------------------------------------------------
  describe('Adding todos - two', async () => {
    before(async () => {
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
  })

  // -------------------------------------------------------------
  describe('Deleting a todo', async () => {
    before(async () => {
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

      it('delete the todo', async () => {
        await click('X')
      })

      it('list has no elements yet to be done', async () => {
        await FindTextOnPage('0 / 0')
      })
    })
  })

  // -------------------------------------------------------------
  describe('Marking a todo done', async () => {
    before(async () => {
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

      it('mark the todo done', async () => {
        await click('Foo')
      })

      it('is marked as done', async () => {
        // To find the attribute value. you must use '$' to find the element
        const txt = await $(`//*[text()='Foo']`)
        const styl = await evaluate(txt, (elem) => elem.style.textDecoration)
        expect(styl).to.eql('line-through')
      })

      it('list has no elements yet to be done, but one todo visible', async () => {
        await FindTextOnPage('0 / 1')
      })
    })
  })

  after(async () => {
    await closeBrowser()
  })
})
