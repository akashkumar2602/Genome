"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getProductBySlugDigitalData } from "@/lib/actions/product.action";
import { getUserDataDigitalData } from "@/lib/actions/user.action";

interface DigitalData {
    page: {
        pageInfo: PageInfo;
        category: Category;
        attributes: Record<string, unknown>;
        components: unknown[];
    };
    product: { productInfo: ProductInfo }[];
    cart: { productsInCart: number };
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
  name?: string;
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
    profile: Profile[];
}

interface Profile {
  id: string;
  name: string;
  email: string;
  loggedIn: boolean;
  accountType?: string;
  subscriptionStatus?: string;
}

declare global {
  interface Window {
    digitalData: DigitalData;
  }
}

const getPageName = (pathname: string): string => {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return "Home";
  if (segments[0] === "product") return `Product Page: ${segments.slice(1).join(" ")}`;
  if (segments[0] === "cart") return "Cart Page";
  return `Page: ${segments.join(":")}`;
};

const DigitalData = () => {
  const pathname = usePathname();
  const [productInfo, setProductInfo] = useState<ProductInfo | null>(null); // eslint-disable-line @typescript-eslint/no-unused-vars
  const [userData, setUserData] = useState<Profile | null>(null); // eslint-disable-line @typescript-eslint/no-unused-vars

  useEffect(() => {
    const initializeDigitalData = async () => {
      const pageName = getPageName(pathname);
      let productDetails: ProductInfo | null = null;
      let userProfile: Profile | null = null;
      const segments = pathname.split("/").filter(Boolean);

      if (segments[0] === "product" && segments.length > 1) {
        const productSlug = segments.slice(1).join("-");
        const product = await getProductBySlugDigitalData(productSlug);
        if (product) {
          productDetails = {
            name: product.name,
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

      setProductInfo(productDetails);

      const user = await getUserDataDigitalData();
      if (user) {
        userProfile = {
          id: user.id,
          name: user.name,
          email: user.email,
          loggedIn: user.loggedIn,
          accountType: user.accountType,
          subscriptionStatus: user.subscriptionStatus,
        };
      }

      setUserData(userProfile);

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
              type: ":conf:we-retail:settings:wcm:templates:hero-page",
              version: "2023-8-3",
            },
            attributes: {},
            components: [],
        },
        product: productDetails ? [{ productInfo: productDetails }] : [],
        cart: { productsInCart: 0 },
        user: userProfile ? [{ profile: [userProfile] }] : [],
        pageInstanceID: `s7connect:publish:content:genome:us:en:${pageName}`,
        language: "en",
      };
    };

    initializeDigitalData();
  }, [pathname]);

  return null;
};

export default DigitalData;
