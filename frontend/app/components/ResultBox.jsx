import React from "react";

const ResultBox = () => {
  return (
    <div
      className=" my-5 min-w-[1164px] flex flex-col gap-[10px] bg-white rounded-[12px] py-[16px] px-[24px] border border-[#F0F0F0]"
      style={{ boxShadow: " 0px 0px 15px 0px #0000000D" }}
    >
      <span className=" font-[500] text-[14px]">Text Summary</span>
      <div className="w-full rounded-[8px] border py-[12px] px-[8px] gap-[10px] text-[14px] font-[400] break-words border-[#F0F0F0]">
        Wakil Menteri Perindustrian Faisol Riza menyatakan bahwa dalam peta
        jalan emisi nol bersih (net zero emission/NZE) sektor industri,
        Kementerian Perindustrian menargetkan penurunan emisi sebesar 31–43%
        pada tahun 2030 dan mencapai NZE pada 2050. Untuk mempercepat
        transformasi ini, salah satu langkah yang diambil adalah merevisi
        Peraturan Presiden Nomor 98 Tahun 2021 tentang Nilai Ekonomi Karbon
        (NEK).
      </div>
    </div>
  );
};

export default ResultBox;
