"use client"

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Home from "@/components/page"

export default function ClientPage() {
  const [weatherData, setWeatherData] = useState<null | {
    name: string;
    main: any;
    temp: number;
    humidity: number;
    wind: any;
    speed: number;
    weather: any;
  }>(null);
  const [placeholder, setPlaceholder] = useState<string>("Napiš název města");
  const [activeTable, setActiveTable] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const searchBoxRef = useRef<HTMLInputElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  async function checkWeather() {
    if (searchBoxRef.current?.value === "") {
      setPlaceholder("Neplatný název města");
      setActiveTable(0);
      setTimeout(() => {
        setPlaceholder("Napiš název města");
      }, 2000);
      setIsLoading(false);
      return;
    }
  
    setIsLoading(true);
  
    try {
      const response = await axios.post('/api/getData', {
        searchBox: searchBoxRef.current?.value
      });
      setWeatherData(response.data);
      setActiveTable(1);
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Home checkWeather={() => checkWeather()} weatherData={weatherData} placeholder={placeholder} activeTable={activeTable} isLoading={isLoading} searchBoxRef={searchBoxRef} tableRef={tableRef}/>
  );
}
