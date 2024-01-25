import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as Io5Icons from 'react-icons/io5';
import * as MdIcons from 'react-icons/md';

/**
 * Array containing sidebar data with navigation links and icons.
 */
export const SidebarData = [
  {
    title: 'Posts',
    path: '/calendar',
    icon: <MdIcons.MdChat />,
    cName: 'nav-text'
  },
  {
    title: 'Users',
    path: '/users',
    icon: <FaIcons.FaUsers  />,
    cName: 'nav-text'
  },
  {
    title: 'Accounts',
    path: '/accounts',
    icon: <Io5Icons.IoShareSocialSharp />,
    cName: 'nav-text'
  },
  {
    title: 'Groups',
    path: '/groups',
    icon: <Io5Icons.IoShareSocialSharp />,
    cName: 'nav-text'
  }
];