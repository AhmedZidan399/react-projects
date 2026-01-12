import SideNavigation from "@/app/_components/SideNavigation";

export default function AccountLayout({ children }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "16rem 1fr",
        gap: "3rem",
        height: "100%",
      }}
    >
      <SideNavigation />
      <div>{children}</div>
    </div>
  );
}
