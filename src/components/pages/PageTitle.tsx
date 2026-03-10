type PageTitleProps = {
    title: React.ReactNode;
};

export const PageTitle = ({ title }: PageTitleProps) => {
    return (
        <div className="min-w-0">
            <h1 className="break-words text-2xl font-semibold tracking-[-0.03em] text-[#1f1d1a]">
                {title}
            </h1>
        </div>
    );
};
