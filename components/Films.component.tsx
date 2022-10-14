import Link from 'next/link';
import React from 'react'

interface FilmsListProps {
  films: FilmsType
}
function FilmsList({ films }: FilmsListProps) {
  return (
    <>
      <ul className="list-none space-y-4 text-4xl font-bold mb-3">
        {films &&
          films.data.map((film) => {
            return (
              <li key={film.id}>
                <Link href={`film/` + film.attributes.slug}>
                  {film.attributes.title}
                </Link>
              </li>
            );
          })}
      </ul>
    </>
  );
}

export default FilmsList