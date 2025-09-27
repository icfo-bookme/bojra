import Image from "next/image";

// app/page.js or app/page.tsx
export default async function Fun() {
  const response = await fetch('https://www.bookme.com.bd/admin/api/homepage/images');
  const data = await response.json();

  return (
    <main>
      {data?.file_name ? (
        <div className="relative w-screen h-screen">
          <Image
            src={`https://bookme.com.bd/admin/bookme/public/uploads/${data.file_name}`}
            alt="API Image"
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <p>No image found.</p>
      )}
    </main>
  );
}
