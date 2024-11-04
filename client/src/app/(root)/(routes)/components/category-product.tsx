import { useCurrentCategory } from "@/hooks/use-products";
import { cn } from "@/lib/utils";
import {
    ICategoryStore,
    useCategoryStore,
    useManageCategory,
} from "@/store/product-store";
import { TypeCategory as TypeCurrentCategory } from "@/type/utils-type";

export default function CategoryProduct() {
    const { isLoading, categories } = useCurrentCategory();
    const { changeCategory } = useManageCategory();
    const currentCategory = useCategoryStore(
        (state: ICategoryStore) => state.currentCategory
    );

    return (
        <div className="flex md:justify-start justify-center space-x-2 md:space-x-4 sticky top-0 pt-[4.5rem] px-0 md:px-14 bg-white pb-2 mx-0 md:-mx-12 z-40 ">
            {isLoading ? (
                <>
                    <div className=" h-[50px] md:h-[64px] w-[85px] md:w-[216px] p-2 bg-gray-300 animate-pulse"></div>
                    <div className=" h-[50px] md:h-[64px] w-[85px] md:w-[216px] p-2 bg-gray-300 animate-pulse"></div>
                    <div className=" h-[50px] md:h-[64px] w-[85px] md:w-[216px] p-2 bg-gray-300 animate-pulse"></div>
                    <div className=" h-[50px] md:h-[64px] w-[85px] md:w-[216px] p-2 bg-gray-300 animate-pulse"></div>
                </>
            ) : (
                categories?.map(
                    (category: TypeCurrentCategory, index: number) => {
                        const colors = [
                            "from-yellow-600/80 to-yellow-400",
                            "from-green-600/80 to-green-400",
                            "from-purple-600/80 to-purple-400",
                            "from-indigo-600/80 to-indigo-400",
                        ];
                        const color = colors[index % colors.length];
                        return (
                            <button
                                key={index}
                                className={cn(
                                    "flex flex-col h-[50px] md:h-[64px] w-[85px] md:w-[216px] p-2 rounded-md bg-gradient-to-r",
                                    color
                                )}
                                onClick={() => {
                                    // scroll to top smoothly
                                    window.scrollTo({
                                        top: 350,
                                        behavior: "smooth",
                                    });
                                    changeCategory(category.slug);
                                }}
                            >
                                <div
                                    className={cn(
                                        "h-[2.5px] w-[20%] rounded-full",
                                        currentCategory === category.slug
                                            ? "bg-white"
                                            : "bg-transparent"
                                    )}
                                ></div>
                                <h1 className="text-xs text-start md:text-md font-bold text-white">
                                    {category.name}
                                </h1>
                            </button>
                        );
                    }
                )
            )}
        </div>
    );
}
