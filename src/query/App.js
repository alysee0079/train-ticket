import React, { memo } from 'react'
import { connect } from 'react-redux'
import './App.css'

const App = memo(function () {
  return <div>App</div>
})

const mapStateToProps = state => {}

const mapDispatchToProps = dispatch => {}

export default connect(mapStateToProps, mapDispatchToProps)(App)
