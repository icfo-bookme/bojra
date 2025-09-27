const getContactNumber = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/contact-attributes`,
      {
        cache: "force-cache", // Cache data for ISR
        next: { revalidate: 60 }, // Revalidate every 60 seconds
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching contact number:", error);
    return [];
  }
};

export default getContactNumber;
