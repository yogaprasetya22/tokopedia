// "use client";

// import { useState } from "react";
// import { Button } from "../ui/button";
// import toast from "react-hot-toast";
// import { useStoreModal } from "@/store/model-store";
// import Modal from "./modal";

// export const StoreModal = () => {
//     const [loading, setLoading] = useState(false);

//     const storeModal = useStoreModal();

//     return (
//         <Modal
//             title="Buat Store"
//             description="Tambahkan Store untuk membuat produk dan kategori"
//             isOpen={storeModal.isOpen}
//             onClose={storeModal.onClose}
//         >
//             <div>
//                 <div className="space-y-4 py-2 pb-4">
//                     <div className="pt-6 space-x-2 flex items-center justify-end w-full">
//                         <Button
//                             disabled={loading}
//                             variant="outline"
//                             onClick={storeModal.onClose}
//                         >
//                             Cancel
//                         </Button>
//                         <Button disabled={loading} type="submit">
//                             Continue
//                         </Button>
//                     </div>
//                 </div>
//             </div>
//         </Modal>
//     );
// };
