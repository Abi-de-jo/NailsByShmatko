 
const TopBar = () => {
  return (
    <div className="w-full h-60 md:h-80 lg:h-96 relative overflow-hidden">
      <div 
        className="w-full h-full bg-cover bg-center absolute inset-0"
        style={{ backgroundImage: 'url("/top.jpg")' }}
      />
      
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="grid grid-cols-3 gap-2 md:gap-4 lg:gap-6 max-w-4xl w-full">
          {/* Image 1 - Moves right to left */}
          <div 
            className="h-24 md:h-32 lg:h-40 bg-cover bg-center rounded-lg shadow-lg border-2 border-white animate-moveRightToLeft hover:animate-bounce cursor-pointer"
            style={{ backgroundImage: 'url("/top1.jpg")' }}
          />
          
          {/* Image 2 - Moves with delay */}
          <div 
            className="h-24 md:h-32 lg:h-40 bg-cover bg-center rounded-lg shadow-lg border-2 border-white animate-moveRightToLeft hover:animate-bounce cursor-pointer"
            style={{ 
              backgroundImage: 'url("/top2.jpg")',
              animationDelay: '1s'
            }}
          />
          
          {/* Image 3 - Moves with different delay */}
          <div 
            className="h-24 md:h-32 lg:h-40 bg-cover bg-center rounded-lg shadow-lg border-2 border-white animate-moveRightToLeft hover:animate-bounce cursor-pointer"
            style={{ 
              backgroundImage: 'url("/top3.jpg")',
              animationDelay: '2s'
            }}
          />
        </div>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/10" />
    </div>
  )
}

export default TopBar;