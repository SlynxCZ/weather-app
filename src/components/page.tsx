"use client";

import { useState, useRef, useEffect } from "react";

interface props{
  weatherData: any,
  searchBoxRef: any,
  tableRef: any,
  placeholder: string,
  activeTable: number,
  isLoading: boolean
  checkWeather: () => void
}

let colClass: string
let colImgClass: string
let detailClass: string

export const classes = {
  colClass: "flex items-center text-left",
  colImgClass: "w-[40px] mr-[10px]",
  detailClass: "text-[28px] mt-[-6px]"
};

export default function Home({weatherData, searchBoxRef, tableRef, placeholder, activeTable, isLoading, checkWeather}: props){
  return(
    <div className="w-[90%] max-w-[470px] bg-gradient-to-br from-[#00feba] to-[#5b548a] text-white mx-auto my-[100px] rounded-[20px] p-[40px_35px] text-center">
      <div className="w-full flex items-center justify-between bg-[#ebfffc] text-[#555] py-[10px] h-[60px] rounded-[30px] mr-[16px] text-[18px] border-0 outline-0 hover:bg-[#e0c3fc] transition-all duration-300">
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
              <img src="/clear.png" className="w-[170px] mt-[30px]" />
            </div>
            <h1 className="text-7xl font-medium">
              {Math.round(weatherData?.main.temp) + "°C"}
            </h1>
            <h2 className="text-5xl font-normal mt-[10px]">
              {weatherData?.name}
            </h2>
            <div className="flex items-center justify-between px-5 mt-[50px]">
              <div className={classes.colClass}>
                <img src="/humidity.png" className={classes.colImgClass} />
                <div>
                  <p className={classes.detailClass}>
                    {weatherData?.main.humidity + "%"}
                  </p>
                  <p>Vlhkost</p>
                </div>
              </div>
              <div className={classes.colClass}>
                <img src="/wind.png" className={classes.colImgClass} />
                <div>
                  <p className={classes.detailClass}>
                    {weatherData?.wind.speed + " km/h"}
                  </p>
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