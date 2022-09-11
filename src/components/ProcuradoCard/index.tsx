import styles from "./procuradocard.module.scss";
import { ProcuradoOnlyCard } from "./ProcuradoOnlyCard";
import { useNuiCallback } from "fivem-nui-react-lib";
import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

interface ProcuradoProps {
    name: string;
    phone: string;
    registration: string;
    foto: string;
}

const procuradosSkeleton = [
    {name: "-------", phone: "--- ---", registration: "--------", foto: "https://cdn.discordapp.com/attachments/593999593386278912/1015968481927245945/do-utilizador.png"},
]

export const ProcuradoCard = () => {
    const [procuradoCard, setProcuradoCard] = useState<ProcuradoProps[]>([]);
    const [fetchMyMethod] = useNuiCallback("REACTNUI","procuradosCard",setProcuradoCard);
    
    useEffect(() => {
        fetchMyMethod({ quantities: 3 })
    }, [fetchMyMethod]); 

    

    return (
        <div className={styles.dashboard_card_grid}>
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                className={styles.mySwiper}
            >
                {procuradoCard.length <= 0 ? (
                    procuradosSkeleton.map(procurado => (
                        <SwiperSlide key={procurado.registration}><ProcuradoOnlyCard name={procurado.name} phone={procurado.phone} registration={procurado.registration} foto={procurado.foto}/></SwiperSlide>
                    ))
                ) : (procuradoCard.map(procurado => (
                    <SwiperSlide key={procurado.registration}><ProcuradoOnlyCard name={procurado.name} phone={procurado.phone} registration={procurado.registration} foto={procurado.foto}/></SwiperSlide>
                )))}

            </Swiper>
        </div>
    );
}