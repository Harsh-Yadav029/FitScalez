import ClientView from "./ClientView";

export const metadata = {
  title: "Admin CRM & Operations Portal — Fitscalez",
  description: "Internal agency operations dashboard for managing client inquiries and candidate applications.",
  alternates: {
    canonical: "https://fitscalez.com/admin",
  },
};

export default function Page() {
  return <ClientView />;
}
