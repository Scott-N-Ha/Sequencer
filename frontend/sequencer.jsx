import React from 'react'
import ReactDom from 'react-dom'
import Sequence from './sequence.jsx'

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById('root');
  ReactDom.render(<Sequence />, root);
})