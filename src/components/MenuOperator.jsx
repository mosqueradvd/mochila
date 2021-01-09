import React from 'react'
import Link from 'next/link'
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core'

import CardMembershipIcon from '@material-ui/icons/CardMembership'

const MenuOperator = () => {
  return (
    <List component='nav'>
      <Divider />
      <Link href='/operator'>
        <ListItem button>
          <ListItemIcon>
            <CardMembershipIcon color='primary' />
          </ListItemIcon>
          <ListItemText>Generar certificado</ListItemText>
        </ListItem>
      </Link>

    </List>
  )
}

export default MenuOperator
