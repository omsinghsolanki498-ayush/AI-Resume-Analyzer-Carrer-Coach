function CareerToolCard({
    icon,
    iconClass,
    title,
    description,
    onClick,
}) {

    return (

        <button
            onClick={onClick}
            className="group w-full text-left bg-white border border-slate-200 rounded-2xl p-5 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100/40 transition"
        >

            <div className="flex items-center justify-between">

                <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold ${iconClass}`}
                >
                    {icon}
                </div>

                <span className="text-slate-300 group-hover:text-indigo-600 text-xl transition">
                    →
                </span>

            </div>


            <h3 className="mt-5 font-bold text-slate-900">
                {title}
            </h3>


            <p className="mt-2 text-sm text-slate-500 leading-6">
                {description}
            </p>

        </button>
    );
}

export default CareerToolCard;