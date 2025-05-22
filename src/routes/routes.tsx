import { usuarioStore } from '../Store/authstore'
import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  redirect
} from '@tanstack/react-router'
import { lazy } from 'react'

const RootRoute = createRootRoute({
  component: () => <Outlet />,
});

const LoginRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: '/login',
  component: lazy(() => import('../pages/Login')),
  beforeLoad: () => {
    if (usuarioStore.state.autenticado) throw redirect({ to: '/home' })
  },
})

const RegisterRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: '/register',
  component: lazy(() => import('../pages/Register')),
  beforeLoad: () => {
    if (usuarioStore.state.autenticado) throw redirect({ to: '/' })
  },
})
const DasRouter = createRoute({
  getParentRoute: () => RootRoute,
  path: '/',
  component: lazy(() => import('../pages/Dashboard')),
  beforeLoad: () => {
    if (!usuarioStore.state.autenticado) throw redirect({ to: '/login' })
  },
})


const PokemonRoute = createRoute({
  getParentRoute: () => DasRouter,
  path: '/pokemon',
  component: lazy(() => import('../pages/Pokemon')),
  beforeLoad: () => {
    if (!usuarioStore.state.autenticado) throw redirect({ to: '/login' })
  },
})

const SkeletonRoute = createRoute({
  getParentRoute: () => DasRouter,
  path: '/skeleton',
  component: lazy(() => import('../pages/skeleton')),
  beforeLoad: () => {
    if (!usuarioStore.state.autenticado) throw redirect({ to: '/login' })
  },
})

const TableRoute = createRoute({
  getParentRoute: () => DasRouter,
  path: '/table',
  component: lazy(() => import('../pages/table')),
  beforeLoad: () => {
    if (!usuarioStore.state.autenticado) throw redirect({ to: '/login' })
  },
})

const ClimaRoute = createRoute({
  getParentRoute: () => DasRouter,
  path: '/clima',
  component: lazy(() => import('../pages/Clima')),
  beforeLoad: () => {
    if (!usuarioStore.state.autenticado) {
      throw redirect({
        to: '/login',
      })
    }
  },
})

const HomeRoute = createRoute({
  getParentRoute: () => DasRouter,
  path: '/home',
  component: lazy(() => import('../pages/home')),
  beforeLoad: () => {
    if (!usuarioStore.state.autenticado) {
      throw redirect({
        to: '/login',
      })
    }
  },
})
const ContraseñaRoute = createRoute({
  getParentRoute: () => DasRouter,
  path: '/ChangePassword',
  component: lazy(() => import('../pages/Contraseña')),
  beforeLoad: () => {
    if (!usuarioStore.state.autenticado) {
      throw redirect({
        to: '/login',
      })
    }
  },
})
const editRoute = createRoute({
  getParentRoute: () => DasRouter,
  path: '/EditUser',
  component: lazy(() => import('../pages/editUser')),
  beforeLoad: () => {
    if (!usuarioStore.state.autenticado) {
      throw redirect({
        to: '/login',
      })
    }
  },
})


const NotFoundRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: '*',
  beforeLoad: () => {
    throw redirect({ to: '/login' })
  },
  component: () => null,
})

const routeTree = RootRoute.addChildren([
  LoginRoute,
  RegisterRoute,
  PokemonRoute,
  ClimaRoute,
  DasRouter,
  NotFoundRoute,
  ContraseñaRoute,
  editRoute,
  HomeRoute,
  SkeletonRoute,
  TableRoute
])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}