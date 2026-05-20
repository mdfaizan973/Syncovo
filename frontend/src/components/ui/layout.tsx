function Section({ title, subtitle, children }: any) {
    return (
        <section className="mb-12">
            <div className="mb-5">
                <h2 className="text-lg font-bold text-gray-900 tracking-tight">{title}</h2>
                {subtitle && <p className="text-sm text-gray-400 mt-0.5">{subtitle}</p>}
            </div>
            {children}
        </section>
    );
}

function Row({ label, children }: any) {
    return (
        <div className="mb-4">
            {label && <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">{label}</p>}
            <div className="flex flex-wrap gap-2.5 items-center">{children}</div>
        </div>
    );
}


export { Section, Row };