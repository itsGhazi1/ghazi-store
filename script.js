"use strict";

/* =========================================================
   GHAZY STORE — ADMIN QUICK SETTINGS
   1) Change brand name: edit BRAND_NAME below and the logo/title in index.html.
   2) Change currency: edit CURRENCY / CURRENCY_AR and formatMoney().
   3) Change colors: edit the variables at the top of style.css.
   4) Change WhatsApp: edit WHATSAPP_NUMBER below.
   5) Connect Google Sheets: paste your deployed Apps Script URL below.
   6) Change shipping: edit SHIPPING_COST and FREE_SHIPPING_THRESHOLD.
   ========================================================= */
const BRAND_NAME = "Ghazy";
const CURRENCY = "EGP";
const CURRENCY_AR = "جنيه مصري";
const SHIPPING_COST = 70;
const FREE_SHIPPING_THRESHOLD = 1000;
const WHATSAPP_NUMBER = "201066397197";
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwdsLIEVPb-0YXwlIKhCYrwaUqSJoci8WHmN9zjb0gnOdXviKMteUlU7Ln3jELMbxQ7/exec";

// GHAZY ADMIN: Edit, disable or rename the 10 discount codes here.
const discountCodes = [
  { code: "ghazi10", percentage: 10, active: true },
  { code: "CODE2", percentage: 10, active: true },
  { code: "CODE3", percentage: 10, active: true },
  { code: "CODE4", percentage: 10, active: true },
  { code: "CODE5", percentage: 10, active: true },
  { code: "CODE6", percentage: 10, active: true },
  { code: "CODE7", percentage: 10, active: true },
  { code: "CODE8", percentage: 10, active: true },
  { code: "CODE9", percentage: 10, active: true },
  { code: "CODE10", percentage: 10, active: true }
];

/* GHAZY ADMIN: Add products by copying one object. Required fields:
   id, name {en,ar}, category, collection, gender, price, description {en,ar},
   images[], sizes[], colors[], featured, onSale, stockStatus. Keep IDs unique.
   Categories and collections are generated automatically from this data. */
