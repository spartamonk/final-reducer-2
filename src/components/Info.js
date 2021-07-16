import React from 'react'
import { useGlobalContext } from '../context/context'
import styled from 'styled-components'
import { GoRepo, GoGist } from 'react-icons/go'
import { FiUsers, FiUserPlus } from 'react-icons/fi'

const UserInfo = () => {
  const {
    githubUser: { public_repos, followers, following, public_gists },
  } = useGlobalContext()

  const userInfo = [
    {
      name: 'repos',
      value: public_repos,
      icon: <GoRepo className='icon' />,
      color: 'pink',
    },
    {
      name: 'followers',
      value: followers,
      icon: <FiUsers className='icon' />,
      color: 'green',
    },
    {
      name: 'following',
      value: following,
      icon: <FiUserPlus className='icon' />,
      color: 'purple',
    },
    {
      name: 'gists',
      value: public_gists,
      icon: <GoGist className='icon' />,
      color: 'yellow',
    },
  ]
  return (
    <section className='section'>
      <Wrapper className='section-center'>
        {userInfo.map((item, index) => {
          return (
            <Info key={index} {...item} />
          )
        })}
      </Wrapper>
    </section>
  )
}
const Info = ({ name, value, icon, color }) => {
  return (
    <article  className='item'>
      <span className={color}>{icon}</span>
      <div>
        <h3>{value}</h3>
        <p>{name}</p>
      </div>
    </article>
  )
}
const Wrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem 2rem;
  @media (min-width: 640px) {
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  }
  .item {
    border-radius: var(--radius);
    padding: 1rem 2rem;
    background: var(--clr-white);
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: 3rem;
    align-items: center;
    span {
      width: 3rem;
      height: 3rem;
      display: grid;
      place-items: center;
      border-radius: 50%;
    }
    .icon {
      font-size: 1.5rem;
    }
    h3 {
      margin-bottom: 0;
      letter-spacing: 0;
    }
    p {
      margin-bottom: 0;
      text-transform: capitalize;
    }
    .pink {
      background: #ffe0f0;
      color: #da4a91;
    }
    .green {
      background: var(--clr-primary-10);
      color: var(--clr-primary-5);
    }
    .purple {
      background: #e6e6ff;
      color: #5d55fa;
    }
    .yellow {
      background: #fffbea;
      color: #f0b429;
    }
  }
`

export default UserInfo