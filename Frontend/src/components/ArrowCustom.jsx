import { ArrowForwardIos, ArrowBackIos } from "@mui/icons-material";

function NextArrow(props) {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="absolute right-4 top-1/2 z-10 cursor-pointer w-10 h-10 flex items-center justify-center rounded-full border border-orange-500 hover:bg-orange-100"
    >
      <ArrowForwardIos
        fontSize="small"
        style={{ color: "#c4662e", fontSize: "20px" }}
      />
    </div>
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="absolute left-4 top-1/2 z-10 cursor-pointer w-10 h-10 flex items-center justify-center rounded-full border border-orange-500 hover:bg-orange-100"
    >
      <ArrowBackIos 
        fontSize="small"
        style={{ color: "#c4662e", fontSize: "20px", paddingLeft: "4px" }}
      />
    </div>
  );
}
export { NextArrow, PrevArrow };