const DEFAULT_SIZE_GUIDE_IMAGE="image/size-guide-oversized-tee.jpg";
const FIT_OPTIONS=[
  {value:"Oversized",label:{en:"Oversized Tee",ar:"أوفر سايز"},sizeGuideImage:"image/size-guide-oversized-tee.jpg"},
  {value:"Regular",label:{en:"Regular Tee",ar:"ريجولار تيشيرت"},sizeGuideImage:"image/size-guide-regular-tee.jpg"}
];
const CUSTOM_SIZE_GUIDES={
  Oversized:{image:"image/size-guide-oversized-tee.jpg",label:{en:"Oversized Tee",ar:"أوفر سايز"}},
  Regular:{image:"image/size-guide-regular-tee.jpg",label:{en:"Regular Tee",ar:"ريجولار"}},
  LongSleeve:{image:"image/size-guide-long-sleeve.jpg",label:{en:"Long Sleeve Tee",ar:"أكمام طويلة"}}
};
const DEFAULT_FIT_OPTION="Oversized";
const products = [
  {id:2,name:{en:"Sukuna Jujutsu Kaisen T-shirt",ar:"تيشيرت سوكونا جوجوتسو كايسن"},category:"Anime",collection:"Jujutsu Kaisen",gender:"Unisex",price:650,description:{en:"Premium 240 GSM washed cotton T-shirt with an oversized fit and Sukuna front-and-back artwork.",ar:"تيشيرت قطن مغسول فاخر بوزن 240 GSM وقصة أوفرسايز مع طباعة سوكونا أمامية وخلفية."},images:[],sizes:["M","L","XL","XXL","3XL"],colors:["Gray","Beige","White"],fit:"Oversized",variants:[{color:"Gray",images:["image/sukuna-gray-men.jpg?v=2","image/sukuna-gray-women.jpg?v=2","image/sukuna-gray-product.jpg?v=2"]},{color:"Beige",images:["image/sukuna-beige-men.png?v=1","image/sukuna-beige-women.jpg?v=1","image/sukuna-beige-product.jpg?v=2"]},{color:"White",images:["image/sukuna-white-men.png?v=1","image/sukuna-white-women.jpg?v=1","image/sukuna-white-product.jpg?v=2"]}],featured:true,onSale:false,stockStatus:"In Stock",newness:21,bestSeller:false},
  {id:3,name:{en:"Vinland Saga Oversized T-shirt",ar:"تيشيرت فينلاند ساغا أوفرسايز"},category:"Anime",collection:"Vinland Saga",gender:"Unisex",price:650,description:{en:"Premium 240 GSM washed cotton T-shirt with an oversized unisex fit and Vinland Saga front-and-back artwork.",ar:"تيشيرت قطن مغسول فاخر بوزن 240 GSM، قصة أوفرسايز للجنسين، وطباعة فينلاند ساغا أمامية وخلفية."},images:[],sizes:["M","L","XL","XXL","3XL"],colors:["Black","Beige","Gray","White"],fit:"Oversized",variants:[{color:"Black",images:["image/vinland-black-men.jpg?v=1","image/vinland-black-women.jpg?v=1"]},{color:"Beige",images:["image/vinland-beige-men.jpg?v=1","image/vinland-beige-women.jpg?v=1"]},{color:"Gray",images:["image/vinland-gray-men.jpg?v=1","image/vinland-gray-women.jpg?v=1"]},{color:"White",images:["image/vinland-white-men.jpg?v=1","image/vinland-white-women.jpg?v=1"]}],featured:true,onSale:false,stockStatus:"In Stock",newness:22,bestSeller:true},
  {id:4,name:{en:"Maki Jujutsu Kaisen Oversized T-shirt",ar:"تيشيرت ماكي جوجوتسو كايسن أوفرسايز"},category:"Anime",collection:"Jujutsu Kaisen",gender:"Unisex",price:650,description:{en:"Premium 240 GSM washed cotton T-shirt with an oversized unisex fit and Maki-inspired Jujutsu Kaisen artwork.",ar:"تيشيرت قطن مغسول فاخر بوزن 240 GSM، قصة أوفرسايز للجنسين، وطباعة مستوحاة من ماكي في جوجوتسو كايسن."},images:[],sizes:["M","L","XL","XXL","3XL"],colors:["Beige","Gray","White","Black"],fit:"Oversized",variants:[{color:"Beige",images:["image/maki-beige-women.jpg?v=1","image/maki-beige-men.jpg?v=1"]},{color:"Gray",images:["image/maki-gray-women.jpg?v=1","image/maki-gray-men.jpg?v=1"]},{color:"White",images:["image/maki-white-women.jpg?v=1","image/maki-white-men.jpg?v=1"]},{color:"Black",images:["image/maki-black-women.jpg?v=1","image/maki-black-men.jpg?v=1"]}],featured:true,onSale:false,stockStatus:"In Stock",newness:23,bestSeller:false},
  {id:5,name:{en:"Tokyo Mysterious Anime Streetwear Oversized T-shirt",ar:"تيشيرت طوكيو ميستريوس أنمي ستريت وير أوفرسايز"},category:"Anime",categories:["Anime","Streetwear","Oversized"],collection:"Ghazy Originals",gender:"Women",price:650,description:{en:"Premium 240 GSM washed cotton T-shirt with a women-only oversized streetwear fit and original Tokyo anime artwork.",ar:"تيشيرت قطن مغسول فاخر بوزن 240 GSM، قصة أوفرسايز ستريت وير للبنات فقط، مع طباعة أنمي طوكيو أصلية من غازي."},images:[],sizes:["M","L","XL","XXL","3XL"],colors:["Black","Burgundy","Gray","Pink","White","Beige"],fit:"Oversized",variants:[{color:"Black",images:["image/tokyo-mysterious-black-women.jpg?v=1"]},{color:"Burgundy",images:["image/tokyo-mysterious-burgundy-women.jpg?v=1"]},{color:"Gray",images:["image/tokyo-mysterious-gray-women.jpg?v=1"]},{color:"Pink",images:["image/tokyo-mysterious-pink-women.jpg?v=1"]},{color:"White",images:["image/tokyo-mysterious-white-women.jpg?v=1"]},{color:"Beige",images:["image/tokyo-mysterious-beige-women.jpg?v=1"]}],featured:true,onSale:false,stockStatus:"In Stock",newness:24,bestSeller:false},
  {id:6,name:{en:"Choso Jujutsu Kaisen Oversized T-shirt",ar:"تيشيرت تشوسو جوجوتسو كايسن أوفرسايز"},category:"Anime",categories:["Anime","Oversized"],collection:"Jujutsu Kaisen",gender:"Unisex",price:650,description:{en:"Premium 240 GSM washed cotton T-shirt with an oversized unisex fit and Choso-inspired Jujutsu Kaisen artwork.",ar:"تيشيرت قطن مغسول فاخر بوزن 240 GSM، قصة أوفرسايز للجنسين، وطباعة مستوحاة من تشوسو في جوجوتسو كايسن."},images:[],sizes:["M","L","XL","XXL","3XL"],colors:["Beige","White","Gray","Black"],fit:"Oversized",variants:[{color:"Beige",images:["image/choso-beige-men.jpg?v=1","image/choso-beige-women.jpg?v=1"]},{color:"White",images:["image/choso-white-men.jpg?v=1","image/choso-white-women.jpg?v=1"]},{color:"Gray",images:["image/choso-gray-men.jpg?v=1","image/choso-gray-women.jpg?v=1"]},{color:"Black",images:["image/choso-black-men.jpg?v=1","image/choso-black-women.jpg?v=1"]}],featured:true,onSale:false,stockStatus:"In Stock",newness:25,bestSeller:false},
  {id:7,name:{en:"Eren Attack On Titan Oversized T-shirt",ar:"تيشيرت إيرين اتاك أون تايتن أوفرسايز"},category:"Anime",categories:["Anime","Oversized"],collection:"Attack On Titan",gender:"Unisex",price:650,description:{en:"Premium 240 GSM washed cotton T-shirt with an oversized unisex fit and Eren-inspired Attack On Titan artwork.",ar:"تيشيرت قطن مغسول فاخر بوزن 240 GSM، قصة أوفرسايز للجنسين، وطباعة مستوحاة من إيرين في اتاك أون تايتن."},images:[],sizes:["M","L","XL","XXL","3XL"],colors:["Beige","Gray","White","Black","Green"],fit:"Oversized",variants:[{color:"Beige",images:["image/eren-beige-men.jpg?v=1","image/eren-beige-women.jpg?v=1"]},{color:"Gray",images:["image/eren-gray-men.jpg?v=1","image/eren-gray-women.jpg?v=1"]},{color:"White",images:["image/eren-white-men.jpg?v=1","image/eren-white-women.jpg?v=1"]},{color:"Black",images:["image/eren-black-men.jpg?v=1","image/eren-black-women.jpg?v=1"]},{color:"Green",images:["image/eren-green-men.jpg?v=1","image/eren-green-women.jpg?v=1"]}],featured:true,onSale:false,stockStatus:"In Stock",newness:26,bestSeller:false},
  {id:8,name:{en:"Toji Fushiguro Jujutsu Kaisen Oversized T-shirt",ar:"تيشيرت توجي فوشيغورو جوجوتسو كايسن أوفرسايز"},category:"Anime",categories:["Anime","Oversized"],collection:"Jujutsu Kaisen",gender:"Unisex",price:650,description:{en:"Premium 240 GSM washed cotton T-shirt with an oversized unisex fit and Toji Fushiguro Jujutsu Kaisen artwork.",ar:"تيشيرت قطن مغسول فاخر بوزن 240 GSM، قصة أوفرسايز للجنسين، وطباعة توجي فوشيغورو من جوجوتسو كايسن."},images:[],sizes:["M","L","XL","XXL","3XL"],colors:["Black","White"],fit:"Oversized",variants:[{color:"Black",images:["image/toji-black-men.jpg?v=1","image/toji-black-women.jpg?v=1"]},{color:"White",images:["image/toji-white-men.jpg?v=1","image/toji-white-women.jpg?v=1"]}],featured:true,onSale:false,stockStatus:"In Stock",newness:27,bestSeller:false},
  {id:9,name:{en:"Luffy One Piece Oversized T-shirt",ar:"تيشيرت لوفي ون بيس أوفرسايز"},category:"Anime",categories:["Anime","Oversized"],collection:"One Piece",gender:"Unisex",price:650,description:{en:"Premium 240 GSM washed cotton T-shirt with an oversized unisex fit and Luffy One Piece artwork.",ar:"تيشيرت قطن مغسول فاخر بوزن 240 GSM، قصة أوفرسايز للجنسين، وطباعة لوفي من ون بيس."},images:[],sizes:["M","L","XL","XXL","3XL"],colors:["Black","White","Gray","Beige"],fit:"Oversized",variants:[{color:"Black",images:["image/luffy-black-men.jpg?v=1","image/luffy-black-women.jpg?v=1"]},{color:"White",images:["image/luffy-white-men.jpg?v=1","image/luffy-white-women.jpg?v=1"]},{color:"Gray",images:["image/luffy-gray-men.jpg?v=1","image/luffy-gray-women.jpg?v=1"]},{color:"Beige",images:["image/luffy-beige-men.jpg?v=1","image/luffy-beige-women.jpg?v=1"]}],featured:true,onSale:false,stockStatus:"In Stock",newness:28,bestSeller:false},
  {id:10,name:{en:"Itachi Naruto Oversized T-shirt",ar:"تيشيرت إيتاتشي ناروتو أوفرسايز"},category:"Anime",categories:["Anime","Oversized"],collection:"Naruto",gender:"Unisex",price:650,description:{en:"Premium 240 GSM washed cotton T-shirt with an oversized unisex fit and Itachi Naruto artwork.",ar:"تيشيرت قطن مغسول فاخر بوزن 240 GSM، قصة أوفرسايز للجنسين، وطباعة إيتاتشي من ناروتو."},images:[],sizes:["M","L","XL","XXL","3XL"],colors:["Black"],fit:"Oversized",variants:[{color:"Black",images:["image/itachi-black-men.jpg?v=1","image/itachi-black-women.jpg?v=1"]}],featured:true,onSale:false,stockStatus:"In Stock",newness:29,bestSeller:false},
  {id:11,name:{en:"Zenitsu Demon Slayer Oversized T-shirt",ar:"تيشيرت زينتسو قاتل الشياطين أوفرسايز"},category:"Anime",categories:["Anime","Oversized"],collection:"Demon Slayer",gender:"Unisex",price:650,description:{en:"Premium 240 GSM washed cotton T-shirt with an oversized unisex fit and Zenitsu Demon Slayer artwork.",ar:"تيشيرت قطن مغسول فاخر بوزن 240 GSM، قصة أوفرسايز للجنسين، وطباعة زينتسو من قاتل الشياطين."},images:[],sizes:["M","L","XL","XXL","3XL"],colors:["Beige","White"],fit:"Oversized",variants:[{color:"Beige",images:["image/zenitsu-beige-men.jpg?v=1","image/zenitsu-beige-women.jpg?v=1"]},{color:"White",images:["image/zenitsu-white-men.jpg?v=1","image/zenitsu-white-women.jpg?v=1"]}],featured:true,onSale:false,stockStatus:"In Stock",newness:30,bestSeller:false},
  {id:12,name:{en:"Sharingan Naruto Oversized T-shirt",ar:"تيشيرت الشارينغان ناروتو أوفرسايز"},category:"Anime",categories:["Anime","Oversized"],collection:"Naruto",gender:"Unisex",price:650,description:{en:"Premium 240 GSM washed cotton T-shirt with an oversized unisex fit and Sharingan Naruto artwork.",ar:"تيشيرت قطن مغسول فاخر بوزن 240 GSM، قصة أوفرسايز للجنسين، وطباعة الشارينغان من ناروتو."},images:[],sizes:["M","L","XL","XXL","3XL"],colors:["Gray","White","Beige","Black"],fit:"Oversized",variants:[{color:"Gray",images:["image/sharingan-gray-men.jpg?v=1","image/sharingan-gray-women.jpg?v=1"]},{color:"White",images:["image/sharingan-white-men.jpg?v=1","image/sharingan-white-women.jpg?v=1"]},{color:"Beige",images:["image/sharingan-beige-men.jpg?v=1","image/sharingan-beige-women.jpg?v=1"]},{color:"Black",images:["image/sharingan-black-men.jpg?v=1","image/sharingan-black-women.jpg?v=1"]}],featured:true,onSale:false,stockStatus:"In Stock",newness:31,bestSeller:false},
  {id:13,name:{en:"Mikasa Attack On Titan Oversized T-shirt",ar:"تيشيرت ميكاسا هجوم العمالقة أوفرسايز"},category:"Anime",categories:["Anime","Oversized"],collection:"Attack On Titan",gender:"Unisex",price:650,description:{en:"Premium 240 GSM washed cotton T-shirt with an oversized unisex fit and Mikasa Attack On Titan artwork.",ar:"تيشيرت قطن مغسول فاخر بوزن 240 GSM، قصة أوفرسايز للجنسين، وطباعة ميكاسا من هجوم العمالقة."},images:[],sizes:["M","L","XL","XXL","3XL"],colors:["White","Gray","Beige"],fit:"Oversized",variants:[{color:"White",images:["image/mikasa-white-women.jpg?v=1","image/mikasa-white-men.jpg?v=1"]},{color:"Gray",images:["image/mikasa-gray-women.jpg?v=1","image/mikasa-gray-men.jpg?v=1"]},{color:"Beige",images:["image/mikasa-beige-women.jpg?v=1","image/mikasa-beige-men.jpg?v=1"]}],featured:true,onSale:false,stockStatus:"In Stock",newness:32,bestSeller:false},
  {id:14,name:{en:"Nezuko Demon Slayer Oversized T-shirt",ar:"تيشيرت نيزوكو قاتل الشياطين أوفرسايز"},category:"Anime",categories:["Anime","Oversized"],collection:"Demon Slayer",gender:"Women",price:650,description:{en:"Premium 240 GSM washed cotton T-shirt with a women-only oversized fit and Nezuko Demon Slayer artwork.",ar:"تيشيرت قطن مغسول فاخر بوزن 240 GSM، قصة أوفرسايز للبنات فقط، وطباعة نيزوكو من قاتل الشياطين."},images:[],sizes:["M","L","XL","XXL","3XL"],colors:["Pink","Beige","Gray","Burgundy","White"],fit:"Oversized",variants:[{color:"Pink",images:["image/nezuko-pink-women.jpg?v=1"]},{color:"Beige",images:["image/nezuko-beige-women.jpg?v=1"]},{color:"Gray",images:["image/nezuko-gray-women.jpg?v=1"]},{color:"Burgundy",images:["image/nezuko-burgundy-women.jpg?v=1"]},{color:"White",images:["image/nezuko-white-women.jpg?v=1"]}],featured:true,onSale:false,stockStatus:"In Stock",newness:33,bestSeller:false},
  {id:15,name:{en:"Son Goku Dragon Ball Oversized T-shirt",ar:"تيشيرت سون جوكو دراجون بول أوفرسايز"},category:"Anime",categories:["Anime","Oversized"],collection:"Dragon Ball",gender:"Men",price:650,description:{en:"Premium 240 GSM washed cotton T-shirt with a men-only oversized fit and Son Goku Dragon Ball artwork.",ar:"تيشيرت قطن مغسول فاخر بوزن 240 GSM، قصة أوفرسايز للرجال فقط، وطباعة سون جوكو من دراجون بول."},images:[],sizes:["M","L","XL","XXL","3XL"],colors:["Black","Beige","Gray","White"],fit:"Oversized",variants:[{color:"Black",images:["image/goku-black-men.jpg?v=1"]},{color:"Beige",images:["image/goku-beige-men.jpg?v=1"]},{color:"Gray",images:["image/goku-gray-men.jpg?v=1"]},{color:"White",images:["image/goku-white-men.jpg?v=1"]}],featured:true,onSale:false,stockStatus:"In Stock",newness:34,bestSeller:false},
  {id:16,name:{en:"Midoriya My Hero Academia Oversized T-shirt",ar:"تيشيرت ميدوريا ماي هيرو أكاديمي أوفرسايز"},category:"Anime",categories:["Anime","Oversized"],collection:"My Hero Academia",gender:"Unisex",price:650,description:{en:"Premium 240 GSM washed cotton T-shirt with an oversized unisex fit and Midoriya My Hero Academia artwork.",ar:"تيشيرت قطن مغسول فاخر بوزن 240 GSM، قصة أوفرسايز للجنسين، وطباعة ميدوريا من ماي هيرو أكاديمي."},images:[],sizes:["M","L","XL","XXL","3XL"],colors:["Black"],fit:"Oversized",variants:[{color:"Black",images:["image/midoriya-black-men.jpg?v=1","image/midoriya-black-women.jpg?v=1"]}],featured:true,onSale:false,stockStatus:"In Stock",newness:35,bestSeller:false},
  {id:17,name:{en:"Bakugo My Hero Academia Oversized T-shirt",ar:"تيشيرت باكوجو ماي هيرو أكاديمي أوفرسايز"},category:"Anime",categories:["Anime","Oversized"],collection:"My Hero Academia",gender:"Unisex",price:650,description:{en:"Premium 240 GSM washed cotton T-shirt with an oversized unisex fit and Bakugo My Hero Academia artwork.",ar:"تيشيرت قطن مغسول فاخر بوزن 240 GSM، قصة أوفرسايز للجنسين، وطباعة باكوجو من ماي هيرو أكاديمي."},images:[],sizes:["M","L","XL","XXL","3XL"],colors:["Black"],fit:"Oversized",variants:[{color:"Black",images:["image/bakugo-black-men.jpg?v=1","image/bakugo-black-women.jpg?v=1"]}],featured:true,onSale:false,stockStatus:"In Stock",newness:36,bestSeller:false},
  {id:18,name:{en:"Todoroki My Hero Academia Oversized T-shirt",ar:"تيشيرت تودوروكي ماي هيرو أكاديمي أوفرسايز"},category:"Anime",categories:["Anime","Oversized"],collection:"My Hero Academia",gender:"Unisex",price:650,description:{en:"Premium 240 GSM washed cotton T-shirt with an oversized unisex fit and Todoroki My Hero Academia artwork.",ar:"تيشيرت قطن مغسول فاخر بوزن 240 GSM، قصة أوفرسايز للجنسين، وطباعة تودوروكي من ماي هيرو أكاديمي."},images:[],sizes:["M","L","XL","XXL","3XL"],colors:["Black"],fit:"Oversized",variants:[{color:"Black",images:["image/todoroki-black-men.jpg?v=1","image/todoroki-black-women.jpg?v=1"]}],featured:true,onSale:false,stockStatus:"In Stock",newness:37,bestSeller:false},
  {id:19,name:{en:"Uraraka My Hero Academia Oversized T-shirt",ar:"تيشيرت أوراراكا ماي هيرو أكاديمي أوفرسايز"},category:"Anime",categories:["Anime","Oversized"],collection:"My Hero Academia",gender:"Unisex",price:650,description:{en:"Premium 240 GSM washed cotton T-shirt with an oversized unisex fit and Uraraka My Hero Academia artwork.",ar:"تيشيرت قطن مغسول فاخر بوزن 240 GSM، قصة أوفرسايز للجنسين، وطباعة أوراراكا من ماي هيرو أكاديمي."},images:[],sizes:["M","L","XL","XXL","3XL"],colors:["Black"],fit:"Oversized",variants:[{color:"Black",images:["image/uraraka-black-women.jpg?v=1","image/uraraka-black-men.jpg?v=1"]}],featured:true,onSale:false,stockStatus:"In Stock",newness:38,bestSeller:false},
  {id:20,name:{en:"Toga My Hero Academia Oversized T-shirt",ar:"تيشيرت توجا ماي هيرو أكاديمي أوفرسايز"},category:"Anime",categories:["Anime","Oversized"],collection:"My Hero Academia",gender:"Unisex",price:650,description:{en:"Premium 240 GSM washed cotton T-shirt with an oversized unisex fit and Toga My Hero Academia artwork.",ar:"تيشيرت قطن مغسول فاخر بوزن 240 GSM، قصة أوفرسايز للجنسين، وطباعة توجا من ماي هيرو أكاديمي."},images:[],sizes:["M","L","XL","XXL","3XL"],colors:["Black"],fit:"Oversized",variants:[{color:"Black",images:["image/toga-black-women.jpg?v=1","image/toga-black-men.jpg?v=1"]}],featured:true,onSale:false,stockStatus:"In Stock",newness:39,bestSeller:false},
  {id:21,name:{en:"Dabi My Hero Academia Oversized T-shirt",ar:"تيشيرت دابي ماي هيرو أكاديمي أوفرسايز"},category:"Anime",categories:["Anime","Oversized"],collection:"My Hero Academia",gender:"Unisex",price:650,description:{en:"Premium 240 GSM washed cotton T-shirt with an oversized unisex fit and Dabi My Hero Academia artwork.",ar:"تيشيرت قطن مغسول فاخر بوزن 240 GSM، قصة أوفرسايز للجنسين، وطباعة دابي من ماي هيرو أكاديمي."},images:[],sizes:["M","L","XL","XXL","3XL"],colors:["Black"],fit:"Oversized",variants:[{color:"Black",images:["image/dabi-black-men.jpg?v=1","image/dabi-black-women.jpg?v=1"]}],featured:true,onSale:false,stockStatus:"In Stock",newness:40,bestSeller:false},
  {id:22,name:{en:"Shigaraki My Hero Academia Oversized T-shirt",ar:"تيشيرت شيجاراكي ماي هيرو أكاديمي أوفرسايز"},category:"Anime",categories:["Anime","Oversized"],collection:"My Hero Academia",gender:"Unisex",price:650,description:{en:"Premium 240 GSM washed cotton T-shirt with an oversized unisex fit and Shigaraki My Hero Academia artwork.",ar:"تيشيرت قطن مغسول فاخر بوزن 240 GSM، قصة أوفرسايز للجنسين، وطباعة شيجاراكي من ماي هيرو أكاديمي."},images:[],sizes:["M","L","XL","XXL","3XL"],colors:["Black"],fit:"Oversized",variants:[{color:"Black",images:["image/shigaraki-black-men.jpg?v=1","image/shigaraki-black-women.jpg?v=1"]}],featured:true,onSale:false,stockStatus:"In Stock",newness:41,bestSeller:false},
  {id:23,name:{en:"All For One My Hero Academia Oversized T-shirt",ar:"تيشيرت أول فور ون ماي هيرو أكاديمي أوفرسايز"},category:"Anime",categories:["Anime","Oversized"],collection:"My Hero Academia",gender:"Unisex",price:650,description:{en:"Premium 240 GSM washed cotton T-shirt with an oversized unisex fit and All For One My Hero Academia artwork.",ar:"تيشيرت قطن مغسول فاخر بوزن 240 GSM، قصة أوفرسايز للجنسين، وطباعة أول فور ون من ماي هيرو أكاديمي."},images:[],sizes:["M","L","XL","XXL","3XL"],colors:["Black"],fit:"Oversized",variants:[{color:"Black",images:["image/all-for-one-black-men.jpg?v=1","image/all-for-one-black-women.jpg?v=1"]}],featured:true,onSale:false,stockStatus:"In Stock",newness:42,bestSeller:false},
  {id:24,name:{en:"All Might My Hero Academia Oversized T-shirt",ar:"تيشيرت أول مايت ماي هيرو أكاديمي أوفرسايز"},category:"Anime",categories:["Anime","Oversized"],collection:"My Hero Academia",gender:"Unisex",price:650,description:{en:"Premium 240 GSM washed cotton T-shirt with an oversized unisex fit and All Might My Hero Academia artwork.",ar:"تيشيرت قطن مغسول فاخر بوزن 240 GSM، قصة أوفرسايز للجنسين، وطباعة أول مايت من ماي هيرو أكاديمي."},images:[],sizes:["M","L","XL","XXL","3XL"],colors:["Black"],fit:"Oversized",variants:[{color:"Black",images:["image/all-might-black-men.jpg?v=1","image/all-might-black-women.jpg?v=1"]}],featured:true,onSale:false,stockStatus:"In Stock",newness:43,bestSeller:false},
  {id:25,name:{en:"Zenitsu Demon Slayer Men Oversized T-shirt",ar:"تيشيرت زينتسو قاتل الشياطين أوفرسايز رجالي"},category:"Anime",categories:["Anime","Oversized"],collection:"Demon Slayer",gender:"Men",price:650,description:{en:"Premium 240 GSM washed cotton T-shirt with an oversized men fit and Zenitsu Demon Slayer artwork.",ar:"تيشيرت قطن مغسول فاخر بوزن 240 GSM، قصة أوفرسايز للرجال، وطباعة زينتسو من قاتل الشياطين."},images:[],sizes:["M","L","XL","XXL","3XL"],colors:["Beige","White","Gray"],fit:"Oversized",variants:[{color:"Beige",images:["image/zenitsu-men-beige.jpg?v=1"]},{color:"White",images:["image/zenitsu-men-white.jpg?v=1"]},{color:"Gray",images:["image/zenitsu-men-gray.jpg?v=1"]}],featured:true,onSale:false,stockStatus:"In Stock",newness:44,bestSeller:false},
  {id:26,name:{en:"Death Note Anime Oversized T-shirt",ar:"تيشيرت ديث نوت أنمي أوفرسايز"},category:"Anime",categories:["Anime","Oversized"],collection:"Death Note",gender:"Unisex",price:650,description:{en:"Premium 240 GSM washed cotton T-shirt with an oversized unisex fit and Death Note anime artwork.",ar:"تيشيرت قطن مغسول فاخر بوزن 240 GSM، قصة أوفرسايز للجنسين، وطباعة ديث نوت أنمي."},images:[],sizes:["M","L","XL","XXL","3XL"],colors:["Black"],fit:"Oversized",variants:[{color:"Black",images:["image/death-note-black-men.jpg?v=1","image/death-note-black-women.jpg?v=1"]}],featured:true,onSale:false,stockStatus:"In Stock",newness:45,bestSeller:false},
  {id:27,name:{en:"Sung Jinwoo Solo Leveling Oversized T-shirt",ar:"تيشيرت سونغ جين وو سولو ليفيلينج أوفرسايز"},category:"Anime",categories:["Anime","Oversized"],collection:"Solo Leveling",gender:"Unisex",price:650,description:{en:"Premium 240 GSM washed cotton T-shirt with an oversized unisex fit and Sung Jinwoo Solo Leveling artwork.",ar:"تيشيرت قطن مغسول فاخر بوزن 240 GSM، قصة أوفرسايز للجنسين، وطباعة سونغ جين وو من سولو ليفيلينج."},images:[],sizes:["M","L","XL","XXL","3XL"],colors:["Black"],fit:"Oversized",variants:[{color:"Black",images:["image/sung-jinwoo-black-men.jpg?v=1","image/sung-jinwoo-black-women.jpg?v=1"]}],featured:true,onSale:false,stockStatus:"In Stock",newness:46,bestSeller:false},
  {id:28,name:{en:"Roronoa Zoro One Piece Oversized T-shirt",ar:"تيشيرت زورو ون بيس أوفرسايز"},category:"Anime",categories:["Anime","Oversized"],collection:"One Piece",gender:"Unisex",price:650,description:{en:"Premium 240 GSM washed cotton T-shirt with an oversized unisex fit and Roronoa Zoro One Piece artwork.",ar:"تيشيرت قطن مغسول فاخر بوزن 240 GSM، قصة أوفرسايز للجنسين، وطباعة زورو من ون بيس."},images:[],sizes:["M","L","XL","XXL","3XL"],colors:["Black"],fit:"Oversized",variants:[{color:"Black",images:["image/zoro-black-men.jpg?v=1","image/zoro-black-women.jpg?v=1"]}],featured:true,onSale:false,stockStatus:"In Stock",newness:47,bestSeller:false},
  {id:29,name:{en:"Ichigo Kurosaki Bleach Oversized T-shirt",ar:"تيشيرت كوروساكي بليتش أوفرسايز"},category:"Anime",categories:["Anime","Oversized"],collection:"Bleach",gender:"Unisex",price:650,description:{en:"Premium 240 GSM washed cotton T-shirt with an oversized unisex fit and Ichigo Kurosaki Bleach artwork.",ar:"تيشيرت قطن مغسول فاخر بوزن 240 GSM، قصة أوفرسايز للجنسين، وطباعة كوروساكي من بليتش."},images:[],sizes:["M","L","XL","XXL","3XL"],colors:["Black"],fit:"Oversized",variants:[{color:"Black",images:["image/kurosaki-black-men.jpg?v=1","image/kurosaki-black-women.jpg?v=1"]}],featured:true,onSale:false,stockStatus:"In Stock",newness:48,bestSeller:false},
  {id:30,name:{en:"Shinobi Naruto Oversized T-shirt",ar:"تيشيرت الشينوبي ناروتو أوفرسايز"},category:"Anime",categories:["Anime","Oversized"],collection:"Naruto",gender:"Unisex",price:650,description:{en:"Premium 240 GSM washed cotton T-shirt with an oversized unisex fit and Shinobi Naruto anime artwork.",ar:"تيشيرت قطن مغسول فاخر بوزن 240 GSM، قصة أوفرسايز للجنسين، وطباعة الشينوبي من ناروتو."},images:[],sizes:["M","L","XL","XXL","3XL"],colors:["Black"],fit:"Oversized",variants:[{color:"Black",images:["image/shinobi-black-men.jpg?v=1","image/shinobi-black-women.jpg?v=1"]}],featured:true,onSale:false,stockStatus:"In Stock",newness:49,bestSeller:false},
  {id:31,name:{en:"Ryomen Sukuna Jujutsu Kaisen Oversized T-shirt",ar:"تيشيرت سوكونا جوجتسو كايسن أوفرسايز"},category:"Anime",categories:["Anime","Oversized"],collection:"Jujutsu Kaisen",gender:"Unisex",price:650,description:{en:"Premium 240 GSM washed cotton T-shirt with an oversized unisex fit and Ryomen Sukuna Jujutsu Kaisen artwork.",ar:"تيشيرت قطن مغسول فاخر بوزن 240 GSM، قصة أوفرسايز للجنسين، وطباعة سوكونا من جوجتسو كايسن."},images:[],sizes:["M","L","XL","XXL","3XL"],colors:["Black"],fit:"Oversized",variants:[{color:"Black",images:["image/sukuna-throne-black-men.jpg?v=1","image/sukuna-throne-black-women.jpg?v=1"]}],featured:true,onSale:false,stockStatus:"In Stock",newness:50,bestSeller:false},
  {id:32,name:{en:"Gon Hunter x Hunter Oversized T-shirt",ar:"تيشيرت جون هانتر اكس هانتر أوفرسايز"},category:"Anime",categories:["Anime","Oversized"],collection:"Hunter x Hunter",gender:"Unisex",price:650,description:{en:"Premium 240 GSM washed cotton oversized T-shirt with Gon Hunter x Hunter anime artwork. Unisex streetwear fit.",ar:"تيشيرت قطن مغسول فاخر بوزن 240 GSM، قصة أوفرسايز للجنسين، وطباعة جون من هانتر اكس هانتر."},images:[],sizes:["M","L","XL","XXL","3XL"],colors:["Gray","Beige"],fit:"Oversized",variants:[{color:"Gray",images:["image/gon-gray-men.jpg?v=1","image/gon-gray-women.jpg?v=1"]},{color:"Beige",images:["image/gon-beige-men.jpg?v=1","image/gon-beige-women.jpg?v=1"]}],featured:true,onSale:false,stockStatus:"In Stock",newness:52,bestSeller:false},
  {id:33,name:{en:"Kokushibo Demon Slayer Oversized T-shirt",ar:"تيشيرت كوكشيبو قاتل الشياطين أوفرسايز"},category:"Anime",categories:["Anime","Oversized"],collection:"Demon Slayer",gender:"Unisex",price:600,description:{en:"Premium 240 GSM washed cotton oversized T-shirt with Kokushibo Demon Slayer artwork. Unisex streetwear fit.",ar:"تيشيرت قطن مغسول فاخر بوزن 240 GSM، قصة أوفرسايز للجنسين، وطباعة كوكشيبو من أنمي قاتل الشياطين."},images:[],sizes:["M","L","XL","XXL","3XL"],colors:["Gray","Beige"],fit:"Oversized",variants:[{color:"Gray",images:["image/kokushibo-gray-men.jpg?v=2","image/kokushibo-gray-women.jpg?v=2"]},{color:"Beige",images:["image/kokushibo-beige-men.jpg?v=2","image/kokushibo-beige-women.jpg?v=2"]}],featured:true,onSale:false,stockStatus:"In Stock",newness:56,bestSeller:false},
  {id:34,name:{en:"Ninja Basic Naruto Anime T-shirt",ar:"تيشيرت النينجا بيسيك أنمي ناروتو"},category:"Anime",categories:["Anime","Oversized","Basic"],collection:"Naruto",gender:"Unisex",price:550,description:{en:"Basic Naruto anime oversized T-shirt with a minimal ninja-inspired front logo. Black is the main colorway.",ar:"تيشيرت ناروتو أنمي بيسيك أوفرسايز مع شعار نينجا بسيط في الأمام. اللون الأسود هو الصورة الأساسية."},images:[],sizes:["M","L","XL","XXL","3XL"],colors:["Black","Gray","White","Beige"],fit:"Oversized",variants:[{color:"Black",images:["image/ninja-basic-black-men.jpg?v=1","image/ninja-basic-black-women.jpg?v=1"]},{color:"Gray",images:["image/ninja-basic-gray-men.jpg?v=1","image/ninja-basic-gray-women.jpg?v=1"]},{color:"White",images:["image/ninja-basic-white-men.jpg?v=1","image/ninja-basic-white-women.jpg?v=1"]},{color:"Beige",images:["image/ninja-basic-beige-men.jpg?v=1","image/ninja-basic-beige-women.jpg?v=1"]}],featured:true,onSale:false,stockStatus:"In Stock",newness:54,bestSeller:false},
  {id:35,name:{en:"Pirates Basic One Piece Anime T-shirt",ar:"تيشيرت القراصنة بيسيك أنمي ون بيس"},category:"Anime",categories:["Anime","Oversized","Basic"],collection:"One Piece",gender:"Unisex",price:550,description:{en:"Basic One Piece anime oversized T-shirt with a minimal pirate skull logo. Beige is the main colorway.",ar:"تيشيرت ون بيس أنمي بيسيك أوفرسايز للجنسين مع شعار قراصنة بسيط. اللون البيج هو الصورة الأساسية."},images:[],sizes:["M","L","XL","XXL","3XL"],colors:["Beige","Gray","White","Black"],fit:"Oversized",variants:[{color:"Beige",images:["image/pirate-basic-beige-men.jpg?v=1","image/pirate-basic-beige-women.jpg?v=1"]},{color:"Gray",images:["image/pirate-basic-gray-men.jpg?v=1","image/pirate-basic-gray-women.jpg?v=1"]},{color:"White",images:["image/pirate-basic-white-men.jpg?v=1","image/pirate-basic-white-women.jpg?v=1"]},{color:"Black",images:["image/pirate-basic-black-men.jpg?v=1","image/pirate-basic-black-women.jpg?v=1"]}],featured:true,onSale:false,stockStatus:"In Stock",newness:55,bestSeller:false},
  {id:36,name:{en:"Gin Detective Conan Oversized T-shirt",ar:"تيشيرت جين أنمي المحقق كونان أوفرسايز"},category:"Anime",categories:["Anime","Oversized"],collection:"Detective Conan",gender:"Unisex",price:600,description:{en:"Premium 240 GSM washed cotton oversized T-shirt with Gin Detective Conan artwork. Unisex streetwear fit.",ar:"تيشيرت قطن مغسول فاخر بوزن 240 GSM، قصة أوفرسايز للجنسين، وطباعة جين من أنمي المحقق كونان."},images:[],sizes:["M","L","XL","XXL","3XL"],colors:["Black"],fit:"Oversized",variants:[{color:"Black",images:["image/gin-conan-black-men.jpg?v=1","image/gin-conan-black-women.jpg?v=1"]}],featured:true,onSale:false,stockStatus:"In Stock",newness:57,bestSeller:false},
  {id:37,name:{en:"Upper Moon Six Daki Demon Slayer Oversized T-shirt",ar:"تيشيرت القمر العلوي السادس أنمي قاتل الشياطين أوفرسايز"},category:"Anime",categories:["Anime","Oversized"],collection:"Demon Slayer",gender:"Unisex",price:600,description:{en:"Premium 240 GSM washed cotton oversized T-shirt with Upper Moon Six Daki Demon Slayer artwork. Unisex streetwear fit.",ar:"تيشيرت قطن مغسول فاخر بوزن 240 GSM، قصة أوفرسايز للجنسين، وطباعة داكي القمر العلوي السادس من أنمي قاتل الشياطين."},images:[],sizes:["M","L","XL","XXL","3XL"],colors:["Black"],fit:"Oversized",variants:[{color:"Black",images:["image/daki-upper-six-black-women.jpg?v=1","image/daki-upper-six-black-men.jpg?v=1"]}],featured:true,onSale:false,stockStatus:"In Stock",newness:58,bestSeller:false},
  {id:38,name:{en:"Muzan Demon Slayer Oversized T-shirt",ar:"تيشيرت موزان أنمي قاتل الشياطين أوفرسايز"},category:"Anime",categories:["Anime","Oversized"],collection:"Demon Slayer",gender:"Unisex",price:600,description:{en:"Premium 240 GSM washed cotton oversized T-shirt with Muzan Kibutsuji Demon Slayer artwork. Unisex streetwear fit.",ar:"تيشيرت قطن مغسول فاخر بوزن 240 GSM، قصة أوفرسايز للجنسين، وطباعة موزان كيبوتسوجي من أنمي قاتل الشياطين."},images:[],sizes:["M","L","XL","XXL","3XL"],colors:["Black"],fit:"Oversized",variants:[{color:"Black",images:["image/muzan-black-men.jpg?v=1","image/muzan-black-women.jpg?v=1"]}],featured:true,onSale:false,stockStatus:"In Stock",newness:59,bestSeller:false},
  {id:39,name:{en:"Naruto Uzumaki Naruto Oversized T-shirt",ar:"تيشيرت ناروتو أنمي ناروتو أوفرسايز"},category:"Anime",categories:["Anime","Oversized"],collection:"Naruto",gender:"Unisex",price:600,description:{en:"Premium 240 GSM washed cotton oversized T-shirt with Naruto Uzumaki artwork. Unisex streetwear fit.",ar:"تيشيرت قطن مغسول فاخر بوزن 240 GSM، قصة أوفرسايز للجنسين، وطباعة ناروتو أوزوماكي من أنمي ناروتو."},images:[],sizes:["M","L","XL","XXL","3XL"],colors:["Black"],fit:"Oversized",variants:[{color:"Black",images:["image/naruto-uzumaki-black-men.jpg?v=1","image/naruto-uzumaki-black-women.jpg?v=1"]}],featured:true,onSale:false,stockStatus:"In Stock",newness:60,bestSeller:false},
  {id:40,name:{en:"Black Bulls Basic Black Clover T-shirt",ar:"تيشيرت فريق الثيران السوداء بيسيك أنمي بلاك كلوفير"},category:"Anime",categories:["Anime","Oversized","Basic"],collection:"Black Clover",gender:"Men",price:550,description:{en:"Basic Black Clover oversized T-shirt for men with Black Bulls artwork. Beige is the main colorway.",ar:"تيشيرت بلاك كلوفير بيسيك أوفرسايز للرجال فقط مع طباعة فريق الثيران السوداء. اللون البيج هو الصورة الأساسية."},images:[],sizes:["M","L","XL","XXL","3XL"],colors:["Beige","Gray","White","Black"],fit:"Oversized",variants:[{color:"Beige",images:["image/black-bulls-basic-beige-men.jpg?v=1"]},{color:"Gray",images:["image/black-bulls-basic-gray-men.jpg?v=1"]},{color:"White",images:["image/black-bulls-basic-white-men.jpg?v=1"]},{color:"Black",images:["image/black-bulls-basic-black-men.jpg?v=1"]}],featured:true,onSale:false,stockStatus:"In Stock",newness:61,bestSeller:false},
  {id:41,name:{en:"Levi Basic Attack On Titan T-shirt",ar:"تيشيرت ليفاي بيسيك أنمي اتاك أون تايتن"},category:"Anime",categories:["Anime","Oversized","Basic"],collection:"Attack On Titan",gender:"Unisex",price:550,description:{en:"Basic Attack On Titan oversized T-shirt with Levi Ackerman minimal artwork. Black is the main colorway.",ar:"تيشيرت اتاك أون تايتن بيسيك أوفرسايز مع طباعة ليفاي أكرمان بسيطة. اللون الأسود هو الصورة الأساسية."},images:[],sizes:["M","L","XL","XXL","3XL"],colors:["Black"],fit:"Oversized",variants:[{color:"Black",images:["image/levi-basic-black-men.jpg?v=1","image/levi-basic-black-women.jpg?v=1"]}],featured:true,onSale:false,stockStatus:"In Stock",newness:62,bestSeller:false},
  {id:42,name:{en:"Himura Kenshin Samurai X Oversized T-shirt",ar:"تيشيرت هيمورا كينشين أنمي ساموراي X أوفرسايز"},category:"Anime",categories:["Anime","Oversized"],collection:"Samurai X",gender:"Unisex",price:600,description:{en:"Premium 240 GSM washed cotton oversized T-shirt with Himura Kenshin Samurai X artwork. Unisex streetwear fit.",ar:"تيشيرت قطن مغسول فاخر بوزن 240 GSM، قصة أوفرسايز للجنسين، وطباعة هيمورا كينشين من أنمي ساموراي X."},images:[],sizes:["M","L","XL","XXL","3XL"],colors:["Black"],fit:"Oversized",variants:[{color:"Black",images:["image/kenshin-black-men.jpg?v=1","image/kenshin-black-women.jpg?v=1"]}],featured:true,onSale:false,stockStatus:"In Stock",newness:63,bestSeller:false},
  {id:43,name:{en:"Eren Attack On Titan Oversized T-shirt",ar:"تيشيرت إيرين أنمي اتاك أون تايتن أوفرسايز"},category:"Anime",categories:["Anime","Oversized"],collection:"Attack On Titan",gender:"Unisex",price:600,description:{en:"Premium 240 GSM washed cotton oversized T-shirt with Eren Attack On Titan artwork. Unisex streetwear fit.",ar:"تيشيرت قطن مغسول فاخر بوزن 240 GSM، قصة أوفرسايز للجنسين، وطباعة إيرين من أنمي اتاك أون تايتن."},images:[],sizes:["M","L","XL","XXL","3XL"],colors:["Black"],fit:"Oversized",variants:[{color:"Black",images:["image/eren-titan-black-men.jpg?v=1","image/eren-titan-black-women.jpg?v=1"]}],featured:true,onSale:false,stockStatus:"In Stock",newness:64,bestSeller:false},
  {id:44,name:{en:"Levi Ackerman Attack On Titan Oversized T-shirt",ar:"تيشيرت ليفاي أكرمان أنمي اتاك أون تايتن أوفرسايز"},category:"Anime",categories:["Anime","Oversized"],collection:"Attack On Titan",gender:"Unisex",price:600,description:{en:"Premium 240 GSM washed cotton oversized T-shirt with Levi Ackerman Attack On Titan artwork. Unisex streetwear fit.",ar:"تيشيرت قطن مغسول فاخر بوزن 240 GSM، قصة أوفرسايز للجنسين، وطباعة ليفاي أكرمان من أنمي اتاك أون تايتن."},images:[],sizes:["M","L","XL","XXL","3XL"],colors:["Black"],fit:"Oversized",variants:[{color:"Black",images:["image/levi-ackerman-black-men.jpg?v=1","image/levi-ackerman-black-women.jpg?v=1"]}],featured:true,onSale:false,stockStatus:"In Stock",newness:65,bestSeller:false},
].map(product=>({...product,price:[34,35,36,37,38,39,40,41,42,43,44].includes(product.id)?product.price:600,oldPrice:[34,35,36,37,38,39,40,41,42,43,44].includes(product.id)?null:750,onSale:[34,35,36,37,38,39,40,41,42,43,44].includes(product.id)?false:true,images:product.variants?.[0]?.images||product.images,sizeGuideImage:product.sizeGuideImage||DEFAULT_SIZE_GUIDE_IMAGE}));

