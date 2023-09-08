import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";
import { AboutUs } from "./pages/aboutus";
import ProductUpload from "./pages/ProductUpload";
import { SignUp } from "./pages/signup";
import { Navbar } from "./component/navbar";
import Seller from "./pages/NewStore";
import { Footer } from "./component/footer";
import { ContactPage } from "./pages/contactpage";
import { Catalog } from "./pages/catalog";
import { Product } from "./pages/product";
import { User } from "./pages/user";
import { Yourshop } from "./pages/yourshop";
import { Login } from "./pages/login";
import EditProfile from "./pages/EditProfile";
import {WomensCatalog} from "./pages/womensCatalog";
import { MensCatalog } from "./pages/mensCatalog";
import { ShoesCatalog } from "./pages/shoesCatalog";

import CartPage from "./pages/cartpage";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<ContactPage />} path="/contact" />
                        <Route element={<AboutUs />} path="/aboutus" />
                        <Route element={<CartPage />} path="/cart" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<User />} path="/user" />
                        <Route element={<Yourshop />} path="/yourshop" />
                        {/* <Route element={<Favorites/>} path="/favorites"/> */}

                        <Route element={<Catalog/>} path="/catalog"/>
                        <Route element={<WomensCatalog/>} path="/catalog/:category"/>
                        {/* <Route element={<MensCatalog/>} path="/catalog/:category"/>
                        <Route element={<ShoesCatalog/>} path="/catalog/:category"/> */}
                        <Route element={<Product/>} path="/products/:id"/>

                        <Route element={<SignUp />} path="/signup" />
                        <Route element={<EditProfile />} path="/user/edit" />
                        <Route element={<Seller />} path="/newstore" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<ProductUpload />} path="/productupload" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
