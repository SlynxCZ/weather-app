"use client";

import { useState, useRef, useEffect } from "react";

export default function ClientComponent() {
    const [weatherData, setWeatherData] = useState<null | { name: string, main: any, temp: number, humidity: number, wind: any, speed: number, weather: any}>(null);
    const [placeholder, setPlaceholder] = useState<string>("Napiš název města");
    const [activeTable, setActiveTable] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const searchBoxRef = useRef<HTMLInputElement>(null);

    const API_URL = process.env.NEXT_PUBLIC_API_URL
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY

    async function checkWeather() {
        setIsLoading(true);
        try {
            if (searchBoxRef.current?.value === "") {
                setPlaceholder("Neplatný název města");
                setActiveTable(0);
                setTimeout(() => {
                    setPlaceholder("Napiš název města");
                }, 2000);
                setIsLoading(false);
                return;
            }

            console.log(API_KEY);
            // @ts-ignore
            const response = await fetch(API_URL + searchBoxRef.current?.value + `&appid=${API_KEY}`);
            const data = await response.json();
            setWeatherData(data);
            setActiveTable(1);
            setIsLoading(false);
            console.log("Weather data fetched successfully:", data);
        } catch (error) {
            console.error("Error fetching weather data:", error);
            setIsLoading(false);
        }
    }

    const colClass = "flex items-center text-left";
    const colImgClass = "w-[40px] mr-[10px]";
    const detailClass = "text-[28px] mt-[-6px]";

    const tableRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (tableRef.current) {
            if (activeTable === 1) {
                tableRef.current.style.animation = "ease-open 0.5s";
                tableRef.current.style.opacity = "1";
                tableRef.current.style.visibility = "visible";
            } else {
                tableRef.current.style.animation = "ease-close 0.5s";
                tableRef.current.style.opacity = "0";
                tableRef.current.style.visibility = "hidden";
            }
        }
    }, [activeTable]);

    return (
        <div
            className="w-[90%] max-w-[470px] bg-gradient-to-br from-[#00feba] to-[#5b548a] text-white mx-auto my-[100px] rounded-[20px] p-[40px_35px] text-center">
            <div
                className="w-full flex items-center justify-between bg-[#ebfffc] text-[#555] py-[10px] h-[60px] rounded-[30px] mr-[16px] text-[18px] border-0 outline-0 hover:bg-[#e0c3fc] transition-all duration-300">
                <input
                    ref={searchBoxRef}
                    id="searchBox"
                    type="text"
                    placeholder={placeholder}
                    spellCheck="false"
                    className="border-0 outline-0 bg-[#ebfffc] text-[#555] p-[10px_25px] h-[60px] rounded-[30px] flex-1 mr-[16px] text-[18px]"
                />
                <button onClick={() => checkWeather()}>
                    <i className="bx bx-search-alt p-4 border-0 outline-0 bg-[#ebfffc] rounded-[30px]"></i>
                </button>
            </div>
            {isLoading ? (
                <div>Načítání</div>
            ) : (
                activeTable === 1 && (
                    <div ref={tableRef}>
                        <div className="flex items-center justify-center">
                            <img src="/clear.png" className="w-[170px] mt-[30px]"/>
                        </div>
                        <h1 className="text-7xl font-medium">{
                            Math.round(weatherData?.main.temp) + "°C"
                        }</h1>
                        <h2 className="text-5xl font-normal mt-[10px]">{
                            weatherData?.name
                        }</h2>
                        <div className="flex items-center justify-between px-5 mt-[50px]">
                            <div className={colClass}>
                                <img src="/humidity.png" className={colImgClass}/>
                                <div>
                                    <p className={detailClass}>{
                                        weatherData?.main.humidity + "%"
                                    }</p>
                                    <p>Vlhkost</p>
                                </div>
                            </div>
                            <div className={colClass}>
                                <img src="/wind.png" className={colImgClass}/>
                                <div>
                                    <p className={detailClass}>{
                                        weatherData?.wind.speed + " km/h"
                                    }</p>
                                    <p>Rychlost Větru</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            )}
        </div>
    );
}