// Keep the complete store taxonomy visible while the real catalog is being built.
const STORE_CATEGORIES=["Anime","Regular","Streetwear","Oversized","Accessories"];
const STORE_COLLECTIONS=[...new Set(products.map(product=>product.collection).filter(Boolean))];
const STORE_GENDERS=["Men","Women","Unisex"];
const STORE_SIZES=["XS","M","L","XL","XXL","3XL","28","30","32","34","36","One Size"];

const translations = {
  en:{announcement:"🚚 Free Shipping On Orders Above 1000 EGP",navHome:"Home",navShop:"Shop",navCategories:"Categories",navCollections:"Collections",navContact:"Contact",heroEyebrow:"NEW SEASON · 2026",heroTitle:"Wear Your<br>Own Story.",heroSubtitle:"Anime energy. Street attitude. Timeless essentials.",shopNow:"Shop now",exploreCollections:"Explore collections",trustQuality:"Premium quality",trustDelivery:"Fast delivery",trustExchange:"Easy exchange",trustSecure:"Secure checkout",selectedForYou:"SELECTED FOR YOU",featuredTitle:"Featured pieces",viewAll:"View all <span>↗</span>",catAnime:"Anime",catStreetwear:"Streetwear",catRegular:"Regular Fit",catClassic:"Classic",discover:"Discover",communityFavorites:"COMMUNITY FAVORITES",bestSellers:"Best sellers",collectionSpotlight:"COLLECTION SPOTLIGHT",collectionText:"A refined collision of Japanese iconography and Cairo street culture. Made to move differently.",shopCollection:"Shop the collection",fullCatalog:"THE FULL EDIT",shopTitle:"Shop all",filters:"Filters",searchPlaceholder:"Search pieces",sortBy:"Sort by",sortFeatured:"Featured",sortNewest:"Newest",sortLow:"Price: Low to High",sortHigh:"Price: High to Low",category:"Category",collection:"Collection",gender:"Gender",size:"Size",price:"Price",showResults:"Show results",clearFilters:"Clear all filters",justDropped:"JUST DROPPED",newArrivals:"New arrivals",promoOverline:"YOUR FIRST GHAZY PIECE",promoTitle:"10% OFF YOUR<br>FIRST ORDER",promoCode:"Use code <strong>ghazi10</strong> at checkout",stayInLoop:"STAY IN THE LOOP",newsletterTitle:"Get the drop first.",newsletterText:"New releases, private offers and stories from the Ghazy world.",emailPlaceholder:"Your email address",footerTagline:"Designed for those who refuse to blend in.",shopFooter:"Shop",categories:"Categories",collections:"Collections",help:"Help",shipping:"Shipping",returns:"Returns & exchange",sizeGuide:"Size guide",contactUs:"Contact us",location:"New Damietta, Egypt",rights:"All rights reserved.",privacy:"Privacy",terms:"Terms",yourSelection:"YOUR SELECTION",cart:"Cart",discountCode:"Discount code",apply:"Apply",subtotal:"Subtotal",discount:"Discount",total:"Total",checkout:"Secure checkout",continueShopping:"Continue shopping",savedPieces:"SAVED PIECES",wishlist:"Wishlist",completeOrder:"Complete your order",contactDetails:"Contact details",fullName:"Full name",phone:"Phone number",whatsapp:"WhatsApp number",email:"Email",deliveryAddress:"Delivery address",governorate:"Governorate",city:"City",address:"Full address",notes:"Notes (optional)",paymentMethod:"Payment method",cod:"Cash on delivery",payAtDoor:"Pay when your order arrives",bankTransfer:"Bank transfer",detailsAfter:"Details after order",transactionRef:"Transaction reference number",paymentNote:"Please complete the transfer and enter the transaction reference.",confirmOrder:"Confirm order",orderSummary:"Order summary",thankYou:"Thank you.",orderReceived:"Your order has been received and is now being prepared.",confirmWhatsapp:"Confirm on WhatsApp",quickView:"Quick view",featured:"Featured",sale:"Sale",freeShipping:"Free shipping",products:"products",inStock:"In Stock",selectOptions:"Please select a size, fit and color.",addedCart:"Added to your cart",addedWishlist:"Saved to your wishlist",removedWishlist:"Removed from wishlist",emptyCart:"Your cart is waiting for something good.",emptyWishlist:"Your saved pieces will appear here.",startShopping:"Start shopping",awayShipping:"You are only {amount} EGP away from FREE SHIPPING",unlockedShipping:"🎉 Congratulations! You unlocked FREE SHIPPING",free:"FREE",invalidCode:"This discount code is invalid or inactive.",discountApplied:"10% discount applied.",emptyCheckout:"Your cart is empty.",requiredError:"Please complete all required fields.",phoneError:"Please enter a valid Egyptian phone number.",paymentRefError:"Please enter the transaction reference.",orderError:"We could not save the order. Please try again.",newsletterSuccess:"You're on the Ghazy list.",noResults:"No pieces found",tryFilters:"Try adjusting your search or filters.",related:"You may also like",quantity:"Quantity",color:"Color",fitType:"Fit",oversizedFit:"Oversized Tee",regularFit:"Regular Tee",zoomHint:"Scroll to zoom · Drag to move · Double-click to zoom"},
  ar:{announcement:"🚚 شحن مجاني للطلبات التي تزيد عن 1000 جنيه",navHome:"الرئيسية",navShop:"تسوق",navCategories:"الفئات",navCollections:"المجموعات",navContact:"تواصل معنا",heroEyebrow:"الموسم الجديد · 2026",heroTitle:"ارتدِ قصتك<br>الخاصة.",heroSubtitle:"طاقة الأنمي. روح الشارع. أساسيات خالدة.",shopNow:"تسوق الآن",exploreCollections:"اكتشف المجموعات",trustQuality:"جودة فاخرة",trustDelivery:"توصيل سريع",trustExchange:"استبدال سهل",trustSecure:"دفع آمن",selectedForYou:"اخترناها لك",featuredTitle:"قطع مميزة",viewAll:"عرض الكل <span>↗</span>",catAnime:"أنمي",catStreetwear:"ستريت وير",catRegular:"ريجولار",catClassic:"كلاسيك",discover:"اكتشف",communityFavorites:"اختيارات مجتمع غازي",bestSellers:"الأكثر مبيعاً",collectionSpotlight:"مجموعة مختارة",collectionText:"مزيج راقٍ من الأيقونات اليابانية وثقافة شوارع القاهرة. صُمم لتتحرك باختلاف.",shopCollection:"تسوق المجموعة",fullCatalog:"التشكيلة الكاملة",shopTitle:"تسوق الكل",filters:"الفلاتر",searchPlaceholder:"ابحث عن قطعة",sortBy:"ترتيب حسب",sortFeatured:"المميز",sortNewest:"الأحدث",sortLow:"السعر: من الأقل للأعلى",sortHigh:"السعر: من الأعلى للأقل",category:"الفئة",collection:"المجموعة",gender:"النوع",size:"المقاس",price:"السعر",showResults:"عرض النتائج",clearFilters:"مسح كل الفلاتر",justDropped:"وصل حديثاً",newArrivals:"وصل حديثاً",promoOverline:"قطعتك الأولى من غازي",promoTitle:"خصم 10% على<br>طلبك الأول",promoCode:"استخدم كود <strong>ghazi10</strong> عند الدفع",stayInLoop:"ابقَ قريباً",newsletterTitle:"كن أول من يعرف.",newsletterText:"إصدارات جديدة وعروض خاصة وحكايات من عالم غازي.",emailPlaceholder:"بريدك الإلكتروني",footerTagline:"صُمم لمن يرفضون الذوبان وسط الزحام.",shopFooter:"تسوق",categories:"الفئات",collections:"المجموعات",help:"المساعدة",shipping:"الشحن",returns:"الاستبدال والاسترجاع",sizeGuide:"دليل المقاسات",contactUs:"تواصل معنا",location:"دمياط الجديدة، مصر",rights:"جميع الحقوق محفوظة.",privacy:"الخصوصية",terms:"الشروط",yourSelection:"اختياراتك",cart:"السلة",discountCode:"كود الخصم",apply:"تطبيق",subtotal:"المجموع الفرعي",discount:"الخصم",total:"الإجمالي",checkout:"إتمام الشراء بأمان",continueShopping:"متابعة التسوق",savedPieces:"القطع المحفوظة",wishlist:"المفضلة",completeOrder:"أكمل طلبك",contactDetails:"بيانات التواصل",fullName:"الاسم بالكامل",phone:"رقم الهاتف",whatsapp:"رقم واتساب",email:"البريد الإلكتروني",deliveryAddress:"عنوان التوصيل",governorate:"المحافظة",city:"المدينة",address:"العنوان بالكامل",notes:"ملاحظات (اختياري)",paymentMethod:"طريقة الدفع",cod:"الدفع عند الاستلام",payAtDoor:"ادفع عند وصول طلبك",bankTransfer:"تحويل بنكي",detailsAfter:"التفاصيل بعد الطلب",transactionRef:"رقم مرجع العملية",paymentNote:"أكمل التحويل ثم أدخل رقم مرجع العملية.",confirmOrder:"تأكيد الطلب",orderSummary:"ملخص الطلب",thankYou:"شكراً لك.",orderReceived:"تم استلام طلبك وجارٍ تجهيزه الآن.",confirmWhatsapp:"تأكيد عبر واتساب",quickView:"عرض سريع",featured:"مميز",sale:"خصم",freeShipping:"شحن مجاني",products:"منتج",inStock:"متوفر",selectOptions:"اختر المقاس والقصة واللون.",addedCart:"تمت الإضافة إلى سلتك",addedWishlist:"تم الحفظ في المفضلة",removedWishlist:"تمت الإزالة من المفضلة",emptyCart:"سلتك تنتظر شيئاً مميزاً.",emptyWishlist:"ستظهر القطع المحفوظة هنا.",startShopping:"ابدأ التسوق",awayShipping:"متبقي {amount} جنيه فقط للحصول على الشحن المجاني",unlockedShipping:"🎉 مبروك! لقد حصلت على شحن مجاني",free:"مجاني",invalidCode:"كود الخصم غير صحيح أو غير فعال.",discountApplied:"تم تطبيق خصم 10٪.",emptyCheckout:"سلة التسوق فارغة.",requiredError:"يرجى إكمال جميع الحقول المطلوبة.",phoneError:"يرجى إدخال رقم هاتف مصري صحيح.",paymentRefError:"يرجى إدخال رقم مرجع العملية.",orderError:"تعذر حفظ الطلب. يرجى المحاولة مرة أخرى.",newsletterSuccess:"أنت الآن ضمن قائمة غازي.",noResults:"لم نعثر على قطع",tryFilters:"جرب تغيير البحث أو الفلاتر.",related:"قد يعجبك أيضاً",quantity:"الكمية",color:"اللون",fitType:"القصة",oversizedFit:"أوفر سايز",regularFit:"ريجولار تيشيرت"}
};

