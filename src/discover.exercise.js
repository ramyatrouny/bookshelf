/** @jsx jsx */
import { jsx } from '@emotion/core'

import './bootstrap'
import Tooltip from '@reach/tooltip'
import { FaSearch } from 'react-icons/fa'
import { Input, BookListUL, Spinner } from './components/lib'
import { BookRow } from './components/book-row'
import { client } from './utils/api-client'
import { useState, useEffect } from 'react'
import * as colors from './styles/colors'

const statusEnum = {
  idle: 'IDLE',
  loading: 'LOADING',
  success: 'SUCCESS',
  error: 'ERROR'
}

function DiscoverBooksScreen() {
  const [status, setStatus] = useState(statusEnum.idle);
  const [data, setData] = useState('');
  const [query, setQuery] = useState('');
  const [queried, setQueried] = useState(false);
  const [error, setError] = useState('')

  useEffect(() => {
    if (!queried) return;

    setStatus(statusEnum.loading);
    client(`books?query=${encodeURIComponent(query)}`).then(response => {
      setStatus(statusEnum.success)
      setData(response);
    }, (errorData) => {
      setStatus(statusEnum.error);
      setError(errorData)
    })

  }, [query, queried])

  const isLoading = status === statusEnum.loading;
  const isSuccess = status === statusEnum.success;
  const isError = status === statusEnum.error;

  function handleSearchSubmit(event) {
    event.preventDefault();
    setQueried(false);
    setQuery(event.target.elements.search.value);
  }

  return (
    <div
      css={{ maxWidth: 800, margin: 'auto', width: '90vw', padding: '40px 0' }}
    >
      <form onSubmit={handleSearchSubmit}>
        <Input
          placeholder="Search books..."
          id="search"
          css={{ width: '100%' }}
        />
        <Tooltip label="Search Books">
          <label htmlFor="search">
            <button
              type="submit"
              css={{
                border: '0',
                position: 'relative',
                marginLeft: '-35px',
                background: 'transparent',
              }}
            >
              {isLoading ? (<Spinner />) :
                isError ?
                  (<div css={{ color: colors.danger }}>
                    <p>There was an error:</p>
                    <pre>{error.message}</pre>
                  </div>) :
                  <FaSearch aria-label="search" />}
            </button>
          </label>
        </Tooltip>
      </form>

      {isSuccess ? (
        data?.books?.length ? (
          <BookListUL css={{ marginTop: 20 }}>
            {data.books.map(book => (
              <li key={book.id} aria-label={book.title}>
                <BookRow key={book.id} book={book} />
              </li>
            ))}
          </BookListUL>
        ) : (
            <p>No books found. Try another search.</p>
          )
      ) : null}
    </div>
  )
}

export { DiscoverBooksScreen }
