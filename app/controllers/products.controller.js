import { Product } from "../models/index.js";
import axios from "axios";

let gearBestCategory = [];

//Jumia APi Service url(https://rapidapi.com/ach-max/api/jumia-service/)
const jumiaServieAPI = async (req, res) => {
  const options = {
    method: "GET",
    url: "https://jumia-service.p.rapidapi.com/api/bestSales",
    headers: {
      "X-RapidAPI-Host": "jumia-service.p.rapidapi.com",
      "X-RapidAPI-Key": "25b441e13cmsh42dd642fb4eaffep18978cjsn03603999a3a8",
    },
  };
  const fetch = await axios.request(options);
  // console.log(fetch.data);
  fetch?.data?.map((d) => {
    // console.log(d.name);
    Product.findOneAndUpdate(
      { name: d.name },
      {
        fetch: "Jumia Service API",
        name: d.name,
        salePrice: d.price,
        url: d.url,
        image: d.image,
      },
      { upsert: true },
      function (err, doc) {
        if (err) return console.log(err);
        console.log("Succesfully saved.");
      }
    );
  });
};

//Magic AliExpress API01 - url(https://rapidapi.com/b2g.corporation/api/magic-aliexpress1/)
const magicAliExpressAPI = async (req, res) => {
  const options = {
    method: "GET",
    url: "https://magic-aliexpress1.p.rapidapi.com/api/bestSales/products",
    params: {
      page: "1",
      priceMax: "20",
      priceMin: "5",
      sort: "EVALUATE_RATE_ASC",
      searchName: "shoes",
    },
    headers: {
      "X-RapidAPI-Host": "magic-aliexpress1.p.rapidapi.com",
      "X-RapidAPI-Key": "2fa388777bmsh301d9e3401da490p1cd34bjsn682576085079",
    },
  };
  const fetch = await axios.request(options);
  // console.log(fetch.data.docs);
  fetch?.data?.docs?.map((d) => {
    // console.log(d.name);
    Product.findOneAndUpdate(
      { name: d.product_title },
      {
        fetch: "Magic AliExpress API01",
        name: d.product_title,
        id: d._id,
        image: d.product_main_image_url,
        originalPrice: `${d.original_price}`,
        salePrice: `${d.sale_price}`,
        url: d.product_detail_url,
        category: d.second_level_category_name,
      },
      { upsert: true },
      function (err, doc) {
        if (err) return console.log(err);
        console.log("Succesfully saved.");
      }
    );
  });
};

//Zappos API - url(https://rapidapi.com/apidojo/api/zappos1/)
const zapposAPI = async (req, res) => {
  const options = {
    method: "POST",
    url: "https://zappos1.p.rapidapi.com/products/list",
    params: { page: "1", limit: "10000", sort: "relevance/desc" },
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Host": "zappos1.p.rapidapi.com",
      "X-RapidAPI-Key": "25b441e13cmsh42dd642fb4eaffep18978cjsn03603999a3a8",
    },
    data: '[{"facetField":"zc1","values":["Clothing"]},{"facetField":"zc2","values":["Swimwear","Underwear & Intimates"]},{"facetField":"txAttrFacet_Gender","values":["Women","Girls"]}]',
  };

  const fetch = await axios.request(options);
  // console.log(fetch.data.results);
  fetch?.data?.results?.map((d) => {
    // console.log(d.name);
    Product.findOneAndUpdate(
      { name: d.productName },
      {
        fetch: "Zappos API",
        name: d.productName,
        id: d.productId,
        image: d.thumbnailImageUrl,
        originalPrice: d.originalPrice,
        salePrice: d.price,
        url: d.productUrl,
      },
      { upsert: true },
      function (err, doc) {
        if (err) return console.log(err);
        console.log("Succesfully saved.");
      }
    );
  });
};

//Klekt API - url(https://rapidapi.com/lebeast777/api/klekt/)
const klektAPI = async (req, res) => {
  console.log("Klekt API");
  const slug = ["streetwear", "drops"];

  for (let i = 0; i < slug.length; i++) {
    const options = {
      method: "GET",
      url: `https://klekt.p.rapidapi.com/${slug[i]}`,
      headers: {
        "X-RapidAPI-Host": "klekt.p.rapidapi.com",
        "X-RapidAPI-Key": "25b441e13cmsh42dd642fb4eaffep18978cjsn03603999a3a8",
      },
    };

    const fetch = await axios.request(options);
    // console.log(fetch.data.items);
    fetch?.data?.items?.map((d) => {
      // console.log(d.name);
      Product.findOneAndUpdate(
        { name: d.productName },
        {
          fetch: "Klekt API",
          name: d.productName,
          id: d.productId,
          image: d.productAsset?.preview,
          priceWithTax: d.priceWithTax,
        },
        { upsert: true },
        function (err, doc) {
          if (err) return console.log(err);
          console.log("Succesfully saved.");
        }
      );
    });
  }
};

//GreatBest API - url(https://rapidapi.com/rene.meuselwitz/api/gearbest/)
const gearbestCategoriesFetchAPI = async (req, res) => {
  const options = {
    method: "GET",
    url: "https://gearbest.p.rapidapi.com/categories",
    headers: {
      "X-RapidAPI-Host": "gearbest.p.rapidapi.com",
      "X-RapidAPI-Key": "25b441e13cmsh42dd642fb4eaffep18978cjsn03603999a3a8",
    },
  };
  const fetch = await axios.request(options);
  gearBestCategory = fetch.data;

  console.log("Category");
  gearbestAPI();
};

const gearbestAPI = async (req, res) => {
  console.log("In Data");
  gearBestCategory.map(async (c) => {
    console.log(c.link);
    const options = {
      method: "GET",
      url: "https://gearbest.p.rapidapi.com/get_products_from_category",
      params: { category_url: `${c.link}`, page: "1" },
      headers: {
        "X-RapidAPI-Host": "gearbest.p.rapidapi.com",
        "X-RapidAPI-Key": "25b441e13cmsh42dd642fb4eaffep18978cjsn03603999a3a8",
      },
    };
    const fetch = await axios.request(options);
    console.log(fetch.data.data);
    fetch?.data?.data?.map((d) => {
      // console.log(d.name);
      Product.findOneAndUpdate(
        { name: d.goodsTitle },
        {
          fetch: "Gearbest API",
          category: c.link,
          name: d.goodsTitle,
          image: d.goodsImage,
          sku: d.goodsWebSku,
          originalPrice: d.displayPrice,
          salePrice: d.shopPrice,
          url: d.originalUrl,
        },
        { upsert: true },
        function (err, doc) {
          if (err) return console.log(err);
          console.log("Succesfully saved.");
        }
      );
    });
  });
};

export const addMaterial = async (req, res) => {
  try {
    jumiaServieAPI();
    // magicAliExpressAPI(); //uncomment when you subscribed to this api
    zapposAPI();
    klektAPI();
    gearbestCategoriesFetchAPI();
  } catch (error) {
    console.log(error);
  }
};

export const getAllData = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json({ status: "success", data: products });
  } catch (error) {
    return res
      .status(500)
      .json({ messgae: "Something Went Wrong", error: error });
  }
};
