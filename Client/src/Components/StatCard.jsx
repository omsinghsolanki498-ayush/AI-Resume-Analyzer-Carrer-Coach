function StatCard({
    icon,
    iconClass,
    label,
    value,
    description,
}) {

    return (

        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5">

            <div className="flex items-center justify-between">

                <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${iconClass}`}
                >
                    {icon}
                </div>

                <span className="text-[10px] font-semibold tracking-wider text-slate-400">
                    {label}
                </span>

            </div>


            <p className="mt-4 text-2xl sm:text-3xl font-bold text-slate-900 truncate">
                {value}
            </p>


            <p className="mt-1 text-xs sm:text-sm text-slate-500">
                {description}
            </p>

        </div>
    );
}

export default StatCard;