import { MainNav } from "@/components/common/main-nav";
import { SiteFooter } from "@/components/common/site-footer";
import { routesConfig } from "@/config/routes";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="z-50 bg-background">
        <div className="mx-auto w-full max-w-[1920px] px-3 sm:px-5 lg:px-6">
          <div className="flex h-20 items-center justify-between py-6">
            <MainNav items={routesConfig.mainNav} />
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