translations.ar.zoomHint="حرّك عجلة الماوس للتكبير · اسحب الصورة للتحريك · انقر مرتين للتكبير";
Object.assign(translations.en,{
  customOverline:"CUSTOM MADE",
  customTitle:"CREATE<br>YOUR SHIRT",
  customText:"Send us your character, quote, logo, or idea. We will turn it into a premium tee made for you.",
  customGenderLabel:"Who is it for?",
  customMen:"Men",
  customWomen:"Women",
  customSizeGuideLabel:"Size guides",
  customOversizedGuide:"Oversized",
  customRegularGuide:"Regular",
  customLongSleeveGuide:"Long sleeve",
  customStart:"Design your shirt",
  customWhatsappNote:"We will continue the details with you on WhatsApp."
});
Object.assign(translations.ar,{
  customOverline:"تصميم مخصص",
  customTitle:"صمّم<br>تيشيرتك",
  customText:"ابعتلنا الشخصية، الجملة، اللوجو، أو الفكرة اللي في بالك، ونحوّلها لتيشيرت بجودة غازي.",
  customGenderLabel:"التيشيرت لمين؟",
  customMen:"رجل",
  customWomen:"أنثى",
  customSizeGuideLabel:"دلايل المقاسات",
  customOversizedGuide:"أوفر سايز",
  customRegularGuide:"ريجولار",
  customLongSleeveGuide:"أكمام طويلة",
  customStart:"صمّم تيشيرتك",
  customWhatsappNote:"هنكمل التفاصيل معاك على واتساب."
});

