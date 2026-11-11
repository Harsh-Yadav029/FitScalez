import * as React from "react";
import { motion, MotionConfig, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";

function splitIntoWordsAndChars(text) {
  const words = text.split(" ");
  return words.map((word, wIdx) => ({
    word,
    chars: word.split(""),
    hasSpaceAfter: wIdx < words.length - 1,
  }));
}

const HoverSliderContext = React.createContext(undefined);

export function useHoverSliderContext() {
  const context = React.useContext(HoverSliderContext);
  if (context === undefined) {
    throw new Error(
      "useHoverSliderContext must be used within a HoverSliderProvider"
    );
  }
  return context;
}

export const HoverSlider = React.forwardRef(
  ({ children, className, activeIndex = 0, onSlideChange, ...props }, ref) => {
    const [activeSlide, setActiveSlide] = React.useState(activeIndex);

    React.useEffect(() => {
      setActiveSlide(activeIndex);
    }, [activeIndex]);

    const changeSlide = React.useCallback(
      (index) => {
        setActiveSlide(index);
        if (onSlideChange) onSlideChange(index);
      },
      [onSlideChange]
    );

    return (
      <HoverSliderContext.Provider value={{ activeSlide, changeSlide }}>
        <div ref={ref} className={className} {...props}>
          {children}
        </div>
      </HoverSliderContext.Provider>
    );
  }
);
HoverSlider.displayName = "HoverSlider";

export const TextStaggerHover = React.forwardRef(
  ({ text, index, children, className, ...props }, ref) => {
    const { activeSlide, changeSlide } = useHoverSliderContext();
    const wordGroups = React.useMemo(() => splitIntoWordsAndChars(text), [text]);
    const isActive = activeSlide === index;
    const handleMouse = () => changeSlide(index);

    let globalCharCount = 0;

    return (
      <span
        className={cn(
          "relative inline-flex flex-wrap items-baseline gap-x-2.5 origin-bottom overflow-hidden select-none",
          className
        )}
        {...props}
        ref={ref}
        onMouseEnter={handleMouse}
        onClick={handleMouse}
      >
        {wordGroups.map((group, wIdx) => (
          <span key={`${group.word}-${wIdx}`} className="inline-block whitespace-nowrap">
            {group.chars.map((char) => {
              const charDelay = globalCharCount * 0.018;
              globalCharCount += 1;

              return (
                <span
                  key={`${char}-${charDelay}`}
                  className="relative inline-block overflow-hidden"
                >
                  <MotionConfig
                    transition={{
                      delay: charDelay,
                      duration: 0.28,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  >
                    <motion.span
                      className="inline-block transition-opacity duration-300"
                      style={{ opacity: isActive ? 1 : 0.25 }}
                      initial={{ y: "0%" }}
                      animate={isActive ? { y: "-110%" } : { y: "0%" }}
                    >
                      {char}
                    </motion.span>

                    <motion.span
                      className="absolute left-0 top-0 inline-block text-coffee font-bold"
                      initial={{ y: "110%" }}
                      animate={isActive ? { y: "0%" } : { y: "110%" }}
                    >
                      {char}
                    </motion.span>
                  </MotionConfig>
                </span>
              );
            })}
          </span>
        ))}
      </span>
    );
  }
);
TextStaggerHover.displayName = "TextStaggerHover";

export const clipPathVariants = {
  visible: {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
  },
  hidden: {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0px)",
  },
};

export const HoverSliderImageWrap = React.forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "grid overflow-hidden [&>*]:col-start-1 [&>*]:col-end-1 [&>*]:row-start-1 [&>*]:row-end-1 [&>*]:size-full",
          className
        )}
        {...props}
      />
    );
  }
);
HoverSliderImageWrap.displayName = "HoverSliderImageWrap";

export const HoverSliderImage = React.forwardRef(
  ({ index, imageUrl, children, className, ...props }, ref) => {
    const { activeSlide } = useHoverSliderContext();
    const isActive = activeSlide === index;

    return (
      <motion.img
        className={cn("inline-block align-middle", className)}
        style={{ zIndex: isActive ? 2 : 1 }}
        transition={{ ease: [0.33, 1, 0.68, 1], duration: 0.7 }}
        variants={clipPathVariants}
        animate={isActive ? "visible" : "hidden"}
        ref={ref}
        src={imageUrl}
        {...props}
      />
    );
  }
);
HoverSliderImage.displayName = "HoverSliderImage";

