import { BellIcon, SearchIcon, SettingsIcon } from '../components/icons/AppIcons'
import { useDrawerParam } from '../components/drawer/hooks/use-drawer-param/useDrawerParam'
import {NotificationsDrawer} from "../components/notifications/NotificationsDrawer.tsx";
import { Sidebar } from '../components/sidebar/Sidebar'
import { Button } from '../components/button/Button'
import { AppRoutes } from './AppRoutes'

export function AppShell() {
  const notificationsDrawer = useDrawerParam('notifications')

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f5f3ef] text-[#1f1d1a]">
      <div className="min-h-screen lg:flex">
        <Sidebar />

        <section className="min-w-0 flex-1 px-4 py-4 sm:px-6 sm:py-5 lg:px-12 lg:py-6">
          <div className="mx-auto flex min-w-0 max-w-[1528px] flex-col">
            <header className="flex flex-wrap items-center justify-start gap-4 border-b border-[#ddd7cf] pb-4 text-sm font-semibold sm:justify-end sm:gap-5 sm:pb-5 sm:text-[1.02rem]">
              <Button
                className="h-auto bg-transparent px-0 py-0 text-[#1f1d1a] hover:bg-transparent hover:text-black"
                variant="ghost"
              >
                <SearchIcon />
                <span>Search</span>
              </Button>
              <Button
                aria-expanded={notificationsDrawer.isOpen}
                className="h-auto bg-transparent px-0 py-0 text-[#1f1d1a] hover:bg-transparent hover:text-black"
                variant="ghost"
                onClick={() => notificationsDrawer.open()}
              >
                <BellIcon />
                <span>Notifications</span>
              </Button>
              <Button
                className="h-auto bg-transparent px-0 py-0 text-[#1f1d1a] hover:bg-transparent hover:text-black"
                variant="ghost"
              >
                <SettingsIcon />
                <span>Settings</span>
              </Button>
            </header>

            <AppRoutes />
          </div>
        </section>
      </div>

      <NotificationsDrawer isOpen={notificationsDrawer.isOpen} onClose={notificationsDrawer.close} />
    </main>
  )
}
