import React, { useEffect } from "react";
import "./ProductSummary.scss";
import {  BsPeopleFill, BsHospitalFill  } from "react-icons/bs";
import { BiCategory, BiPlusMedical } from "react-icons/bi";
import InfoBox from "../../infobox/InfoBox";
import { useDispatch, useSelector,} from "react-redux";
import {
  CALC_CATEGORY,
  CALC_OUTOFSTOCK,
  CALC_STORE_VALUE,
  selectCategory,
  selectOutOfStock,
  selectTotalStoreValue,
} from "../../../redux/features/product/productSlice";

// Icons
const earningIcon = <BsHospitalFill size={40} color="#fff" />;
const productIcon = <BsPeopleFill size={40} color="#fff" />;
const categoryIcon = <BiCategory size={40} color="#fff" />;
const outOfStockIcon = <BiPlusMedical size={40} color="#fff" />;

// Format Amount
export const formatNumbers = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const ProductSummary = ({ products }) => {
  const dispatch = useDispatch();
  const category = useSelector(selectCategory);

  useEffect(() => {

    dispatch(CALC_CATEGORY(products));
  }, [dispatch, products]);

  return (
    <div className="product-summary">
      <h3 className="--mt">Pacientes</h3>
      <div className="info-summary">
        <InfoBox
          icon={productIcon}
          title={"Pacientes"}
          count={products.length}
          bgColor="card1"
        />
        <InfoBox
          icon={earningIcon}
          title={"Enfermeros"}
          count={` `}
          bgColor="card2"
        />
        <InfoBox
          icon={outOfStockIcon}
          title={"Cuidadores"}
          count={` `}
          bgColor="card3"
        />
        <InfoBox
          icon={categoryIcon}
          title={"Todas"}
          count={category.length}
          bgColor="card4"
        />
      </div>
    </div>
  );
};

export default ProductSummary;