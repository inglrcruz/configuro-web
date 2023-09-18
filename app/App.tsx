import * as React from 'react'
import { Provider } from "react-redux"
import store from './src/redux/store'
import { PersistGate } from "redux-persist/integration/react"
import { persistStore } from "redux-persist"
import StackNavigator from './src/screens/StackNavigator'

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistStore(store)}>
        <StackNavigator />
      </PersistGate>
    </Provider>
  )
}