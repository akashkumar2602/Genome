import ProductList from "@/components/shared/product/product-list";
import {
  getLatestProducts,
  getFeaturedProducts,
} from "@/lib/actions/product.action";
import { LATEST_PRODUCTS_LIMIT } from "@/lib/constants";
import IconBoxes from "@/components/icon-boxes";
import DealCountdown from "@/components/deal-countdown";
import ProductCarousel from "@/components/shared/product/product-carousel";

const HomePage = async () => {
  const latestProducts = await getLatestProducts();
  const featuredProducts = await getFeaturedProducts();

  return (
    <div className="space-y-8">
      {featuredProducts.length > 0 && (
        <ProductCarousel data={featuredProducts} />
      )}

      <ProductList title="Newest Arrivals" data={latestProducts} />
      <ProductList
        title="Newest Arrivals"
        data={latestProducts}
        limit={LATEST_PRODUCTS_LIMIT}
      />
      <DealCountdown />
      <IconBoxes />
    </div>
  );
};
export default HomePage;
