import Image from "next/image";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

export function CarouselSize({
    images,
    onImageClick,
}: {
    images: string[];
    onImageClick: (src: string) => void;
}) {
    const [isHovered, setIsHovered] = React.useState(false);
    const [currentImageIndex, setCurrentImageIndex] = React.useState(0); // State untuk melacak gambar aktif

    // Handlers untuk hover
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const handleImageClick = (src: string, index: number) => {
        onImageClick(src);
        setCurrentImageIndex(index); // Update gambar yang sedang aktif
    };

    return (
        <>
            {images.length > 5 ? (
                <Carousel
                    opts={{
                        align: "start",
                    }}
                    className="w-full max-w-[24rem] relative"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <CarouselContent>
                        {images.map((src, index) => (
                            <CarouselItem key={index} className="basis-1/5 p-1">
                                <div
                                    className="cursor-pointer "
                                    onClick={() => handleImageClick(src, index)} // Update current image index
                                >
                                    <Card>
                                        <CardContent
                                            className={cn(
                                                " p-0",
                                                index === currentImageIndex
                                                    ? "rounded-md border-2 border-green-500"
                                                    : "" // Border hijau jika aktif
                                            )}
                                        >
                                            <Image
                                                src={src.replace(
                                                    "500-square",
                                                    "100-square"
                                                )}
                                                alt={`Image ${index + 1}`}
                                                width={100}
                                                height={100}
                                                className="w-full object-cover rounded-md"
                                            />
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    <div
                        className={`absolute w-[110%] h-0 z-20 top-1/2 flex -ml-4 justify-between transition-opacity duration-300 ${
                            isHovered ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        <CarouselPrevious variant="carosul" />
                        <CarouselNext variant="carosul" />
                    </div>
                </Carousel>
            ) : (
                <div className="flex justify-start items-start w-full max-w-[24rem] space-x-2">
                    {images.map((src, index) => (
                        <div
                            key={index}
                            className="cursor-pointer"
                            onClick={() => handleImageClick(src, index)}
                        >
                            <Card>
                                <CardContent
                                    className={cn(
                                        " p-0",
                                        index === currentImageIndex
                                            ? "rounded-md border-2 border-green-500"
                                            : ""
                                    )}
                                >
                                    <Image
                                        src={src.replace(
                                            "500-square",
                                            "100-square"
                                        )}
                                        alt={`Image ${index + 1}`}
                                        width={100}
                                        height={100}
                                        className="w-[4.5rem] object-cover rounded-md"
                                    />
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
