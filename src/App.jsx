import { lazy, Suspense } from 'react'
import { Routes , Route , Navigate } from 'react-router-dom'
import './App.css'

import MainLayout from '@/components/MainLayout'
import BlankLayout from '@/components/BlankLayout'
import Loading from '@/components/Loading'

const Discover = lazy(() => import('@/pages/Discover'))
const Chat = lazy(() => import('@/pages/Chat'))
const Shelf = lazy(() => import('@/pages/Shelf'))
const Account = lazy(() => import('@/pages/Account'))
const Login = lazy(() => import('@/pages/Login'))


function App() {

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* 带有导航栏的路由 */}
          <Route  element={<MainLayout />}>
            <Route path="/" element={<Navigate to="/discover" />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/shelf" element={<Shelf />} />
            <Route path="/account" element={<Account />} />
          </Route>
          {/* 不带导航栏的路由 */}
          <Route  element={<BlankLayout />}>
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  )
}

export default App
