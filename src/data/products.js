import MacImage from "../assets/images/macbook-airm4.jpg";
import IphoneImage from "../assets/images/iphone15pm.jpg";
import AirPodsmaxImage from "../assets/images/airpods-max.jpg";
import IpadImage from "../assets/images/ipadpro-11inci.jpg";
import AppleWatchImage from "../assets/images/apple-watch-se3.jpg";
import PowerAdapterImage from "../assets/images/power-adapter.jpg";

export const productsData = [
  {
    id: 1,
    name: "Macbook Air M4",
    price: 21499000,
    category: "Electronics",
    stock: 15,
    image: MacImage
  },
  {
    id: 2,
    name: "iPhone 15 Pro Max",
    price: 24000000,
    category: "Electronics",
    stock: 20,
    image: IphoneImage
  },
  {
    id: 3,
    name: "AirPods Max",
    price: 9499000,
    category: "Audio",
    stock: 30,
    image: AirPodsmaxImage
  },
  {
    id: 4,
    name: "11-inch iPad Pro M5",
    price: 20499000,
    category: "Electronics",
    stock: 12,
    image: IpadImage
  },
  {
    id: 5,
    name: "Apple Watch SE 3",
    price: 4349000,
    category: "Wearables",
    stock: 25,
    image: AppleWatchImage
  },
  {
    id: 6,
    name: "20W USB-C Power Adapter",
    price: 499000,
    category: "Power Adapter",
    stock: 8,
    image: PowerAdapterImage
  }
];

export const adminData = {
  totalProducts: 6,
  totalRevenue: 104500000,
  totalOrders: 45,
  pendingOrders: 8
};
