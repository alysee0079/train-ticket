import React, { memo } from 'react'
import { connect } from 'react-redux'
import Nav from '../common/Nav'
import List from './List'
import Bottom from './Bottom'
import './App.css'

const App = memo(function() {
  return (
    <div>
      <Nav />
      <List />
      <Bottom />
    </div>
  )
})

const mapStateToProps = state => {}

const mapDispatchToProps = dispatch => {}

export default connect(mapStateToProps, mapDispatchToProps)(App)