let lang = localStorage.getItem("ghazy-language") || "en";
let cart = JSON.parse(localStorage.getItem("ghazy-cart") || "[]");
let wishlist = JSON.parse(localStorage.getItem("ghazy-wishlist") || "[]");
let appliedDiscount = JSON.parse(localStorage.getItem("ghazy-discount") || "null");
let activeProduct = null;
let viewerScale=1,viewerX=0,viewerY=0,viewerDragging=false,viewerStartX=0,viewerStartY=0;
const filters = { search:"", categories:[], collections:[], genders:[], sizes:[], maxPrice:2000, sort:"featured" };
const $ = (selector, parent=document) => parent.querySelector(selector);
const $$ = (selector, parent=document) => [...parent.querySelectorAll(selector)];
const t = key => translations[lang][key] || translations.en[key] || key;
const localName = product => product.name[lang] || product.name.en;
const formatMoney = value => `${Math.round(value).toLocaleString(lang === "ar" ? "ar-EG" : "en-EG")} ${lang === "ar" ? CURRENCY_AR : CURRENCY}`;
const discountPercent = product => product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;
const discountLabel = product => lang === "ar" ? `خصم ${discountPercent(product)}%` : `${discountPercent(product)}% OFF`;
const priceHTML = product => `${product.onSale&&product.oldPrice?`<span class="original-price">${formatMoney(product.oldPrice)}</span>`:""}<span class="current-price">${formatMoney(product.price)}</span>`;
const fitOptionLabel = value => (FIT_OPTIONS.find(option=>option.value===value)?.label[lang] || value);
const fitSizeGuideImage = value => FIT_OPTIONS.find(option=>option.value===value)?.sizeGuideImage || DEFAULT_SIZE_GUIDE_IMAGE;
const productDefaultFit = product => FIT_OPTIONS.some(option=>option.value===product.fit) ? product.fit : DEFAULT_FIT_OPTION;
const normalizeCartFit = value => FIT_OPTIONS.some(option=>option.value===value) ? value : DEFAULT_FIT_OPTION;

