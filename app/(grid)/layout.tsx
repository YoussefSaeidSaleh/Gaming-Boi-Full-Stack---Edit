import GridContainer from "../components/defaults/GridContainer";
import SideBar from "../components/nav/SideBar";
import NavBar from "../components/nav/NavBar";
import MaxWidthWrapper from "../components/defaults/MaxWidthWrapper";
import ButtonGradient from "../components/ButtonGradient";
import {WishlistProvider} from "../context/wishlistContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <WishlistProvider>
      <main className="background min-h-screen h-full">
        <ButtonGradient />
        <GridContainer cols={12}>
          {/* SideBar component will handle its own responsive behavior */}
          <SideBar />
          
          {/* Content area - full width on mobile, 10 columns on large screens */}
          <MaxWidthWrapper className="col-span-full lg:col-span-10 pt-16 lg:pt-4">
            <NavBar />
            {children}
          </MaxWidthWrapper>
        </GridContainer>
      </main>
    </WishlistProvider>
  );
}
