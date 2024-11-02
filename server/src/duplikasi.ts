import { DekorasiKamar } from "./dummy/dekorasi-kamar";

function checkAndRemoveDuplicateImages(productsArray: typeof DekorasiKamar) {
    const cleanedProducts = productsArray.map((product) => {
        const seenUrls = new Set<string>();
        const duplicates: { url: string; index: number }[] = [];

        // Filter image_url untuk menghapus duplikasi
        const uniqueImageUrls = product.image_url.filter((image, index) => {
            if (seenUrls.has(image)) {
                // Tambahkan informasi URL dan indeksnya jika ditemukan duplikasi
                duplicates.push({ url: image, index });
                return false; // Hapus duplikasi
            } else {
                seenUrls.add(image);
                return true; // Masukkan URL unik
            }
        });

        // Tampilkan informasi produk dan URL yang duplikat dengan detailnya
        if (duplicates.length > 0) {
            console.log(
                `Produk "${product.product_name}" memiliki duplikasi pada URL gambar:`
            );
            duplicates.forEach((dup) => {
                console.log(`  - URL: ${dup.url} (Index: ${dup.index})`);
            });
        }

        // Kembalikan produk dengan URL gambar unik
        return { ...product, image_url: uniqueImageUrls };
    });

    return cleanedProducts;
}

// Memanggil fungsi dan melihat hasil produk dengan URL gambar unik
const productsWithoutDuplicateImages =
    checkAndRemoveDuplicateImages(DekorasiKamar);
console.log(
    "Produk setelah menghapus URL gambar duplikat:",
    productsWithoutDuplicateImages
);