document.addEventListener("DOMContentLoaded", init);
function init(){
  document.body.dataset.theme = localStorage.getItem("ghazy-theme") || "dark";
  const validIds=new Set(products.map(product=>product.id));
  cart=cart.map(item=>{const fit=normalizeCartFit(item.fit);return {...item,fit,key:`${item.productId}-${item.size}-${item.color}-${fit}`};}).filter(item=>{const product=products.find(entry=>entry.id===item.productId);return validIds.has(item.productId)&&product.sizes.includes(item.size)&&product.colors.includes(item.color);});
  wishlist=wishlist.filter(id=>validIds.has(id));
  localStorage.setItem("ghazy-cart",JSON.stringify(cart));
  localStorage.setItem("ghazy-wishlist",JSON.stringify(wishlist));
  renderSkeletons(); setTimeout(() => { renderAllProducts(); }, 420);
  applyLanguage(); updateCustomShirtLink(); buildFilters(); bindEvents(); updateCart(); updateWishlist(); observeReveals();
}

function renderSkeletons(){
  ["featuredGrid","bestSellerGrid","shopGrid","newArrivalsGrid"].forEach(id => {
    const el = document.getElementById(id); if(!el) return;
    el.innerHTML = Array.from({length:id === "shopGrid" ? 6 : 4},()=>'<article class="skeleton-card"><div class="skeleton"></div><span class="skeleton"></span><span class="skeleton"></span></article>').join("");
  });
}

function productCard(product){
  return `<article class="product-card" data-id="${product.id}" role="button" tabindex="0" aria-label="${escapeHTML(localName(product))}">
    <div class="product-image">
      <img src="${product.images[0]}" alt="${escapeHTML(localName(product))}" loading="lazy">
      <div class="product-badges">${product.featured?`<span class="badge">${t("featured")}</span>`:""}${product.onSale?`<span class="badge sale">${discountLabel(product)}</span>`:""}${product.price>=FREE_SHIPPING_THRESHOLD?`<span class="badge shipping">${t("freeShipping")}</span>`:""}</div>
      <button class="wishlist-btn ${wishlist.includes(product.id)?"active":""}" data-wishlist="${product.id}" aria-label="Wishlist"><svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"/></svg></button>
      <button class="quick-view" data-quick-view="${product.id}">${t("quickView")}</button>
    </div>
    <div class="product-info"><p class="product-meta">${translateTaxonomy(product.category)} · ${translateTaxonomy(product.gender)}</p><h3 class="product-name">${localName(product)}</h3><p class="product-price">${priceHTML(product)}</p></div>
  </article>`;
}

function renderAllProducts(){
  $("#featuredGrid").innerHTML = products.filter(p=>p.featured).slice(0,4).map(productCard).join("");
  $("#bestSellerGrid").innerHTML = products.filter(p=>p.bestSeller).slice(0,4).map(productCard).join("");
  $("#newArrivalsGrid").innerHTML = [...products].sort((a,b)=>b.newness-a.newness).slice(0,4).map(productCard).join("");
  renderShop();
  wireProductInteractions();
}

function getFilteredProducts(){
  let result = products.filter(p => {
    const productCategories=[p.category,...(p.categories||[]),p.fit].filter(Boolean).join(" ");
    const searchText = `${p.name.en} ${p.name.ar} ${productCategories} ${p.collection} ${p.gender}`.toLowerCase();
    const categoryMatch=!filters.categories.length||filters.categories.some(category=>productMatchesCategory(p,category));
    return searchText.includes(filters.search.toLowerCase()) && categoryMatch && (!filters.collections.length||filters.collections.includes(p.collection)) && (!filters.genders.length||filters.genders.includes(p.gender)) && (!filters.sizes.length||filters.sizes.some(s=>p.sizes.includes(s))) && p.price<=filters.maxPrice;
  });
  if(filters.sort==="newest") result.sort((a,b)=>b.newness-a.newness);
  if(filters.sort==="low") result.sort((a,b)=>a.price-b.price);
  if(filters.sort==="high") result.sort((a,b)=>b.price-a.price);
  if(filters.sort==="featured") result.sort((a,b)=>(b.featured-a.featured)||(b.bestSeller-a.bestSeller));
  return result;
}

function productMatchesCategory(product,category){
  return product.category===category||(product.categories||[]).includes(category)||(category==="Oversized"&&product.fit==="Oversized")||category==="Regular";
}

function renderShop(){
  const result=getFilteredProducts();
  $("#productCount").textContent=`${result.length} ${t("products")}`;
  $("#shopGrid").innerHTML=result.length?result.map(productCard).join(""):`<div class="empty-state"><h3>${t("noResults")}</h3><p>${t("tryFilters")}</p></div>`;
  wireProductInteractions($("#shopGrid"));
}

// Attach interactions after every data-driven render, including filter and
// language updates. Direct bindings are more reliable than delegation alone.
function wireProductInteractions(scope=document){
  $$(".product-card",scope).forEach(card=>{
    if(card.dataset.productBound) return;
    card.dataset.productBound="true";
    card.addEventListener("click",event=>{
      if(event.target.closest("button")) return;
      openProduct(Number(card.dataset.id));
    });
    card.addEventListener("keydown",event=>{
      if(event.key!=="Enter"&&event.key!==" ") return;
      event.preventDefault();
      openProduct(Number(card.dataset.id));
    });
  });
  $$('[data-quick-view]',scope).forEach(button=>{
    if(button.dataset.quickBound) return;
    button.dataset.quickBound="true";
    button.addEventListener("click",event=>{
      event.stopPropagation();
      openProduct(Number(button.dataset.quickView));
    });
  });
  $$('[data-wishlist]',scope).forEach(button=>{
    if(button.dataset.wishlistBound) return;
    button.dataset.wishlistBound="true";
    button.addEventListener("click",event=>{
      event.stopPropagation();
      toggleWishlist(Number(button.dataset.wishlist));
    });
  });
}

function buildFilters(){
  const config=[
    ["categoryFilters",STORE_CATEGORIES,"categories"],
    ["collectionFilters",STORE_COLLECTIONS,"collections"],
    ["genderFilters",STORE_GENDERS,"genders"]
  ];
  config.forEach(([id,items,key])=>{
    $("#"+id).innerHTML=items.map(item=>`<label class="filter-check"><input type="checkbox" value="${item}" data-filter="${key}"><span>${translateTaxonomy(item)}</span><small>${products.filter(p=>key==="categories"?productMatchesCategory(p,item):p[key==="collections"?"collection":"gender"]===item).length}</small></label>`).join("");
  });
  $("#sizeFilters").innerHTML=STORE_SIZES.map(s=>`<label><input type="checkbox" value="${s}" data-filter="sizes"><span>${s}</span></label>`).join("");
}

function bindEvents(){
  document.addEventListener("click", handleClick);
  $("#languageToggle").addEventListener("click",()=>{lang=lang==="en"?"ar":"en";localStorage.setItem("ghazy-language",lang);applyLanguage();buildFilters();renderAllProducts();updateCart();updateWishlist();});
  $("#themeToggle").addEventListener("click",()=>{const theme=document.body.dataset.theme==="dark"?"light":"dark";document.body.dataset.theme=theme;localStorage.setItem("ghazy-theme",theme);});
  $("#menuToggle").addEventListener("click",()=>{$("#navLinks").classList.toggle("open");$("#menuToggle").setAttribute("aria-expanded",$("#navLinks").classList.contains("open"));});
  $("#searchInput").addEventListener("input",e=>{filters.search=e.target.value;renderShop();});
  $("#sortSelect").addEventListener("change",e=>{filters.sort=e.target.value;renderShop();});
  $("#priceRange").addEventListener("input",e=>{filters.maxPrice=Number(e.target.value);$("#priceValue").textContent=formatMoney(filters.maxPrice);renderShop();});
  $("#filtersPanel").addEventListener("change",e=>{if(!e.target.dataset.filter)return;const key=e.target.dataset.filter;filters[key]=$$(`[data-filter="${key}"]:checked`).map(i=>i.value);renderShop();});
  $("#filterOpen").addEventListener("click",()=>{$("#filtersPanel").classList.add("open");$("#drawerBackdrop").classList.add("open");});
  $("#filterClose").addEventListener("click",closeFilters);$("#applyFilters").addEventListener("click",closeFilters);
  $("#clearFilters").addEventListener("click",clearFilters);
  $("#applyDiscount").addEventListener("click",applyDiscountCode);
  $("#checkoutOpen").addEventListener("click",openCheckout);
  $("#checkoutForm").addEventListener("submit",submitOrder);
  $("#paymentOptions").addEventListener("change",toggleTransactionFields);
  $("#newsletterForm").addEventListener("submit",e=>{e.preventDefault();showToast(t("newsletterSuccess"));e.target.reset();});
  const customGenderOptions=$("#customGenderOptions");
  if(customGenderOptions)customGenderOptions.addEventListener("change",updateCustomShirtLink);
  $$("[data-custom-size-guide]").forEach(button=>button.addEventListener("click",()=>openCustomSizeGuide(button.dataset.customSizeGuide)));
  $("#successClose").addEventListener("click",()=>closeModal($("#successModal")));
  $("#viewerZoomIn").addEventListener("click",()=>setViewerZoom(viewerScale+.5));
  $("#viewerZoomOut").addEventListener("click",()=>setViewerZoom(viewerScale-.5));
  $("#viewerReset").addEventListener("click",resetImageViewer);
  $("#viewerClose").addEventListener("click",closeImageViewer);
  $("#imageViewer").addEventListener("click",event=>{if(event.target.matches("[data-close-image-viewer]"))closeImageViewer();});
  const viewerStage=$("#imageViewerStage");
  viewerStage.addEventListener("wheel",event=>{event.preventDefault();setViewerZoom(viewerScale+(event.deltaY<0?.25:-.25));},{passive:false});
  viewerStage.addEventListener("dblclick",()=>setViewerZoom(viewerScale>1?1:2));
  viewerStage.addEventListener("pointerdown",startViewerDrag);
  viewerStage.addEventListener("pointermove",moveViewerDrag);
  viewerStage.addEventListener("pointerup",endViewerDrag);
  viewerStage.addEventListener("pointercancel",endViewerDrag);
  document.addEventListener("keydown",event=>{if(event.key==="Escape"&&$("#imageViewer").classList.contains("open"))closeImageViewer();});
  window.addEventListener("scroll",()=>{$("#siteHeader").classList.toggle("scrolled",scrollY>30);$("#backToTop").classList.toggle("visible",scrollY>700);});
  $("#backToTop").addEventListener("click",()=>scrollTo({top:0,behavior:"smooth"}));
}

