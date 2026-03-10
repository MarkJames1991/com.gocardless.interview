import { Route, Routes } from 'react-router-dom'
import {PageContent} from "../components/pages/PageContent.tsx";
import {HomePage} from "../pages/home/HomePage.tsx";
import { appRoutes } from './routeConfig'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<HomePage />} path="/" />
      {appRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            <PageContent
              description={route.description}
              emptyState={route.emptyState}
              title={route.title}
            />
          }
        />
      ))}
    </Routes>
  )
}
