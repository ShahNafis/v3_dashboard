import React from 'react'
import ClippedDrawer from '../components/EXP/Layout'

export const Home = (props): JSX.Element => (
  <div className="container">
    <ClippedDrawer>
      {`
        Stars: ${props.stars}
        number: ${props.number}
        `}
    </ClippedDrawer>
  </div>
)

export async function getServerSideProps() {
  const res = await fetch('https://api.github.com/repos/vercel/next.js')
  const json = await res.json()

  return {
    props: {
      stars: json.stargazers_count,
      number: Math.random(),
    }, // will be passed to the page component as props
  }
}

export default Home