function handleClick(e){
  const category=e.target.closest("[data-category]"); if(category){selectTaxonomy("categories",category.dataset.category);return;}
  const collection=e.target.closest("[data-collection]"); if(collection){selectTaxonomy("collections",collection.dataset.collection);return;}
  if(e.target.closest("#cartOpen")) openDrawer("cartDrawer");
  if(e.target.closest("#wishlistOpen")) openDrawer("wishlistDrawer");
  if(e.target.matches("[data-close-drawer]")||e.target.id==="drawerBackdrop") closeDrawers();
  if(e.target.matches("[data-close-modal]")) closeModal($("#productModal"));
  if(e.target.matches("[data-close-checkout]")) closeModal($("#checkoutModal"));
  const qty=e.target.closest("[data-cart-qty]"); if(qty) changeCartQty(qty.dataset.key,Number(qty.dataset.cartQty));
  const remove=e.target.closest("[data-remove-cart]"); if(remove) removeCartItem(remove.dataset.removeCart);
  const removeWish=e.target.closest("[data-remove-wish]"); if(removeWish) toggleWishlist(Number(removeWish.dataset.removeWish));
  const addWish=e.target.closest("[data-add-wish]"); if(addWish){const p=products.find(x=>x.id===Number(addWish.dataset.addWish));addToCart(p.id,p.sizes[0],p.colors[0],productDefaultFit(p),1);}
  const thumb=e.target.closest("[data-gallery-image]"); if(thumb){$("#mainGalleryImage").src=thumb.dataset.galleryImage;$$('[data-gallery-image]').forEach(x=>x.classList.remove("active"));thumb.classList.add("active");}
  const modalQty=e.target.closest("[data-modal-qty]"); if(modalQty){const span=$("#modalQuantity");span.textContent=Math.max(1,Number(span.textContent)+Number(modalQty.dataset.modalQty));}
  if(e.target.closest("#modalAddToCart")) addModalProduct();
}

function selectTaxonomy(key,value){clearFilters(false);filters[key]=[value];const box=$(`[data-filter="${key}"][value="${CSS.escape(value)}"]`);if(box)box.checked=true;renderShop();document.getElementById("shop").scrollIntoView({behavior:"smooth"});}
function clearFilters(render=true){Object.assign(filters,{search:"",categories:[],collections:[],genders:[],sizes:[],maxPrice:2000,sort:"featured"});$$('#filtersPanel input[type="checkbox"]').forEach(i=>i.checked=false);$("#priceRange").value=2000;$("#priceValue").textContent=formatMoney(2000);$("#searchInput").value="";$("#sortSelect").value="featured";if(render)renderShop();}
function closeFilters(){$("#filtersPanel").classList.remove("open");$("#drawerBackdrop").classList.remove("open");}

function imagesForColor(product,color){
  return product.variants?.find(variant=>variant.color===color)?.images||product.images;
}
function updateProductGallery(color){
  if(!activeProduct)return;
  const images=imagesForColor(activeProduct,color);
  const thumbs=$(".gallery-thumbs",$("#productModalContent"));
  const main=$("#mainGalleryImage");
  if(!thumbs||!main||!images.length)return;
  thumbs.innerHTML=images.map((image,index)=>`<button class="${index===0?"active":""}" data-gallery-image="${image}"><img src="${image}" alt="${escapeHTML(localName(activeProduct))} ${color}"></button>`).join("");
  main.src=images[0];
  main.alt=`${localName(activeProduct)} — ${color}`;
}

function openProduct(id){
  const p=products.find(x=>x.id===id); if(!p)return; activeProduct=p;
  const related=products.filter(x=>x.id!==p.id&&(x.category===p.category||x.collection===p.collection)).slice(0,3);
  const defaultFit=productDefaultFit(p);
  $("#productModalContent").innerHTML=`<div class="product-detail">
    <div class="product-gallery"><div class="gallery-thumbs">${p.images.map((img,i)=>`<button class="${i===0?"active":""}" data-gallery-image="${img}"><img src="${img}" alt=""></button>`).join("")}</div><div class="gallery-main" title="${lang==="ar"?"اضغط لتكبير الصورة":"Click to enlarge"}"><img id="mainGalleryImage" src="${p.images[0]}" alt="${escapeHTML(localName(p))}"></div></div>
    <div class="product-detail-info"><p class="eyebrow">${translateTaxonomy(p.category)} · ${translateTaxonomy(p.collection)}</p><h2>${localName(p)}</h2><p class="detail-price">${priceHTML(p)}</p><p class="detail-description">${p.description[lang]}</p>
    <div class="option-head"><span>${t("fitType")}</span></div><div class="option-buttons">${FIT_OPTIONS.map(option=>`<label><input type="radio" name="modalFit" value="${option.value}" ${option.value===defaultFit?"checked":""}><span>${option.label[lang]}</span></label>`).join("")}</div>
    <div class="option-head"><span>${t("size")}</span><button class="size-guide-link" id="sizeGuideOpen">${t("sizeGuide")} ↗</button></div><div class="option-buttons">${p.sizes.map((s,i)=>`<label><input type="radio" name="modalSize" value="${s}" ${i===0?"checked":""}><span>${s}</span></label>`).join("")}</div>
    <div class="option-head"><span>${t("color")}</span></div><div class="option-buttons">${p.colors.map((c,i)=>`<label class="color-option" title="${c}"><input type="radio" name="modalColor" value="${c}" ${i===0?"checked":""}><span style="background:${colorValue(c)}"></span></label>`).join("")}</div>
    <div class="detail-actions"><div class="quantity"><button data-modal-qty="-1">−</button><span id="modalQuantity">1</span><button data-modal-qty="1">+</button></div><button class="btn btn-dark" id="modalAddToCart">${lang==="ar"?"أضف إلى السلة":"Add to cart"}</button></div><p class="stock-note">● ${translateTaxonomy(p.stockStatus)}</p></div></div>
    ${related.length?`<div class="related-block"><h3>${t("related")}</h3><div class="related-products">${related.map(productCard).join("")}</div></div>`:""}`;
  wireProductInteractions($("#productModalContent"));
  $$('input[name="modalColor"]',$("#productModalContent")).forEach(input=>input.addEventListener("change",()=>updateProductGallery(input.value)));
  $("#mainGalleryImage").addEventListener("click",event=>openImageViewer(event.currentTarget.src,event.currentTarget.alt));
  $("#sizeGuideOpen").addEventListener("click",()=>{const fit=$('input[name="modalFit"]:checked')?.value||defaultFit;openImageViewer(fitSizeGuideImage(fit),`${fitOptionLabel(fit)} — ${t("sizeGuide")}`);});
  openModal($("#productModal"));
}
function addModalProduct(){const size=$('input[name="modalSize"]:checked');const color=$('input[name="modalColor"]:checked');const fit=$('input[name="modalFit"]:checked');if(!size||!color||!fit){showToast(t("selectOptions"),"error");return;}addToCart(activeProduct.id,size.value,color.value,fit.value,Number($("#modalQuantity").textContent));closeModal($("#productModal"));openDrawer("cartDrawer");}
function colorValue(c){return ({Black:"#111",Gray:"#777",Beige:"#cbb394",Green:"#17654f",Pink:"#f3a8bb",Stone:"#aaa08f",Cream:"#e5dcc9",Olive:"#555946",White:"#eee","Washed Black":"#393939",Sand:"#c4ad87",Charcoal:"#414141",Khaki:"#8d8065",Burgundy:"#6d2637",Taupe:"#8c796a","Off White":"#e5e1d8"})[c]||"#777";}

function openImageViewer(src,alt=""){
  const viewer=$("#imageViewer"),image=$("#imageViewerImage");
  image.src=src;image.alt=alt;resetImageViewer();
  viewer.classList.add("open");viewer.setAttribute("aria-hidden","false");
  document.body.classList.add("no-scroll");
}
function closeImageViewer(){
  const viewer=$("#imageViewer");viewer.classList.remove("open");viewer.setAttribute("aria-hidden","true");
  resetImageViewer();
  if(!$(".modal.open")&&!$(".side-drawer.open"))document.body.classList.remove("no-scroll");
}
function setViewerZoom(value){
  viewerScale=Math.min(4,Math.max(1,value));
  if(viewerScale===1){viewerX=0;viewerY=0;}
  updateViewerTransform();
}
function resetImageViewer(){viewerScale=1;viewerX=0;viewerY=0;viewerDragging=false;updateViewerTransform();}
function updateViewerTransform(){
  const image=$("#imageViewerImage");if(!image)return;
  image.style.transform=`translate(${viewerX}px,${viewerY}px) scale(${viewerScale})`;
  $("#viewerZoomLevel").textContent=`${Math.round(viewerScale*100)}%`;
  $("#imageViewerStage").classList.toggle("zoomed",viewerScale>1);
}
function startViewerDrag(event){
  if(viewerScale<=1)return;
  viewerDragging=true;viewerStartX=event.clientX-viewerX;viewerStartY=event.clientY-viewerY;
  event.currentTarget.setPointerCapture(event.pointerId);
}
function moveViewerDrag(event){
  if(!viewerDragging)return;
  viewerX=event.clientX-viewerStartX;viewerY=event.clientY-viewerStartY;updateViewerTransform();
}
function endViewerDrag(event){
  viewerDragging=false;
  if(event.currentTarget.hasPointerCapture?.(event.pointerId))event.currentTarget.releasePointerCapture(event.pointerId);
}

function addToCart(productId,size,color,fit=DEFAULT_FIT_OPTION,quantity=1){
  fit=normalizeCartFit(fit);
  const key=`${productId}-${size}-${color}-${fit}`;const existing=cart.find(i=>i.key===key);
  if(existing)existing.quantity+=quantity;else cart.push({key,productId,size,color,fit,quantity});saveCart();updateCart();showToast(t("addedCart"));
}
function changeCartQty(key,delta){const item=cart.find(i=>i.key===key);if(!item)return;item.quantity+=delta;if(item.quantity<=0)cart=cart.filter(i=>i.key!==key);saveCart();updateCart();}
function removeCartItem(key){cart=cart.filter(i=>i.key!==key);saveCart();updateCart();}
function saveCart(){localStorage.setItem("ghazy-cart",JSON.stringify(cart));}
function cartTotals(){const subtotal=cart.reduce((sum,item)=>{const p=products.find(x=>x.id===item.productId);return sum+(p?p.price*item.quantity:0);},0);const discount=appliedDiscount?subtotal*appliedDiscount.percentage/100:0;const shipping=subtotal===0?0:(subtotal>=FREE_SHIPPING_THRESHOLD?0:SHIPPING_COST);return{subtotal,discount,shipping,total:subtotal-discount+shipping};}
function updateCart(){
  const count=cart.reduce((s,i)=>s+i.quantity,0),totals=cartTotals();$("#cartCount").textContent=count;$("#cartDrawerCount").textContent=`(${count})`;
  $("#cartItems").innerHTML=cart.length?cart.map(item=>{const p=products.find(x=>x.id===item.productId);if(!p)return"";return`<article class="cart-item"><img src="${imagesForColor(p,item.color)[0]}" alt="${escapeHTML(localName(p))}"><div class="item-info"><h4>${localName(p)}</h4><p>${fitOptionLabel(item.fit)} · ${item.size} · ${item.color}</p><div class="quantity"><button data-cart-qty="-1" data-key="${item.key}">−</button><span>${item.quantity}</span><button data-cart-qty="1" data-key="${item.key}">+</button></div></div><div class="item-side"><button class="remove-item" data-remove-cart="${item.key}">×</button><strong>${formatMoney(p.price*item.quantity)}</strong></div></article>`}).join(""):`<div class="drawer-empty"><svg viewBox="0 0 24 24"><path d="M6 7h12l1 14H5L6 7Zm3 0V5a3 3 0 0 1 6 0v2"/></svg><h3>${t("cart")}</h3><p>${t("emptyCart")}</p><a href="#shop" class="btn btn-dark" data-close-drawer>${t("startShopping")}</a></div>`;
  $("#cartSubtotal").textContent=formatMoney(totals.subtotal);$("#cartShipping").textContent=totals.shipping?formatMoney(totals.shipping):t("free");$("#cartDiscount").textContent=`− ${formatMoney(totals.discount)}`;$("#cartTotal").textContent=formatMoney(totals.total);
  const progress=Math.min(100,totals.subtotal/FREE_SHIPPING_THRESHOLD*100);$("#shippingProgressBar").style.width=`${progress}%`;$("#shippingMessage").textContent=totals.subtotal>=FREE_SHIPPING_THRESHOLD?t("unlockedShipping"):t("awayShipping").replace("{amount}",Math.max(0,FREE_SHIPPING_THRESHOLD-totals.subtotal).toLocaleString());
  updateCheckoutSummary();
}
function applyDiscountCode(){const input=$("#discountInput").value.trim().toUpperCase();const code=discountCodes.find(c=>c.code.toUpperCase()===input&&c.active);if(!code){appliedDiscount=null;localStorage.removeItem("ghazy-discount");$("#discountFeedback").textContent=t("invalidCode");$("#discountFeedback").style.color="var(--danger)";}else{appliedDiscount=code;localStorage.setItem("ghazy-discount",JSON.stringify(code));$("#discountFeedback").textContent=t("discountApplied");$("#discountFeedback").style.color="var(--success)";}updateCart();}

