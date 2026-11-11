import React from 'react';

const values = [
    {
        icon: '🎯',
        title: 'Mission-Driven',
        description:
            'Our mission is to empower businesses with innovative digital solutions that drive sustainable growth. Every strategy we build is aligned with your specific business goals.',
    },
    {
        icon: '💡',
        title: 'Innovation First',
        description:
            'We constantly push boundaries and embrace the latest technologies. From AI-powered tools to cutting-edge frameworks, we ensure your business stays ahead of the curve.',
    },
    {
        icon: '🤝',
        title: 'True Partnership',
        description:
            "We don't just work for you — we work with you. Building genuine partnerships, maintaining transparency, and celebrating your wins as our own.",
    },
    {
        icon: '🏆',
        title: 'Excellence Always',
        description:
            'Quality is non-negotiable. We strive for perfection in every line of code, every piece of content, every campaign — because your business deserves nothing less.',
    },
];

const CoreValues = () => {
    return (
        <section id="CoreValues" className="mt-[112px]">
            <div className="container">
                <div className="section-header" data-aos="fade-up">
                    <span className="section-tag">WHAT WE STAND FOR</span>
                    <h2 className="section-title">
                        Our Core <span className="text-coffee">Values</span>
                    </h2>
                    <p className="section-desc">
                        These aren't just words on a wall. These are the principles that guide every decision, every project, every interaction at Fitscalez.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {values.map((val, idx) => (
                        <div
                            key={val.title}
                            data-aos="fade-up"
                            data-aos-delay={idx * 100}
                            className="rounded-[22px] border border-Primary/12 bg-[#DFDCD5] p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-coffee shadow-[0_15px_35px_rgba(22,22,22,0.05)]"
                        >
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-coffee/10 border border-coffee/20 flex items-center justify-center text-2xl mb-5">
                                    {val.icon}
                                </div>
                                <h3 className="font-soldier text-2xl font-bold uppercase text-Primary mb-3 leading-snug">
                                    {val.title}
                                </h3>
                                <p className="font-poppins text-xs md:text-sm text-second/80 leading-relaxed">
                                    {val.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CoreValues;

