import {
  DownloadIcon,
  ExternalLinkIcon,
  FilterIcon,
  PlusIcon,
} from '../../components/icons/AppIcons'
import { Button } from '../../components/button/Button'
import { PaymentsEmptyState } from '../payments/PaymentsEmptyState'

type PageContentProps = {
  title: string
  description?: string
  emptyState?: boolean
}

export function PageContent({ title, description, emptyState = false }: PageContentProps) {
  return (
    <div className="min-w-0 pt-8 sm:pt-12 lg:pt-16">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <h1 className="break-words text-2xl font-semibold tracking-[-0.03em] text-[#1f1d1a]">
            {title}
          </h1>
        </div>
        <Button className="self-start sm:px-6 sm:py-4 sm:text-base">
          <span>Create payment</span>
          <PlusIcon />
        </Button>
      </div>

      <div className="mt-8 flex flex-col gap-4 border-b border-[#ddd7cf] pb-6 sm:mt-9 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
        <div className="inline-flex flex-wrap items-center gap-2 text-base font-semibold text-[#1f1d1a] sm:text-lg">
          <FilterIcon />
          <span>Filter</span>
          <span className="font-normal text-[#6d6962]">(0 results)</span>
        </div>
        <div className="flex flex-wrap items-center gap-5 text-base font-semibold text-[#1f1d1a] sm:gap-6 sm:text-lg">
          <Button
            className="h-auto bg-transparent px-0 py-0 text-[#1f1d1a] hover:bg-transparent hover:text-black"
            variant="ghost"
          >
            <DownloadIcon />
            <span>Import</span>
          </Button>
          <Button
            className="h-auto bg-transparent px-0 py-0 text-[#1f1d1a] hover:bg-transparent hover:text-black"
            variant="ghost"
          >
            <ExternalLinkIcon />
            <span>Export</span>
          </Button>
        </div>
      </div>

      {emptyState ? (
        <PaymentsEmptyState />
      ) : (
        <div className="flex min-h-[50vh] items-center justify-center px-2 py-10 sm:min-h-[58vh] sm:px-4 sm:py-12">
          <p className="max-w-2xl text-center  leading-9 text-[#393630]  sm:leading-10">
            {description ?? `${title} content goes here.`}
          </p>
        </div>
      )}
    </div>
  )
}