function toggleWishlist(id){wishlist=wishlist.includes(id)?wishlist.filter(x=>x!==id):[...wishlist,id];localStorage.setItem("ghazy-wishlist",JSON.stringify(wishlist));showToast(wishlist.includes(id)?t("addedWishlist"):t("removedWishlist"));updateWishlist();renderAllProducts();}
function updateWishlist(){$("#wishlistCount").textContent=wishlist.length;const list=products.filter(p=>wishlist.includes(p.id));$("#wishlistItems").innerHTML=list.length?list.map(p=>`<article class="wish-item"><img src="${p.images[0]}" alt="${escapeHTML(localName(p))}"><div class="item-info"><button class="remove-item" data-remove-wish="${p.id}" style="float:inline-end">×</button><h4>${localName(p)}</h4><p>${priceHTML(p)}</p><button class="btn btn-dark" data-add-wish="${p.id}">${t("cart")}</button></div></article>`).join(""):`<div class="drawer-empty"><h3>${t("wishlist")}</h3><p>${t("emptyWishlist")}</p><a href="#shop" class="btn btn-dark" data-close-drawer>${t("startShopping")}</a></div>`;}

function openDrawer(id){closeDrawers();$("#"+id).classList.add("open");$("#"+id).setAttribute("aria-hidden","false");$("#drawerBackdrop").classList.add("open");document.body.classList.add("no-scroll");}
function closeDrawers(){$$(".side-drawer").forEach(d=>{d.classList.remove("open");d.setAttribute("aria-hidden","true")});$("#drawerBackdrop").classList.remove("open");document.body.classList.remove("no-scroll");closeFilters();}
function openModal(el){el.classList.add("open");el.setAttribute("aria-hidden","false");document.body.classList.add("no-scroll");}
function closeModal(el){el.classList.remove("open");el.setAttribute("aria-hidden","true");document.body.classList.remove("no-scroll");}

function openCheckout(){if(!cart.length){showToast(t("emptyCheckout"),"error");return;}closeDrawers();updateCheckoutSummary();openModal($("#checkoutModal"));}
function updateCheckoutSummary(){
  if(!$("#checkoutItems"))return;const totals=cartTotals();
  $("#checkoutItems").innerHTML=cart.map(item=>{const p=products.find(x=>x.id===item.productId);return p?`<div class="checkout-summary-item"><img src="${imagesForColor(p,item.color)[0]}" alt=""><p>${localName(p)}<br><small>${fitOptionLabel(item.fit)} · ${item.size} · ${item.color} · ×${item.quantity}</small></p><strong>${formatMoney(p.price*item.quantity)}</strong></div>`:""}).join("");
  $("#checkoutTotals").innerHTML=`<div class="summary-line"><span>${t("subtotal")}</span><strong>${formatMoney(totals.subtotal)}</strong></div><div class="summary-line"><span>${t("shipping")}</span><strong>${totals.shipping?formatMoney(totals.shipping):t("free")}</strong></div><div class="summary-line discount-line"><span>${t("discount")}</span><strong>− ${formatMoney(totals.discount)}</strong></div><div class="summary-line total"><span>${t("total")}</span><strong>${formatMoney(totals.total)}</strong></div>`;
}
function toggleTransactionFields(){const payment=$('input[name="payment"]:checked').value;$("#transactionFields").classList.toggle("visible",payment!=="Cash On Delivery");}
function validateEgyptianPhone(value){return /^(?:\+?20|0)?1[0125]\d{8}$/.test(value.replace(/[\s-]/g,""));}
function generateOrderNumber(){const year=new Date().getFullYear();const key=`ghazy-order-sequence-${year}`;const next=(Number(localStorage.getItem(key))||0)+1;localStorage.setItem(key,next);return `GHZ-${year}-${String(next).padStart(4,"0")}`;}
async function submitOrder(e){
  e.preventDefault();const form=e.currentTarget;const fd=new FormData(form);const error=$("#checkoutError");error.textContent="";
  if(!cart.length){error.textContent=t("emptyCheckout");return;}
  const required=["fullName","phone","whatsapp","governorate","city","address"];if(required.some(k=>!String(fd.get(k)||"").trim())){error.textContent=t("requiredError");return;}
  if(!validateEgyptianPhone(fd.get("phone"))){error.textContent=t("phoneError");return;}
  const payment=fd.get("payment");if(payment!=="Cash On Delivery"&&!String(fd.get("transactionReference")||"").trim()){error.textContent=t("paymentRefError");return;}
  const now=new Date(),totals=cartTotals(),orderNumber=generateOrderNumber();
  const order={orderNumber,date:now.toLocaleDateString("en-CA"),time:now.toLocaleTimeString("en-GB",{hour12:false}),customerName:fd.get("fullName").trim(),phone:fd.get("phone").trim(),whatsapp:fd.get("whatsapp").trim(),email:fd.get("email").trim(),governorate:fd.get("governorate"),city:fd.get("city").trim(),address:fd.get("address").trim(),notes:fd.get("notes").trim(),paymentMethod:payment,transactionReference:fd.get("transactionReference").trim(),discountCode:appliedDiscount?.code||"",discountAmount:totals.discount,shippingCost:totals.shipping,subtotal:totals.subtotal,finalTotal:totals.total,products:cart.map(item=>{const p=products.find(x=>x.id===item.productId);return{id:p.id,name:p.name.en,fit:item.fit,fitLabel:FIT_OPTIONS.find(option=>option.value===item.fit)?.label.en||item.fit,size:item.size,color:item.color,quantity:item.quantity,unitPrice:p.price,total:p.price*item.quantity};})};
  const button=$(".confirm-btn",form);button.classList.add("loading");button.disabled=true;
  // Open during the click event so browsers do not block the automatic WhatsApp handoff.
  const whatsappWindow=window.open("","_blank");
  try{
    let confirmedOrderNumber=orderNumber;
    if(GOOGLE_SCRIPT_URL!=="PASTE_YOUR_WEB_APP_URL_HERE"){
      await fetch(GOOGLE_SCRIPT_URL,{method:"POST",mode:"no-cors",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify(order)});
      // Google Apps Script often blocks reading the response in the browser because of CORS redirects.
      // no-cors sends the order safely; we keep the generated order number locally.
      order.orderNumber=confirmedOrderNumber;
    }else{await new Promise(resolve=>setTimeout(resolve,900));console.info("Ghazy demo order (connect GOOGLE_SCRIPT_URL to save):",order);}
    const message=buildWhatsAppMessage(order);const waUrl=`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    cart=[];appliedDiscount=null;saveCart();localStorage.removeItem("ghazy-discount");updateCart();form.reset();toggleTransactionFields();closeModal($("#checkoutModal"));$("#successOrderNumber").textContent=confirmedOrderNumber;$("#whatsappButton").href=waUrl;openModal($("#successModal"));if(whatsappWindow)whatsappWindow.location.href=waUrl;else setTimeout(()=>window.open(waUrl,"_blank","noopener"),700);
  }catch(err){if(whatsappWindow)whatsappWindow.close();console.error(err);error.textContent=t("orderError");}
  finally{button.classList.remove("loading");button.disabled=false;}
}
function buildWhatsAppMessage(order){const items=order.products.map(p=>`• ${p.name} — ${p.fitLabel||p.fit} — ${p.size} — ${p.color} ×${p.quantity}`).join("\n");return `Hello Ghazy,\n\nOrder Number:\n${order.orderNumber}\n\nName:\n${order.customerName}\n\nProducts:\n${items}\n\nTotal:\n${order.finalTotal} EGP`;}

function customGenderLabel(value){
  if(lang==="ar")return value==="Women"?"أنثى":"رجل";
  return value==="Women"?"Women":"Men";
}
function buildCustomShirtMessage(){
  const gender=$('input[name="customGender"]:checked')?.value||"Men";
  return lang==="ar"
    ? `أهلاً غازي، عايز أصمم تيشيرت مخصص.\nالنوع: ${customGenderLabel(gender)}\nنوع التيشيرت: \nفكرة التصميم: \nاللون المطلوب: \nالمقاس: \nالكمية: `
    : `Hi Ghazy, I want to create my own shirt.\nFor: ${customGenderLabel(gender)}\nShirt type: \nDesign idea: \nPreferred color: \nSize: \nQuantity: `;
}
function updateCustomShirtLink(){
  const link=$("#customShirtWhatsapp");
  if(!link)return;
  link.href=`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildCustomShirtMessage())}`;
}
function openCustomSizeGuide(value){
  const guide=CUSTOM_SIZE_GUIDES[value];
  if(!guide)return;
  openImageViewer(guide.image,`${guide.label[lang]} — ${t("sizeGuide")}`);
}

function applyLanguage(){
  document.documentElement.lang=lang;document.documentElement.dir=lang==="ar"?"rtl":"ltr";$("#languageToggle").textContent=lang==="en"?"ع":"EN";
  $$('[data-i18n]').forEach(el=>{const value=t(el.dataset.i18n);if(value!==undefined)el.innerHTML=value;});$$('[data-i18n-placeholder]').forEach(el=>el.placeholder=t(el.dataset.i18nPlaceholder));
  updateCustomShirtLink();
  $("#priceValue").textContent=formatMoney(filters.maxPrice);document.title=lang==="ar"?"غازي — أزياء الأنمي والستريت وير الفاخرة":"GHAZY — Premium Streetwear & Anime Fashion";
}
function translateTaxonomy(value){if(lang==="en")return value;return ({Anime:"أنمي",Classic:"كلاسيك",Regular:"ريجولار",Streetwear:"ستريت وير",Oversized:"أوفرسايز",Accessories:"إكسسوارات",Men:"رجالي",Women:"نسائي",Unisex:"للجميع","In Stock":"متوفر","Limited Stock":"كمية محدودة","Coming Soon":"قريباً",Naruto:"ناروتو","One Piece":"ون بيس","Demon Slayer":"ديمون سلاير","Detective Conan":"المحقق كونان","Black Clover":"بلاك كلوفير","Samurai X":"ساموراي X","Solo Leveling":"سولو ليفلينج","Jujutsu Kaisen":"جوجوتسو كايسن","Vinland Saga":"فينلاند ساغا","Attack On Titan":"هجوم العمالقة","Ghazy Originals":"أصليات غازي",Basic:"أساسي",Minimal:"مينيمال",Premium:"بريميوم",Urban:"أوربان",Vintage:"فينتج",Graffiti:"غرافيتي","Future Expansion":"قريباً"})[value]||value;}
function showToast(message,type="success"){const toast=document.createElement("div");toast.className=`toast ${type}`;toast.textContent=message;$("#toastContainer").appendChild(toast);setTimeout(()=>toast.remove(),3000);}
function escapeHTML(value){return String(value).replace(/[&<>'"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[c]);}
function observeReveals(){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target);}}),{threshold:.12});$$('.reveal').forEach(el=>observer.observe(el));}
