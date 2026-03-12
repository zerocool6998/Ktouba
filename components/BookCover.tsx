import React from 'react';

interface BookCoverProps {
  className?: string;
  style?: React.CSSProperties;
  variant?: 'default' | 'thumbnail';
}

const BookCover: React.FC<BookCoverProps> = ({ className = '', style, variant = 'default' }) => {
  const isThumbnail = variant === 'thumbnail';

  return (
    <div className={`w-full h-full perspective-[1000px] ${className}`} style={style}>
      <div 
        className={`w-full h-full bg-[#111111] flex flex-col items-center justify-center ${isThumbnail ? 'p-2' : 'p-8'} text-center relative font-sans text-white overflow-hidden shadow-2xl transition-transform duration-700 ease-out hover:rotate-y-[-15deg] hover:rotate-x-[5deg] origin-left`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Book spine effect */}
        <div className={`absolute left-0 top-0 bottom-0 ${isThumbnail ? 'w-1' : 'w-4'} bg-gradient-to-r from-black/60 to-transparent z-10`}></div>
        
        {/* Book page edges effect */}
        <div className={`absolute right-0 top-0 bottom-0 ${isThumbnail ? 'w-[1px]' : 'w-1'} bg-gradient-to-l from-white/20 to-transparent z-10`}></div>
        
        <div className={`absolute ${isThumbnail ? 'top-[10%] left-2 w-4 h-[2px]' : 'top-[15%] left-8 w-12 h-1'} bg-[#FF4400] transform translate-z-[20px]`}></div>
        <div className={`${isThumbnail ? 'mt-4' : 'mt-16'} text-left w-full transform translate-z-[30px]`}>
          <h1 className={`${isThumbnail ? 'text-xs' : 'text-4xl sm:text-5xl md:text-6xl'} font-bold tracking-tighter leading-[0.9] ${isThumbnail ? 'mb-2' : 'mb-6'} uppercase drop-shadow-lg`}>
            The<br />Power<br />of Less
          </h1>
          {!isThumbnail && (
            <p className="text-[8px] sm:text-[10px] tracking-[0.15em] text-[#A3A3A3] mb-16 max-w-[180px] uppercase font-medium leading-relaxed drop-shadow-md">
              Mastering Minimalist Design for Web and Product Experiences
            </p>
          )}
          <p className={`${isThumbnail ? 'text-[4px]' : 'text-[8px] sm:text-[10px]'} font-bold tracking-[0.2em] mt-auto text-[#FFFFFF] uppercase drop-shadow-md`}>
            Nouar
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookCover;
