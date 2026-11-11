import React from 'react';

const differentiators = [
    {
        icon: '✅',
        title: 'Proven Track Record',
        description:
            '150+ successful projects across web development, digital marketing, SEO and brand building. Our results speak louder than promises.',
    },
    {
        icon: '🔒',
        title: 'Transparent & Honest',
        description:
            'No hidden fees, no false promises. Clear communication, regular updates and honest advice that puts your business interests first.',
    },
    {
        icon: '⚡',
        title: 'Fast Turnaround',
        description:
            'We respect your time. Projects are delivered on schedule with agile processes that allow quick iteration and rapid deployment.',
    },
    {
        icon: '💰',
        title: 'Best Value for Money',
        description:
            'Premium quality at competitive pricing. We optimize every rupee of your budget to maximize ROI and deliver outstanding results.',
    },
];

const WhyUs = () => {
    return (
        <section id="WhyUs" className="mt-[112px]">
            <div className="container">
                <div className="section-header" data-aos="fade-up">
                    <span className="section-tag">WHY FITSCALEZ</span>
                    <h2 className="section-title">
                        What Makes Us <span className="text-coffee">Different</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {differentiators.map((item, idx) => (
                        <div
                            key={item.title}
                            data-aos="fade-up"
                            data-aos-delay={idx * 100}
                            className="rounded-[22px] border border-Primary/12 bg-[#DFDCD5] p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-coffee shadow-[0_15px_35px_rgba(22,22,22,0.05)]"
                        >
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-coffee/10 border border-coffee/20 flex items-center justify-center text-2xl mb-5">
                                    {item.icon}
                                </div>
                                <h3 className="font-soldier text-2xl font-bold uppercase text-Primary mb-3 leading-snug">
                                    {item.title}
                                </h3>
                                <p className="font-poppins text-xs md:text-sm text-second/80 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyUs;

