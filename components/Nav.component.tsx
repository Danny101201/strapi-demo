

import Link from 'next/link';
import React from 'react';
const Nav = () => {

  return (
    <nav
      className="
          flex flex-wrap
          items-center
          justify-between
          w-full
          py-4
          md:py-0
          px-4
          text-lg text-gray-700
          bg-white
        "
    >
      <div>
        <Link href="/" passHref>
          {/* eslint-disable @next/next/no-img-element */}
          <div className='relative cursor-pointer w-[5rem] h-[5rem] overflow-hidden rounded-full my-2'>
            <img
              src="https://picsum.photos/200/300"
              className='absoulte top-0 left-0 w-full h-full object-cover'
              width={200}
              height={50}
              alt="Strapi Logo"
            />
          </div>

        </Link>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="menu-button"
        className="h-6 w-6 cursor-pointer md:hidden block"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
      <div
        className="hidden w-full md:flex md:items-center md:w-auto"
        id="menu"
      >
        <ul
          className="
              pt-4
              text-base text-gray-700
              md:flex
              md:justify-between 
              md:pt-0 space-x-2"
        >
          <li>
            <Link href="/">
              <a className="md:p-2 py-2 block hover:text-purple-400">Home</a>
            </Link>
          </li>
          <li>
            <Link href="/films">
              <a className="md:p-2 py-2 block hover:text-purple-400" href="#">
                Films
              </a>
            </Link>
          </li>

        </ul>
      </div>
    </nav>
  );
};

export default Nav;