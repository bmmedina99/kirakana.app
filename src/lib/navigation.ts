import { routeLabels, routes } from './routes'

export const navLinks = [
  {
    title: routeLabels[routes.home()],
    href: routes.home(),
  },
  {
    title: routeLabels[routes.learn.index()],
    href: routes.learn.index(),
  },
  {
    title: routeLabels[routes.practice.index()],
    href: routes.practice.index(),
  },
  {
    title: routeLabels[routes.progress()],
    href: routes.progress(),
  },
]
