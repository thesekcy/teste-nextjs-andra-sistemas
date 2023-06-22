import { AuthContext } from '@/contexts/Auth/AuthContext';
import Image from 'next/image';
import Link from 'next/link';
import LogoutIcon from '@mui/icons-material/Logout';
import React, { useContext } from 'react';
import { Container } from '@mui/material';

export default function NavComponent() {
  const auth = useContext(AuthContext)

  return (
    <nav className='nav_component mb-4'>
      <Container className='d-flex' maxWidth="lg">
        <Link href={'/'}>
          <Image src="/images/logobranco.png" height={50} width={191} alt="Logo branca Andra Sistemas" />
        </Link>

        <button onClick={() => auth.signout()}><LogoutIcon /></button>
      </Container>
    </nav>
  )
}
