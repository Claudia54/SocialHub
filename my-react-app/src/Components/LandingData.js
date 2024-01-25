import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as Io5Icons from 'react-icons/io5';
import * as MdIcons from 'react-icons/md';

/**
 * Data for the landing page navigation menu.
 */
export const LandingData = [
  {
    title: 'About Us',
    path: '/about',
    icon: <FaIcons.FaInfoCircle />,
    cName: 'nav-text'
  },
  {
    title: 'Contacts',
    path: '/contacts',
    icon: <FaIcons.FaAddressBook  />,
    cName: 'nav-text'
  }
];