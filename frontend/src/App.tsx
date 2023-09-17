import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './pages/sign-in';
import NotFound from './pages/not-found';

export interface AppProps {
  //loading: Boolean;
  //dialogConfig: DialogProps;
  //setDialogConfig: (config: any, dispatch: any) => void;
}

const App = ({ }: AppProps) => {

  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
/*
const mapStateToProps = (state: any) => ({
  loading: state.product.loading,
  dialogConfig: state.product.dialogConfig
})

const mapDispatchToProps = (dispatch: any) => {
  return {
    setDialogConfig: (config: any) => setDialogConfig(config, dispatch)
  }
}*/

export default App //connect(mapStateToProps, mapDispatchToProps)(App)