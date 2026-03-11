import type { ReactNode } from 'react'
import BlankDrawer from '../drawer/BlankDrawer'
import { DrawerParam } from '../drawer/DrawerParam'
import { DownloadIcon, ExternalLinkIcon, FilterIcon } from '../icons/AppIcons'
import type { FilterDrawerRenderProps } from './types'

type DataTableToolbarProps = {
  filterDrawerName: string
  filterDrawerTitle: string
  onExport?: () => void
  onFilter?: () => void
  onImport?: () => void
  renderFilterDrawer?: (props: FilterDrawerRenderProps) => ReactNode
  resultLabel: string
}

export function DataTableToolbar({
  filterDrawerName,
  filterDrawerTitle,
  onExport,
  onFilter,
  onImport,
  renderFilterDrawer,
  resultLabel,
}: DataTableToolbarProps) {
  return (
    <div className="flex items-center justify-between gap-3 py-4 text-[#201d1a] sm:py-5">
      {renderFilterDrawer ? (
        <DrawerParam name={filterDrawerName}>
          {(drawer) => (
            <>
              <button
                className="inline-flex items-center gap-2 text-[1.85rem] font-semibold tracking-[-0.03em]"
                type="button"
                onClick={() => {
                  drawer.open()
                  onFilter?.()
                }}
              >
                <FilterIcon />
                <span>Filter</span>
                <span className="font-normal tracking-normal text-[#76716a]">{resultLabel}</span>
              </button>
              <BlankDrawer open={drawer.isOpen} onCancel={drawer.close} title={filterDrawerTitle}>
                {renderFilterDrawer({ close: drawer.close })}
              </BlankDrawer>
            </>
          )}
        </DrawerParam>
      ) : (
        <button
          className="inline-flex items-center gap-2 font-semibold tracking-[-0.03em]"
          type="button"
          onClick={onFilter}
        >
          <FilterIcon />
          <span>Filter</span>
          <span className="font-normal tracking-normal text-[#76716a]">{resultLabel}</span>
        </button>
      )}

      <div className="flex items-center gap-5 font-semibold tracking-[-0.03em] sm:gap-6">
        <button className="inline-flex items-center gap-2" type="button" onClick={onImport}>
          <DownloadIcon />
          <span>Import</span>
        </button>
        <button className="inline-flex items-center gap-2" type="button" onClick={onExport}>
          <ExternalLinkIcon />
          <span>Export</span>
        </button>
      </div>
    </div>
  )
}
