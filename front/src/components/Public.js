import {Link} from 'react-router-dom';

const Public = () => {
  return (
    <section className='public'>
      <header>
        <h1>Welcome to my <span className='nowrap'>PersonalPlayground</span></h1>
      </header>
      <main className='public_main'>
        <p>This will be my personal portfolio of different projects that I decide to show off. The website itself is an example of such a project as I built this with a tech stack I've never used before. Node.js and Express.js for the backend, PostgreSQL for the database, and React for the frontend.</p>
      </main>
      <footer>
        © Sheehy development. All rights resereved
      </footer>
    </section>
  )
}

export default Public
