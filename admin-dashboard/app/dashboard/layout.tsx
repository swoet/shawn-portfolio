import { Sidebar } from '../../components/Sidebar';
import { Navbar } from '../../components/Navbar';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Temporarily disable authentication for development
  // const session = await getServerSession(authOptions);
  // if (!session) {
  //   redirect("/login");
  // }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-64 mt-16 p-8 tf-container">
          <div className="tf-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
