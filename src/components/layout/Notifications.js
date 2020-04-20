import { Badge, IconButton, Menu, MenuItem, Tooltip, Typography } from '@material-ui/core'
import { Chat, Favorite } from '@material-ui/icons'
import NotificationIcon from '@material-ui/icons/Notifications'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { markNotificationsRead } from '../../redux/actions/userAction'

function Notifications({notifications, markNotificationsRead}) {
  const [anchorEl, setAnchorEl] = useState(null)

  dayjs.extend(relativeTime)

  const onMenuOpened = () => {
    let unReadNotificationsIds = notifications.filter(not => !not.read).map(not => not.notificationId)
    markNotificationsRead(unReadNotificationsIds)
  }

  const renderNotification = () => {
    let notificationIcon
    if(notifications && notifications.length > 0){
      notifications.filter(not => not.read === false).length > 0
      ? notificationIcon = (
        <Badge  badgeContent={notifications.filter(not => not.read === false).length} color='secondary'>
        <NotificationIcon/>
        </Badge>
      ) : (
        notificationIcon = <NotificationIcon/>
      )
    } else {
      notificationIcon = <NotificationIcon/>
    }
    return notificationIcon
  }

  const notificationsMarkup = () => {
    notifications && notifications.length > 0 ? (
      notifications.map(not => {
        const verb = not.type === 'like' ? 'liked' : 'commented on'
        const time = dayjs(not.createdAt).format()
        const iconColor = not.read ? 'primary' : 'scondary'
        const icon = not.type === 'like' ? (
          <Favorite color={iconColor} style={{marginRight: 10}}/>
        ) : (
          <Chat color={iconColor} style={{marginRight: 10}}/>
        )
        return (
          <MenuItem key={not.createdAt} onClick={() => setAnchorEl(null)}>
          <Typography component={Link}
          color='default'
          variant='body1'
          to={`/users/${not.recipient}/scream/${not.screamId}`}>
          {not.sender} {verb} your scream {time}
          </Typography>
          </MenuItem>
        )
      })
    ) : (
      <MenuItem onClick={() => setAnchorEl(null)}>
      You have no notifications yet
      </MenuItem>
    )
  }

  return (
    <Fragment>
      <Tooltip placement='top' title='Notifications'>
      <IconButton aria-owns={anchorEl ? 'somple-menu' : undefined} aria-haspopup='true' onClick={(e) => setAnchorEl(e.target)}
      >
      {renderNotification()}
      </IconButton>
      </Tooltip>
      <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={() => setAnchorEl(null)}
      onEntered={onMenuOpened}>
      {notificationsMarkup()}
      </Menu>
    </Fragment>
  )
}

const mapStateToProps = ({user}) => {
  return {
    notifications: user.notifications
  }
}

export default connect(mapStateToProps, {markNotificationsRead})(Notifications)
