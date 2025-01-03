import BookingForm from "./BookingForm";

// Fetch data for SSR
async function fetchInitialSlots() {
  // Format the date as dd-mm-yyyy
  const today = new Date();
  const formattedDate = [
    today.getDate().toString().padStart(2, '0'), // Day (dd)
    (today.getMonth() + 1).toString().padStart(2, '0'), // Month (mm)
    today.getFullYear(), // Year (yyyy)
  ].join("-");

  let initialSlots = [];

  try {
    const response = await fetch("https://table-booking-ybj8.onrender.com/api/availability", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: formattedDate }),
      cache: "no-store" // Ensures fresh data on every request
    });

    const data = await response.json();
    if (response.ok) {
      initialSlots = data.availableSlots || [];
    } else {
      console.error("Failed to fetch slots:", data.message);
    }
  } catch (error) {
    console.error("Error fetching slots:", error);
  }

  return initialSlots;
}

export default async function Page() {
  const initialSlots = await fetchInitialSlots(); // Fetch initial slots on the server side

  return <BookingForm initialSlots={initialSlots} />;
}
