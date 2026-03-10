export type SidebarMenuItem = {
  label: string
  badge?: string
  children?: SidebarMenuItem[]
  expanded?: boolean
  href?: string
}
