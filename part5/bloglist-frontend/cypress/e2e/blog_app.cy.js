describe('Note app', function () {


  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'sahil',
      username: 'sahil',
      password: 'sahilab'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page shows login form', function () {
    cy.contains('Login')
  })

  describe('logging in', function () {

    it('user can login', function () {
      cy.get('#username').type('sahil')
      cy.get('#password').type('sahilab')
      cy.get('#login-button').click()

      cy.contains('sahil logged-in')
    })

    it('login fails with wrong password', function () {
      cy.get('#username').type('sahil')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error').should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Sahil logged in')
    })
  })

  describe('when logged in', function () {
    beforeEach(function () { cy.login({ username: 'sahil', password: 'sahilab' }) })

    it('a new note can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('a blog created by cypress')
      cy.get('#url').type('exampleurl.com')
      cy.contains('save').click()
      cy.contains('a blog created by cypress')
    })

    describe('and several notes exist', function () {
      beforeEach(function () {
        cy.createBlog({
          content: {
            title: 'abcd blog 1',
            author: 'mr. blogger',
            url: 'exampleurl.com',
            likes: 1
          }
        })
        cy.createBlog({
          content: {
            title: 'abcd blog 2',
            author: 'mr. blogger',
            url: 'exampleurl.com',
            likes: 23
          }
        })
        cy.createBlog({
          content: {
            title: 'abcd blog 3',
            author: 'mr. blogger',
            url: 'exampleurl.com',
            likes: 3
          }
        })
      })

      it('like can be made', function () {
        cy.contains('abcd blog 2').parent().contains('view').click()
        cy.contains('likes 23').parent().contains('like').click()
        cy.contains('likes 24')
      })

      it('blog can be deleted', function () {
        cy.contains('abcd blog 2').parent().contains('view').click()
        cy.contains('delete').click()
      })

      it('other user cannot delete', function () {
        const user2 = {
          name: 'sahil2',
          username: 'sahil2',
          password: 'sahilab'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user2)
        cy.visit('http://localhost:3000')
        cy.login({ username: 'sahil2', password: 'sahilab' })
        cy.contains('abcd blog 2').parent().contains('view').click()
        cy.get('html').should('not.contain', 'delete')
      })

      it('sorting blogs', function () {
        cy.contains('sort blogs').click()
        cy.get('.blog').eq(0).should('contain', 'abcd blog 2')
        cy.get('.blog').eq(1).should('contain', 'abcd blog 3')
        cy.get('.blog').eq(2).should('contain', 'abcd blog 1')
      })
    })
  })
})