function SliderListItem({ slide, index }) {
  const { activeSlide, changeSlide } = useHoverSliderContext();
  const isActive = activeSlide === index;
  const handleInteraction = () => changeSlide(index);

  return (
    <div
      onClick={handleInteraction}
      onMouseEnter={handleInteraction}
      className="group flex items-baseline gap-3.5 cursor-pointer py-1 transition-transform duration-200"
    >
      <span
        className={cn(
          "font-soldier text-xl md:text-2xl font-bold transition-all duration-300 select-none",
          isActive ? "text-coffee scale-110" : "text-Primary/25 group-hover:text-Primary/50"
        )}
      >
        0{index + 1}
      </span>
      <TextStaggerHover
        index={index}
        text={slide.title}
        className="cursor-pointer font-soldier text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-Primary leading-tight"
      />
    </div>
  );
}

function SliderCaption({ slides, tag }) {
  const { activeSlide } = useHoverSliderContext();
  const current = slides[activeSlide] || slides[0];

  if (!current) return null;

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={`caption-${activeSlide}-${current.title}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="bg-gradient-to-t from-black/95 via-black/60 to-transparent p-6 md:p-8"
        >
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-poppins text-[10px] md:text-xs font-bold uppercase tracking-widest text-coffee">
              0{activeSlide + 1} / {tag}
            </span>
          </div>

          <h4 className="font-soldier text-2xl md:text-3xl font-bold uppercase text-[#E5E3DC] tracking-wide leading-tight">
            {current.title}
          </h4>

          <p className="font-poppins text-xs md:text-sm text-[#E5E3DC]/85 mt-2 leading-relaxed max-w-lg line-clamp-2">
            {current.description}
          </p>

          {current.features && current.features.length > 0 && (
            <div className="mt-3.5 flex flex-wrap gap-1.5">
              {current.features.slice(0, 3).map((f) => (
                <span
                  key={f}
                  className="inline-block px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-[11px] font-poppins text-[#E5E3DC]"
                >
                  {f}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function CategoryHoverShowcase({ slides = [], tag = "CAPABILITIES", title = "Interactive", highlight = "Showcase" }) {
  if (!slides || slides.length === 0) return null;

  return (
    <HoverSlider className="rounded-[32px] border border-Primary/12 bg-[#DFDCD5] p-8 md:p-12 lg:p-14 shadow-[0_20px_50px_rgba(22,22,22,0.06)] overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-14">
        {/* Left Side: Services List */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <div className="mb-6 flex items-center gap-3">
            <span className="font-poppins text-xs font-bold uppercase tracking-widest text-coffee">
              / HOVER TO PREVIEW {tag}
            </span>
            <span className="inline-block w-8 h-px bg-coffee/40" />
          </div>

          <div className="flex flex-col space-y-3 md:space-y-4">
            {slides.map((slide, index) => (
              <SliderListItem
                key={slide.title}
                slide={slide}
                index={index}
              />
            ))}
          </div>

          <p className="mt-7 font-poppins text-xs sm:text-sm text-second/75 max-w-md leading-relaxed">
            Hover over any service title above to trigger real-time character stagger animation and reveal live visual previews of our work.
          </p>
        </div>

        {/* Right Side: Image Reveal Box */}
        <div className="w-full lg:w-1/2">
          <div className="relative rounded-[24px] overflow-hidden border border-Primary/15 bg-[#161616] shadow-[0_25px_60px_rgba(22,22,22,0.18)] aspect-[4/3] md:aspect-[16/10]">
            <HoverSliderImageWrap className="w-full h-full">
              {slides.map((slide, index) => (
                <div key={slide.title} className="w-full h-full relative overflow-hidden">
                  <HoverSliderImage
                    index={index}
                    imageUrl={slide.imageUrl}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                    loading="eager"
                    decoding="async"
                  />
                </div>
              ))}
            </HoverSliderImageWrap>

            {/* Single Unified Caption Overlay with Smooth Transitions */}
            <SliderCaption slides={slides} tag={tag} />
          </div>
        </div>
      </div>
    </HoverSlider>
  );
}

export default CategoryHoverShowcase;
