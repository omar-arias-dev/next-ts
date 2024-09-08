'use client';
import { useState } from "react";
import type { MouseEventHandler, RefObject } from "react";
import { LazyImage } from "./components/LazyImage";

const randomNumber = (): number => Math.floor(Math.random() * 123) + 1;
const randomId = (): string => Math.random().toString(36).substr(2, 9);

type ImageItem = { id: string, url: string };

export default function Home() {
  const [images, setImages] = useState<ImageItem[]>([]);

  const currentNode = (node: HTMLImageElement | null) => {
    console.log({node})
  }

  const addNewFox: MouseEventHandler<HTMLButtonElement> = (event): void => {
    const newImageItem: ImageItem = {id: randomId(), url: `https://randomfox.ca/images/${randomNumber()}.jpg`};
    setImages([
      ...images,
      newImageItem,
    ]);
  }

  return (
    <div>
      <main>
        <h1>Hello world</h1>
        <button onClick={(event) => addNewFox(event)}>Add Fox</button>
        {
          images.map(({id, url}) => (
            <div key={id} className="p-4">
              <LazyImage 
                title="Random fox"
                width={320}
                height="auto"
                src={url}
                onClick={() => console.log("hey")}
                onLazyLoad={currentNode}
              />
            </div>
          ))
        }
      </main>
      <footer>
      </footer>
    </div>
  );
}
