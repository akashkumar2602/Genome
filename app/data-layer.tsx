/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getProductBySlugDigitalData } from "@/lib/actions/product.action";
import { getUserDataDigitalData } from "@/lib/actions/user.action";
import { getCartDataDigitalData } from "@/lib/actions/cart.action"; // Assuming this function fetches cart data

interface DigitalData {
  page: {
    pageInfo: PageInfo;
    category: Category;
    attributes: Record<string, unknown>;
    components: unknown[];
  };
  product: { productInfo: ProductInfo }[];
  cart: Cart;
  user: User[];
  pageInstanceID: string;
  language: string;
}

interface PageInfo {
  breadcrumbs: string;
  pageShortName: string;
  pageName: string;
  destinationURL: string;
  isIframe: boolean;
  contentIframe: boolean;
  hierarchie1: string;
  title: string;
  internalPageName: string;
  pageID: string;
  tagging: string;
  server: string;
  urlShortcut: string;
  referringURL: string;
  sysEnv: string;
}

interface Category {
  type: string;
  version: string;
}

interface ProductInfo {
  title?: string;
  sku?: string;
  slug?: string;
  category?: string;
  images?: string[];
  brand?: string;
  description?: string;
  stock?: number;
  price?: number;
  rating?: number;
  numReviews?: number;
  isFeatured?: boolean;
  banner?: string;
  createdAt?: string;
  status?: "In stock" | "Out of stock";
}

interface User {
  profile: {
    profileInfo: Profile;
    attributes: {
      loggedIn: boolean;
      username: string;
    };
  }[];
}

interface Profile {
  id: string;
  name: string;
  email: string;
  role: string;
  loyalityId?: string;
  loyalityType?: string;
  phoneNumber?: string;
  gender?: string;
  age?: string;
  dob?: string;
  city?: string;
  state?: string;
  country?: string;
  loggedIn: boolean;
  accountType?: string;
  subscriptionStatus?: string;
}

interface Cart {
  productsInCart: number;
  orderId: string;
  cartAmount: string;
  cartEntries: CartEntry[];
}

interface CartEntry {
  qty: string;
  sku: string;
  title: string;
  formattedPrice: string;
  price: string;
}

declare global {
  interface Window {
    digitalData: DigitalData;
    _satellite?: {
      pageBottom: () => void;
    };
  }
}

const getPageName = (pathname: string): string => {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return "Home";
  if (segments[0] === "product")
    return `Product Page: ${segments.slice(1).join(" ")}`;
  return `${segments.join(":")}`;
};

const DataLayer = () => {
  const pathname = usePathname();
  const [productInfo, setProductInfo] = useState<ProductInfo | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [cartData, setCartData] = useState<Cart | null>(null);
  const [isDataInitialized, setIsDataInitialized] = useState(false);

  useEffect(() => {
    const initializeDigitalData = async () => {
      const pageName = getPageName(pathname);
      let productDetails: ProductInfo | null = null;
      let userProfile: User | null = null;
      let cartDetails: Cart | null = null;
      const segments = pathname.split("/").filter(Boolean);

      try {
        // Fetch product data if on product page
        if (segments[0] === "product" && segments.length > 1) {
          const productSlug = segments.slice(1).join("-");
          const product = await getProductBySlugDigitalData(productSlug);
          if (product) {
            productDetails = {
              title: product.name,
              sku: product.id,
              slug: product.slug,
              category: product.category,
              images: product.images,
              brand: product.brand,
              description: product.description,
              stock: product.stock,
              price: Number(product.price),
              rating: Number(product.rating),
              numReviews: product.numReviews,
              isFeatured: product.isFeatured,
              banner: product.banner,
              createdAt: product.createdAt,
              status: product.stock > 0 ? "In stock" : "Out of stock",
            };
          }
        }

        // Fetch user data
        const user = await getUserDataDigitalData();
        if (user) {
          userProfile = {
            profile: [
              {
                profileInfo: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                  role: user.role,
                  loyalityId: user.loyalityId ?? "",
                  loyalityType: user.loyalityType ?? "gold",
                  phoneNumber: user.phoneNumber ?? "Unknown",
                  gender: user.gender ?? "Unknown",
                  age: user.age ?? "Unknown",
                  dob: user.dob ?? "Unknown",
                  city: user.city ?? "Unknown",
                  state: user.state ?? "Unknown",
                  country: user.country ?? "Unknown",
                  loggedIn: user.loggedIn ?? false,
                  accountType: user.accountType ?? "Unknown",
                  subscriptionStatus: user.subscriptionStatus ?? "Unknown",
                },
                attributes: {
                  username: user.id ?? "Unknown",
                  loggedIn: user.loggedIn ?? false,
                },
              },
            ],
          };
        }

        // Fetch cart data
        const cart = await getCartDataDigitalData();
        if (cart) {
          cartDetails = {
            productsInCart: cart.productsInCart ?? 0,
            orderId: cart.orderId ?? "",
            cartAmount: cart.cartAmount ?? "0.00",
            cartEntries: cart.cartEntries ?? [],
          };
        }

        // Set all states
        setProductInfo(productDetails);
        setUserData(userProfile);
        setCartData(cartDetails);

        // Initialize digitalData object
        window.digitalData = {
          page: {
            pageInfo: {
              breadcrumbs: `genome:us:en:${pathname.replace(/\//g, ":")}`,
              pageShortName: `genome:${pathname.replace(/\//g, ":")}:en`,
              pageName: `content:genome:us:en:${pageName}`,
              destinationURL: window.location.href,
              isIframe: window.self !== window.top,
              contentIframe: false,
              hierarchie1: `genome:us:en:${pathname.replace(/\//g, ":")}`,
              title: document.title,
              internalPageName: pathname || "Home",
              pageID: `genome.enablementadobe.com:content:genome:us:en:${pageName}`,
              tagging: "",
              server: window.location.hostname,
              urlShortcut: "",
              referringURL: document.referrer || "",
              sysEnv: navigator.userAgent,
            },
            category: {
              type: `genome.enablementadobe.com:content:genome:us:en:${pageName}`,
              version: "2025-02-26",
            },
            attributes: {},
            components: [],
          },
          product: productDetails
            ? [{ productInfo: productDetails }]
            : [{ productInfo: {} }],
          cart: cartDetails ?? {
            productsInCart: 0,
            orderId: "",
            cartAmount: "0.00",
            cartEntries: [],
          },
          user: userProfile ? [userProfile] : [],
          pageInstanceID: `s7connect:publish:content:genome:us:en:${pageName}`,
          language: "en",
        };

        // Set initialization flag and dispatch event
        setIsDataInitialized(true);
        window.dispatchEvent(new CustomEvent('digitalDataReady'));

        // Reinitialize Adobe Launch if it's already loaded
        if (window._satellite) {
          window._satellite.pageBottom();
        }

      } catch (error) {
        console.error('Error initializing digitalData:', error);
      }
    };

    initializeDigitalData();
  }, [pathname]);

  return null;
};

export default DataLayer;
