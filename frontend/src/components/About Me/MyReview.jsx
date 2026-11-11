import React, { useEffect, useRef, useState } from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import reviewImg1 from '../../assets/images/reviewimg1.png';
import reviewImg2 from '../../assets/images/reviewPfp2.png';
import reviewImg3 from '../../assets/images/reviewImg3.png';
import reviewImg4 from '../../assets/images/reviewImg4.jpg';

gsap.registerPlugin(ScrollTrigger);

const reviewsData = [
  {
    id: 1,
    lead: "A natural problem-solver.",
    quote:
      "Fitscalez consistently delivered clean, scalable code and brought fresh ideas to the table. Their ability to deliver data-driven growth and high-performance digital solutions made them an invaluable partner for our business.",
    author: "John Smith",
    role: "Agency Client",
    image: reviewImg1,
    rating: 5,
  },
  {
    id: 2,
    lead: "A fast learner and tech powerhouse.",
    quote:
      "Quickly adapted to new tools and frameworks, showing impressive growth and keeping projects modern and efficient. That adaptability made our development process future-proof.",
    author: "Jessica Aiba",
    role: "UI / UX Designer",
    image: reviewImg2,
    rating: 5,
  },
  {
    id: 3,
    lead: "High-converting e-commerce engineering.",
    quote:
      "Fitscalez built our entire e-commerce platform from scratch using MERN Stack. The website is blazing fast, looks premium, and our sales doubled within 60 days. Highly recommend Divyansh and the team!",
    author: "Rahul Sharma",
    role: "CEO, FashionWave India",
    image: reviewImg3,
    rating: 5,
  },
  {
    id: 4,
    lead: "Search rankings & business ROI.",
    quote:
      "Our organic traffic surged by 400% in 6 months with Fitscalez's targeted SEO strategy. We now rank #1 for our key target search terms in Delhi. The return on investment has been exceptional.",
    author: "Priya Kapoor",
    role: "Founder, MedCare Solutions",
    image: reviewImg4,
    rating: 5,
  },
  {
    id: 5,
    lead: "A creative and reliable partner.",
    quote:
      "Always brought an eye for detail, delivering robust frontend code and suggesting UX enhancements that elevated the product. Met every milestone on schedule without stress.",
    author: "Amit Gupta",
    role: "Marketing Head, GreenLeaf Organics",
    image: reviewImg1,
    rating: 5,
  },
];

