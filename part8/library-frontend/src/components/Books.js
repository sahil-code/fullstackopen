import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'

import { ALL_BOOKS_GENRE } from '../queries'

const Books = ({ show, genres }) => {
  const [curGenre, setCurGenre] = useState('')
  const [booksFiltered, setBooksFiltered] = useState()

  const booksWithFilter = useQuery(ALL_BOOKS_GENRE, {
    variables: {
      genre: curGenre,
    },
    manual: true,
  })
  useEffect(() => {
    if (!booksWithFilter.loading) {
      setBooksFiltered(booksWithFilter.data.allBooks)
    }
  }, [booksWithFilter])

  const changeGenre = async (newGenre) => {
    console.log(newGenre)
    await setCurGenre(newGenre)
    console.log(curGenre)
    await booksWithFilter.refetch()
    setBooksFiltered(booksWithFilter.data.allBooks)
  }

  if (!show) {
    return null
  }
  return (
    <div>
      <h2>books</h2>

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
      {genres.map((genre) => (
        <button key={genre} onClick={() => changeGenre(genre)}>
          {genre}
        </button>
      ))}
      <button key="all" onClick={() => changeGenre('')}>
        all genres
      </button>
    </div>
  )
}

export default Books
