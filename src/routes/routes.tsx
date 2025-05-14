
import App from '../App';
import {
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router'
import { lazy } from 'react'

const RootRoute = createRootRoute({
  component: App, 
});

const LoginRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: '/login',
  component: lazy(() => import('../pages/Login')),
})

const RegisterRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: '/register',
  component: lazy(() => import('../pages/Register')),
})

const PokemonRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: '/pokemon',
  component: lazy(() => import('../pages/Pokemon')),
})

const ClimaRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: '/clima',
  component: lazy(() => import('../pages/Clima')),
})


const routeTree = RootRoute.addChildren([
  LoginRoute,
  RegisterRoute,
  PokemonRoute,
  ClimaRoute,
])

export const router = createRouter({ routeTree })

// Necesario para TypeScript
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}