const MyReview = () => {
  const outerRef = useRef(null);
  const cardsRef = useRef(null);
  const tweenRef = useRef(null);
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const outer = outerRef.current;
    const cards = cardsRef.current;
    if (!outer || !cards) return;

    const computeMaxTranslate = () => {
      const scrollWidth = cards.scrollWidth;
      const clientWidth = window.innerWidth;
      const padding = window.innerWidth > 768 ? 120 : 32;
      return -(scrollWidth - clientWidth + padding);
    };

    // Delay initialization slightly to let fonts & images finish initial layout
    const timer = setTimeout(() => {
      const maxScroll = Math.abs(computeMaxTranslate());

      const tween = gsap.to(cards, {
        x: () => computeMaxTranslate(),
        ease: "none",
        scrollTrigger: {
          trigger: outer,
          start: "top top",
          end: () => `+=${maxScroll}`,
          pin: true,
          anticipatePin: 1,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(
              reviewsData.length - 1,
              Math.floor(self.progress * reviewsData.length)
            );
            setCurrentIdx(idx);
          },
        },
      });

      tweenRef.current = tween;
      ScrollTrigger.refresh();
    }, 150);

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
      if (tweenRef.current) {
        tweenRef.current.scrollTrigger?.kill();
        tweenRef.current.kill();
      }
      gsap.killTweensOf(cards);
    };
  }, []);

  const slideManual = (direction) => {
    const cards = cardsRef.current;
    if (!cards) return;

    const cardWidth = window.innerWidth > 768 ? 572 : window.innerWidth * 0.85;
    const currentX = gsap.getProperty(cards, "x") || 0;
    const newX = direction === "next" ? currentX - cardWidth : currentX + cardWidth;

    const maxLeft = -(cards.scrollWidth - window.innerWidth + 80);
    const clampedX = Math.max(maxLeft, Math.min(0, newX));

    gsap.to(cards, {
      x: clampedX,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  return (
    <div id="ScrollCardsHorizontal" ref={outerRef} className="cards-outer relative overflow-hidden">
      {/* Terracotta Ambient Lighting */}
      <div
        className="pointer-events-none absolute -top-32 -left-20 w-[550px] h-[450px] rounded-full opacity-20 blur-[130px]"
        style={{
          background: 'radial-gradient(circle, rgba(191,74,26,0.7) 0%, rgba(224,109,59,0.3) 50%, transparent 75%)',
        }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 w-[450px] h-[350px] rounded-full opacity-15 blur-[120px]"
        style={{
          background: 'radial-gradient(circle, rgba(191,74,26,0.5) 0%, transparent 70%)',
        }}
      />

      {/* Integrated Section Header */}
      <div className="container relative z-10 mb-8 md:mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-poppins text-xs font-bold uppercase tracking-widest text-coffee">
              TESTIMONIALS
            </span>
            <h2 className="font-soldier text-3xl sm:text-4xl lg:text-5xl font-bold uppercase text-[#E5E3DC] mt-2 leading-tight">
              WHAT CLIENTS SAY ABOUT <span className="text-coffee">FITSCALEZ</span>
            </h2>
            <p className="font-poppins text-xs sm:text-sm text-[#E5E3DC]/75 max-w-xl mt-2 leading-relaxed">
              Direct feedback from the business founders, partners, and marketing leaders who have accelerated their revenue, web performance, and brand presence with Fitscalez.
            </p>
          </div>

          {/* Interactive Arrow Nav Controls */}
          <div className="flex items-center gap-3">
            <span className="hidden lg:inline font-poppins text-xs font-medium text-[#E5E3DC]/60 mr-2">
              Scroll or click arrows to explore
            </span>
            <button
              onClick={() => slideManual("prev")}
              aria-label="Previous review"
              className="w-10 h-10 rounded-full border border-white/20 bg-white/5 text-[#E5E3DC] flex items-center justify-center transition-all duration-200 hover:bg-coffee hover:border-coffee hover:text-white active:scale-95 cursor-pointer"
            >
              <FiArrowLeft className="text-base" />
            </button>
            <button
              onClick={() => slideManual("next")}
              aria-label="Next review"
              className="w-10 h-10 rounded-full border border-white/20 bg-white/5 text-[#E5E3DC] flex items-center justify-center transition-all duration-200 hover:bg-coffee hover:border-coffee hover:text-white active:scale-95 cursor-pointer"
            >
              <FiArrowRight className="text-base" />
            </button>
          </div>
        </div>
      </div>

      {/* Cards Row */}
      <div ref={cardsRef} className="cards flex px-4 md:px-12 relative z-10">
        {reviewsData.map((review) => (
          <div key={review.id} className="card mr-6 md:mr-8 shrink-0">
            <div className="card__inner">
              <div className="card__content">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-11 h-11 rounded-lg bg-coffee/20 border border-coffee/35 text-coffee flex items-center justify-center text-lg">
                      <FaQuoteLeft />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#E5E3DC]/70 font-poppins font-medium text-xs sm:text-sm">
                        Reviews
                      </span>
                      <div className="flex items-center gap-1 text-[#FBBF24] text-xs">
                        {[...Array(review.rating)].map((_, i) => (
                          <FaStar key={i} />
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="card__description">
                    <strong className="text-white font-semibold">{review.lead} </strong>
                    &ldquo;{review.quote}&rdquo;
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-white/20 shrink-0 bg-stone-900">
                    <img
                      src={review.image}
                      alt={review.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-[#E5E3DC] font-poppins font-semibold text-sm sm:text-base">
                      {review.author}
                    </h3>
                    <p className="text-coffee/85 font-poppins text-xs mt-0.5 font-medium">
                      {review.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyReview;
