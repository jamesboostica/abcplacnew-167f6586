import { CategoryPage } from "@/components/abc/CategoryPage";
import { dining } from "@/data/abcPlace";
import heroImg from "@/assets/fahrenheit-interior.webp";

const DINING_SUBS = ["Cafés", "Restaurants", "Bars", "Bakeries", "Gourmet Food"];

const Dining = () => (
  <CategoryPage
    routePrefix="/dining"
    eyebrow="Westlands · Nairobi"
    hero="At the Table"
    intro="From the first espresso to the last cocktail — ABC Place gathers Nairobi's most considered dining addresses under one roof."
    heroImage={heroImg}
    items={dining}
    subcategories={DINING_SUBS}
  />
);

export default Dining;