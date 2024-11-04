"use client";

import React, { useEffect, useRef, useCallback } from "react";
import Image from "next/image";

function SimpleImageMagnifier(
    containerElement: string | HTMLElement,
    imageElement: string | HTMLImageElement,
    imageOriginalElement: string | HTMLImageElement
): () => void {
    let zoomW: number = 1;
    let zoomH: number = 1;

    const previewBoxEl: HTMLElement | HTMLDivElement | null =
        typeof containerElement === "string"
            ? document.querySelector(containerElement)
            : containerElement;

    if (!previewBoxEl) {
        throw new Error("containerElement is not found");
    }

    const imageEl: HTMLImageElement | null =
        typeof imageElement === "string"
            ? previewBoxEl.querySelector(imageElement)
            : imageElement;

    if (!imageEl) {
        throw new Error("imageElement is not found");
    }

    const imageOriginalEl: HTMLImageElement | null =
        typeof imageOriginalElement === "string"
            ? previewBoxEl.querySelector(imageOriginalElement)
            : imageOriginalElement;

    if (!imageOriginalEl) {
        throw new Error("imageOriginalEl is not found");
    }

    const refreshImage = () => {
        if (!imageOriginalEl) {
            return;
        }

        imageOriginalEl.style.width = imageOriginalEl.naturalWidth + "px";
        imageOriginalEl.style.height = imageOriginalEl.naturalHeight + "px";

        zoomW = imageOriginalEl.naturalWidth / previewBoxEl.clientWidth - 1;
        zoomH = imageOriginalEl.naturalHeight / previewBoxEl.clientHeight - 1;
    };

    const addEvents = () => {
        imageOriginalEl.addEventListener("load", refreshImage);

        previewBoxEl.addEventListener("mouseenter", () => {
            imageEl.style.opacity = "0";
        });

        previewBoxEl.addEventListener("mouseleave", () => {
            imageEl.style.opacity = "1";
        });

        previewBoxEl.addEventListener("mousemove", (e) => {
            imageOriginalEl.style.top = -e.offsetY * zoomH + "px";
            imageOriginalEl.style.left = -e.offsetX * zoomW + "px";
        });
    };

    addEvents();
    refreshImage();

    return refreshImage;
}

interface ImageMagnifierProps {
    srcPreview: string;
    srcOriginal: string;
    width?: number | string;
    height?: number | string;
    className?: string;
}

const ImageMagnifier: React.FC<ImageMagnifierProps> = ({
    srcPreview,
    srcOriginal,
    width = 500,
    height = 600,
    className = "",
}) => {
    const container = useRef<HTMLDivElement>(null);
    const imgPreview = useRef<HTMLImageElement>(null);
    const imgOriginal = useRef<HTMLImageElement>(null);
    const refreshImage = useRef<() => void>(() => {});

    const showImageMagnifier = useCallback(async () => {
        if (container.current && imgPreview.current && imgOriginal.current) {
            imgOriginal.current.onload = () => {
                refreshImage.current = SimpleImageMagnifier(
                    container.current as HTMLDivElement,
                    imgPreview.current as HTMLImageElement,
                    imgOriginal.current as HTMLImageElement
                );
            };

            return;
        }

        setTimeout(showImageMagnifier, 200);
    }, [container, imgPreview, imgOriginal]); // Add necessary dependencies

    useEffect(() => {
        showImageMagnifier();
    }, [showImageMagnifier]); // Correct dependency

    useEffect(() => {
        refreshImage.current();
    }, [srcOriginal, srcPreview, width, height]);

    return (
        <div
            ref={container}
            className={className}
            style={{
                position: "relative",
                overflow: "hidden",
                width: width ? width + "px" : "100%",
                height: height ? height + "px" : "100%",
                borderRadius: "8px",
            }}
        >
            <Image
                ref={imgPreview}
                src={srcPreview}
                alt=""
                objectFit="cover" // To cover the area
                width={typeof width === "number" ? width : parseInt(width)}
                height={typeof height === "number" ? height : parseInt(height)}
                style={{
                    position: "relative",
                    zIndex: "1",
                    transitionProperty: "opacity",
                    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                    transitionDuration: "300ms",
                }}
            />
            <Image
                ref={imgOriginal}
                src={srcOriginal}
                alt=""
                objectFit="none" // To prevent resizing
                width={typeof width === "number" ? width : parseInt(width)}
                height={typeof height === "number" ? height : parseInt(height)}
                style={{ position: "absolute", maxWidth: "none" }}
                layout="responsive" // Maintain aspect ratio
            />
        </div>
    );
};

export default ImageMagnifier;
