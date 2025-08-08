// routes/routes.ts
import {
  createRootRoute,
  createRoute,
  createRouter,
  redirect
} from '@tanstack/react-router';
import { lazy } from 'react';
import { usuarioStore } from '../Store/authstore';
import DashboardLayout from '../pages/Dashboard';

const RootRoute = createRootRoute({
  component: DashboardLayout,
});

const MainRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: '/',
  component: lazy(() => import('../pages/MainPage')),
  beforeLoad: () => {
    if (usuarioStore.state.autenticado) throw redirect({ to: '/app/home' });
    if (!usuarioStore.state.autenticado) throw redirect({ to: '/app/home' });
  },
});

const LoginRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: '/login',
  component: lazy(() => import('../pages/Usuario/Login-page')),
  beforeLoad: () => {
    if (usuarioStore.state.autenticado) throw redirect({ to: '/app/home' });
  },
});

const RegisterRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: '/register',
  component: lazy(() => import('../pages/Login/Register')),
  beforeLoad: () => {
    if (usuarioStore.state.autenticado) throw redirect({ to: '/app/home' });
  },
});
const NosotrosRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: '/nosotros',
  component: lazy(() => import('../pages/nosotros')),
  beforeLoad: () => {
    if (usuarioStore.state.autenticado) throw redirect({ to: '/app/home' });
  },
});

const InvitacionPublicaRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: '/invitacion/$invitacionId',
  component: lazy(() => import('../pages/Invitaciones/AlfonsoyCristinaBoda')),
});

const AppLayoutRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: '/app',
  component: lazy(() => import('../pages/Dashboard')),
  beforeLoad: () => {
    if (!usuarioStore.state.autenticado) throw redirect({ to: '/login' });
  },
});

const HomeRoute = createRoute({
  getParentRoute: () => AppLayoutRoute,
  path: '/home',
  component: lazy(() => import('../pages/home')),
});

// Agrega tus rutas privadas aquí como hijas de AppLayoutRoute
const gestionInvitadosRoute = createRoute({
  getParentRoute: () => AppLayoutRoute,
  path: '/invitados',
  component: lazy(() => import('../pages/invitados/GestionInvitados')),
});

const SkeletonRoute = createRoute({
  getParentRoute: () => AppLayoutRoute,
  path: '/skeleton',
  component: lazy(() => import('../pages/components/skeleton')),
});
const RecepcionRoute = createRoute({
  getParentRoute: () => AppLayoutRoute,
  path: '/recepcionInvitados',
  component: lazy(() => import('../pages/invitados/RecepcionInvitados')),
});
const ContraseñaRoute = createRoute({
  getParentRoute: () => AppLayoutRoute,
  path: '/ChangePassword',
  component: lazy(() => import('../pages/Usuario/CambiarContraseña')),
});
const EditRoute = createRoute({
  getParentRoute: () => AppLayoutRoute,
  path: '/EditUser',
  component: lazy(() => import('../pages/Usuario/editarUsuario')),
});

const NotFoundRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: '*',
  beforeLoad: () => {
    throw redirect({ to: '/login' });
  },
  component: () => null,
});

const routeTree = RootRoute.addChildren([
  MainRoute,
  LoginRoute,
  RegisterRoute,
  NosotrosRoute,
  InvitacionPublicaRoute,
  AppLayoutRoute.addChildren([
    HomeRoute,
    gestionInvitadosRoute,
    SkeletonRoute,
    RecepcionRoute,
    ContraseñaRoute,
    EditRoute,
  ]),
  NotFoundRoute,
]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
