import AvailabilityClient from "./AvailabilityClient";

async function fetchInitialSlots(date) {
  const response = await fetch("https://table-booking-ybj8.onrender.com/api/availability", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ date }),
  });

  if (!response.ok) {
    console.error("Failed to fetch initial slots.");
    return [];
  }

  const data = await response.json();
  return data.availableSlots || [];
}

export default async function AvailabilityPage() {
  const today = new Date().toISOString().split("T")[0];
  const initialSlots = await fetchInitialSlots(today);

  return <AvailabilityClient initialDate={today} initialSlots={initialSlots} />;
}
