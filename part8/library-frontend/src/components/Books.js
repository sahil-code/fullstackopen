import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'

import { ALL_BOOKS_GENRE, ME, ALL_BOOKS } from '../queries'

const Books = ({ show, curPage }) => {
  const [curGenre, setCurGenre] = useState('')
  const [booksFiltered, setBooksFiltered] = useState()
  const user = useQuery(ME)

  const booksResult = useQuery(ALL_BOOKS)
  const booksWithFilter = useQuery(ALL_BOOKS_GENRE, {
    variables: { genre: curGenre },
    manual: true,
  })

  useEffect(() => {
    if (curPage === 'reccs' && user.data.me.favouriteGenre) {
      setCurGenre(user.data.me.favoriteGenre)
    }
  }, [curPage, user])

  useEffect(() => {
    async function refreshFilter() {
      await booksWithFilter.refetch()
      setBooksFiltered(booksWithFilter.data.allBooks)
    }
    if (!booksWithFilter.loading) {
      refreshFilter()
    }
  }, [booksWithFilter])

  if (!show || booksResult.loading || user.loading) {
    return null
  }
  return (
    <div>
      <h2>books</h2>
      {curPage === 'reccs' && <div>your favourite genre is {curGenre}, recommending</div>}
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksFiltered.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {curPage === 'books' && (
        <div>
          {booksResult.data.allBooks
            .reduce(
              (genres, book) => [...new Set([...genres, ...book.genres])],
              []
            )
            .map((genre) => (
              <button key={genre} onClick={() => setCurGenre(genre)}>
                {genre}
              </button>
            ))}
          <button key="all" onClick={() => setCurGenre('')}>
            all genres
          </button>
        </div>
      )}
    </div>
  )
}

export default Books
