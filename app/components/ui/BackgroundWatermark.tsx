export default function BackgroundWatermark({ divAttr, spanAttr }: Readonly<{
    divAttr?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    spanAttr?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>
}>) {
    return <div {...divAttr} className={`absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-0 select-none pointer-events-none opacity-[0.03] whitespace-nowrap ${divAttr?.className}`}>
        <span {...spanAttr} className={`text-[25vw] md:text-[20vw] font-serif font-black leading-none uppercase tracking-tighter bg-gradient-to-t from-white to-transparent bg-clip-text text-transparent ${spanAttr?.className}`}>
            Huldah
        </span>
    </div>
}