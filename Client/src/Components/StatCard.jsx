// function StatCard({
//     icon,
//     iconClass,
//     label,
//     value,
//     description,
// }) {

//     return (

//         <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5">

//             <div className="flex items-center justify-between">

//                 <div
//                     className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${iconClass}`}
//                 >
//                     {icon}
//                 </div>

//                 <span className="text-[10px] font-semibold tracking-wider text-slate-400">
//                     {label}
//                 </span>

//             </div>


//             <p className="mt-4 text-2xl sm:text-3xl font-bold text-slate-900 truncate">
//                 {value}
//             </p>


//             <p className="mt-1 text-xs sm:text-sm text-slate-500">
//                 {description}
//             </p>

//         </div>
//     );
// }

// export default StatCard;

import React from "react";

function StatCard({
    label,
    value,
    description,
    trend,
    trendLabel = "vs last month",
}) {
    return (
        <div className="group relative overflow-hidden rounded-md  bg-white p-4 shadow-2xs transition-all duration-300 hover:border-slate-300 hover:shadow-md sm:p-5">

            {/* Header */}
            <div className="flex items-center justify-between gap-3">

                <span className="truncate text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    {label}
                </span>

            </div>


            {/* Content */}
            <div className="mt-3">

                {/* Metric Value */}
                <h3 className="truncate text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                    {value ?? "0"}
                </h3>


                {/* Description / Trend */}
                <div className="mt-1.5 flex flex-wrap items-center justify-between gap-2">

                    {description && (
                        <p className="truncate text-xs font-medium text-slate-500 sm:text-sm">
                            {description}
                        </p>
                    )}


                    {/* Trend */}
                    {trend && (
                        <div className="flex items-center gap-1.5 text-[11px] font-semibold">

                            <span
                                className={`inline-flex items-center rounded-md px-1.5 py-0.5 ring-1 ${
                                    trend.positive
                                        ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                                        : "bg-rose-50 text-rose-700 ring-rose-200"
                                }`}
                            >
                                {trend.positive ? "↑" : "↓"} {trend.value}
                            </span>

                            {trendLabel && (
                                <span className="text-[10px] text-slate-400">
                                    {trendLabel}
                                </span>
                            )}

                        </div>
                    )}

                </div>

            </div>

        </div>
    );
}

export default StatCard;