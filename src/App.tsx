import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import NotFound from "./pages/NotFound";
import AbcPlace from "./pages/AbcPlace";
import AbcJournalArticle from "./pages/AbcJournalArticle";
import Directory from "./pages/Directory";
import Dining from "./pages/Dining";
import Retail from "./pages/Retail";
import Wellness from "./pages/Wellness";
import Services from "./pages/Services";
import Journal from "./pages/Journal";
import Visit from "./pages/Visit";
import StoreDetail from "./pages/StoreDetail";
import {
  PageFade,
  BackToTop,
  LoadingScreen,
} from "@/components/abc/AbcUXChrome";
import CookieConsent from "@/components/abc/CookieConsent";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <ScrollToTop />
        <a href="#main" className="abc-skip-link">Skip to main content</a>
        <LoadingScreen />
        <PageFade>
        <Routes>
          <Route path="/" element={<AbcPlace />} />
          <Route path="/dining" element={<Dining />} />
          <Route path="/dining/:slug" element={<StoreDetail />} />
          <Route path="/retail" element={<Retail />} />
          <Route path="/retail/:slug" element={<StoreDetail />} />
          <Route path="/wellness" element={<Wellness />} />
          <Route path="/wellness/:slug" element={<StoreDetail />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<StoreDetail />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/journal/:slug" element={<AbcJournalArticle />} />
          <Route path="/visit" element={<Visit />} />
          <Route path="/directory" element={<Directory />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </PageFade>
        <BackToTop />
        <CookieConsent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
