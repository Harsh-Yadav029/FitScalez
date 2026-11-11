import React from 'react';

const stats = [
    {
        icon: '📅',
        value: '3+ Yrs',
        label: 'In Business',
    },
    {
        icon: '👥',
        value: '80+',
        label: 'Happy Clients',
    },
    {
        icon: '🌐',
        value: '150+',
        label: 'Projects Completed',
    },
    {
        icon: '⭐',
        value: '5★',
        label: 'Average Rating',
    },
];

const AboutCounters = () => {
    return (
        <section className="mt-[70px] lg:mt-[100px]">
            <div className="container">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {stats.map((item, idx) => (
                        <div
                            key={item.label}
                            data-aos="fade-up"
                            data-aos-delay={idx * 100}
                            className="rounded-[22px] border border-Primary/12 bg-[#DFDCD5] p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-coffee shadow-[0_10px_30px_rgba(22,22,22,0.04)]"
                        >
                            <div className="text-3xl mb-2">{item.icon}</div>
                            <div className="font-soldier text-4xl lg:text-5xl font-bold text-coffee leading-none mb-1">
                                {item.value}
                            </div>
                            <div className="font-poppins text-xs font-semibold uppercase tracking-wider text-second/70">
                                {item.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutCounters;

