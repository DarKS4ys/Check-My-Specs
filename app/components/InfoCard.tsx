import React, {useEffect, useRef, useState} from 'react';
import Lottie from "lottie-react";
import {motion, Target, useAnimation} from "framer-motion";

export const InfoCard = ({animation, delay, reverse, animate, initial, children, label}: {
    delay: number,
    initial: Target,
    animate: Target,
    reverse?: boolean,
    animation: any,
    children?: React.ReactNode,
    label: string
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const lottieRef = useRef<any>(null);
    const controls = useAnimation();

    useEffect(() => {
        controls.start(animate).then(() => setIsLoading(false));
    }, []);

    return (
        <div className="relative h-full">
            <motion.div className="h-full w-full" transition={{delay: delay, type: 'spring', damping: 13, stiffness: 200}} initial={initial} whileInView={animate} viewport={{once: true}}>
                <div className="flex flex-col h-full w-full relative gap-2 border hover:bg-stone-700/50 transition duration-300 ease-in-out bg-stone-950/30 backdrop-blur-md min-w-[250px] border-stone-700 p-8 rounded-lg">
                    <h1 className="text-3xl font-medium">{label}</h1>
                    <div className="flex flex-col sm:flex-row gap-8 my-auto justify-center items-center">
                        <Lottie lottieRef={lottieRef} animationData={animation} className="w-44 min-w-44"/>
                        <div className="flex flex-col gap-3 mr-auto">
                            {children}
                        </div>
                    </div>
                </div>
            </motion.div>

            {isLoading &&
                <div className="absolute inset-0 w-full h-full rounded-lg bg-neutral-700/60 animate-pulse -z-10"/>
            }
        </div>
    );
};

export const InfoLabelGroup = ({children}: { children: React.ReactNode }) => {
    return (
        <div className="flex gap-8 items-center">
            {React.Children.map(children, (child, index) => (
                <div key={index}>{child}</div>
            ))}
        </div>
    )
}

export const InfoLabel = ({label, value}: { label: string, value: string | number | undefined | boolean }) => {
    return (
        <div>
            <h2 className="text-xl">{label}</h2>
            <p className="font-light">{value?.toString()}</p>
        </div>
    )
}