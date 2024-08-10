import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import { IonImg } from '@ionic/react';

export const SwiprPage= (Props:any) => {
    const backgroundStyle = {
        backgroundImage: `url(${Props.frame})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover', // Ensures the image covers the element
        backgroundPosition: 'center', // Centers the image
        height: '200px', // Example height
        width: '150px' // Example width
      };
  return (
    <Swiper
      spaceBetween={5}
      slidesPerView={2}
    //   onSlideChange={() => console.log('slide change')}
    //   onSwiper={(swiper) => console.log(swiper)}
    >
        {Props.image &&Props.image.map((item:any,key:any)=>{
            return(<SwiperSlide key={key}>
                <div className="case-card">
                    <div className="thumb" style={backgroundStyle}>
                      <IonImg className="case-image" src={Props.url+'/'+item.image_link} alt={item.name} />
                        <h5 className="case-title fs-13">{item.name}</h5>
                    </div>
                </div>
                </SwiperSlide>)
        })}
    </Swiper>
  );
};