import { styled } from '@mui/material/styles'
import { Typography } from '@mui/material'
import { ReactNode, DetailedHTMLProps, ButtonHTMLAttributes } from 'react'
import { Projects } from '@/types/routing'

const Header: React.FC<{ children: ReactNode }> = ({ children }) => {
  const Container = styled('td')(({ theme }) => ({
    padding: '10px',
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  }))

  return (
    <Container className="projects-table-data">
      <Typography fontWeight="bold">{children}</Typography>
    </Container>
  )
}

const Description = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}))

const MobileDescription = styled('td')(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    display: 'none',
  },
}))

const StyledButton = styled('button')(() => ({
  ':hover': {
    cursor: 'pointer',
    backgroundColor: '#ddd',
  },
}))

const TabBtn: React.FC<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    active: Projects
    id: Projects
  }
> = ({ id, onClick, active }) => (
  <StyledButton
    onClick={onClick}
    id={`${id}-btn`}
    className={`tab ${active === id && 'active'}`}
  >
    {id}
  </StyledButton>
)

export { Header, Description, MobileDescription, TabBtn }
