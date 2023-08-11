import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import aboutImage from "../../img/aboutImage.jpg";

export const AboutUs = (props) => {
  const { store, actions } = useContext(Context);
  const params = useParams();

  return (
    <div className="about-us">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="text-center mb-4">
              <strong>Join us to buy, sell, discover and explore the products that can improve the world by shopping Green.</strong>
            </h2>
          </div>
        </div>
        <div className="row">
          {/* Image on the left for large screens */}
          <div className="col-12 col-md-6 order-md-1">
            <img src={aboutImage} alt="About Us" className="img-fluid d-none d-md-block" />
          </div>
          <div className="col-12 col-md-6 order-md-2">
            <h2>
                <strong>Story</strong>
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante
              dapibus diam.
            </p>
            <p>
              Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus
              sed augue semper porta. Mauris massa.
            </p>
          </div>
        </div>
        {/* Image below description for small screens */}
        <div className="row">
          <div className="col-12 text-center d-md-none">
            <img src={aboutImage} alt="About Us" className="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  );
};